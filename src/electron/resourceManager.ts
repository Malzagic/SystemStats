import osUtils from "os-utils";
import os from "os";
import fs from "fs";
import { exec } from "child_process";
import { BrowserWindow } from "electron";
import { ipcWebContentsSend } from "./util.js";

const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const storageData = getStorageData();
    const cpuTemp = await getSystemTemperature();

    ipcWebContentsSend("statistics", mainWindow.webContents, {
      cpuUsage: parseFloat(cpuUsage.toFixed(2)),
      ramUsage: parseFloat(ramUsage.toFixed(2)),
      storageUsage: parseFloat(storageData.usage.toFixed(2)),
      cpuTemp,
    });
  }, POLLING_INTERVAL);
}

export function getStaticData() {
  const totalStorage = getStorageData().total;
  const cpuModel = os.cpus()[0].model;
  const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

  return {
    totalStorage,
    cpuModel,
    totalMemoryGB,
  };
}

function getCpuUsage(): Promise<number> {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}

function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}

function getStorageData() {
  // requires node <= 18
  const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;

  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total,
  };
}

function getMacOSTemperature(): Promise<number> {
  return new Promise((resolve, reject) => {
    exec("osx-cpu-temp", (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Błąd: ${stderr}`));
      } else {
        const temp = parseFloat(stdout.replace("°C", "").trim());
        resolve(temp);
      }
    });
  });
}

function getWindowsTemperature(): Promise<number> {
  return new Promise((resolve, reject) => {
    exec(
      "wmic /namespace:\\\\root\\wmi PATH MSAcpi_ThermalZoneTemperature get CurrentTemperature",
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`Błąd: ${stderr}`));
        } else {
          const tempInKelvin = parseFloat(stdout.match(/\d+/)?.[0] || "0");
          const tempInCelsius = (tempInKelvin - 2732) / 10;
          resolve(tempInCelsius);
        }
      }
    );
  });
}

function getLinuxTemperature(): Promise<number> {
  return new Promise((resolve, reject) => {
    exec(
      "cat /sys/class/thermal/thermal_zone*/temp",
      (error, stdout, stderr) => {
        if (error) {
          reject(new Error(`Błąd: ${stderr}`));
        } else {
          const temp = parseFloat(stdout) / 1000;
          resolve(temp);
        }
      }
    );
  });
}

function getSystemTemperature(): Promise<number> {
  const platform = process.platform;

  if (platform === "win32") {
    return getWindowsTemperature();
  } else if (platform === "linux") {
    return getLinuxTemperature();
  } else if (platform === "darwin") {
    return getMacOSTemperature();
  } else {
    return Promise.reject(new Error("Unsupported operating system"));
  }
}

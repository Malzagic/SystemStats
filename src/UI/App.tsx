import { useMemo } from "react";
import { useStatistics } from "./hook/useStatistics";
import { SystemInfoProvider } from "./context/SystemInfoContext";

import { Chart } from "./components/Chart";

import "./App.css";
import SystemInfoStats from "./components/SystemInfoStats";
import CpuTempInfo from "./components/CpuTempInfo";

function App() {
  const statistics = useStatistics(10);

  const cpuUsages = useMemo(
    () => statistics.map((stats) => stats.cpuUsage),
    [statistics]
  );
  const ramUsages = useMemo(
    () => statistics.map((stats) => stats.ramUsage),
    [statistics]
  );
  const storageUsages = useMemo(
    () => statistics.map((stats) => stats.storageUsage),
    [statistics]
  );

  return (
    <SystemInfoProvider>
      <SystemInfoStats />
      <CpuTempInfo />
      <div className="chartWrapper">
        <div className="chartContainer">
          <Chart data={cpuUsages} maxDataPoints={10} title="CPU Usage" />
        </div>
        <div className="chartContainer">
          <Chart data={ramUsages} maxDataPoints={10} title="RAM Usage" />
        </div>
        <div className="chartContainer">
          <Chart
            data={storageUsages}
            maxDataPoints={10}
            title="Storage Usage"
          />
        </div>
      </div>
    </SystemInfoProvider>
  );
}

export default App;

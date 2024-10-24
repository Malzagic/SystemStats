import React, { createContext, useState, useEffect, ReactNode } from "react";

const defaultStaticData: StaticData = {
  totalStorage: 0,
  cpuModel: "",
  totalMemoryGB: 0,
};

export const SystemInfoContext = createContext<StaticData>(defaultStaticData);

interface SystemInfoProviderProps {
  children: ReactNode;
}

export const SystemInfoProvider: React.FC<SystemInfoProviderProps> = ({
  children,
}) => {
  const [systemInfo, setSystemInfo] = useState<StaticData>(defaultStaticData);

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const getSystemInfo = await window.electron.getStaticData();

        setSystemInfo(getSystemInfo);
      } catch (err) {
        console.error(`StaticData: ${err}`);
      }
    };

    fetchStaticData();
  }, []);

  return (
    <SystemInfoContext.Provider value={systemInfo}>
      {children}
    </SystemInfoContext.Provider>
  );
};

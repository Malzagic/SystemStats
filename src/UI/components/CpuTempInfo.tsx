import { useMemo } from "react";
import { useStatistics } from "../hook/useStatistics";

export default function CpuTempInfo() {
  const statistics = useStatistics(1);

  const cpuTemps = useMemo(
    () => statistics.map((stats) => stats.cpuTemp),
    [statistics]
  );

  if (!cpuTemps) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1 className="title">CPU Temp</h1>
      <span className="underscore"></span>
      <div className="box">
        <h3>Temperature: </h3>
        <p>{`${cpuTemps} °C`} </p>
      </div>
    </div>
  );
}

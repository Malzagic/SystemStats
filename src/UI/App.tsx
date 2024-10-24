import { useMemo } from "react";
import { useStatistics } from "./useStatistics";

import { Chart } from "./Chart";

import "./App.css";

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

  return (
    <div className="chart-container">
      <div style={{ height: 120 }}>
        <Chart data={cpuUsages} maxDataPoints={10} title="CPU Usage" />
      </div>
      <div style={{ height: 120, paddingTop: "3rem" }}>
        <Chart data={ramUsages} maxDataPoints={10} title="RAM Usage" />
      </div>
    </div>
  );
}

export default App;

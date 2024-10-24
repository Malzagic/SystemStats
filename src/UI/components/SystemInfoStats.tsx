import { useContext } from "react";
import { SystemInfoContext } from "../context/SystemInfoContext";

export default function SystemInfoStats() {
  const { cpuModel, totalMemoryGB, totalStorage } =
    useContext(SystemInfoContext);

  if (!cpuModel || !totalMemoryGB || !totalStorage)
    return <div>Loading...</div>;
  return (
    <div className="container">
      <h1 className="title">System Stats</h1>
      <span className="underscore"></span>
      <div className="box">
        <h4>CPU: </h4>
        <p>{cpuModel}</p>
      </div>
      <div className="box">
        <h4>Total RAM: </h4>
        <p>{totalMemoryGB} GB</p>
      </div>
      <div className="box">
        <h4>Total Storage: </h4>
        <p>{totalStorage} GB</p>
      </div>
    </div>
  );
}

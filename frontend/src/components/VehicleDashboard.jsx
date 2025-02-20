<<<<<<< HEAD
import React from "react";
import Speedometer from "./Speedometer";
import AccelerationGraph from "./AccelerationGraph";
import BatteryStatus from "./BatteryStatus";
import SuspensionStatus from "./SuspensionStatus";
import TemperatureIndicator from "./TemperatureIndicator";
import AlertNotifications from "./AlertNotifications";
import ThemeToggle from "./ThemeToggle";
import HistoryChart from "./HistoryChart";
import useVehicleData from "./useVehicleData";
import Card3D from "./Card3D"; // Import 3D card effect
import FlashMap from "./FlashMap";

const VehicleDashboard = () => {
  const data = useVehicleData();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Vehicle Dashboard</h1>
        <ThemeToggle />
      </div>

      {/* Grid Layout for other cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Card3D title="Speed">
          <Speedometer speed={data.speed} />
        </Card3D>

        <Card3D title="Acceleration">
          <AccelerationGraph history={data.history} />
        </Card3D>

        <Card3D title="Battery">
          <BatteryStatus battery={data.battery} />
        </Card3D>

        <Card3D title="Suspension">
          <SuspensionStatus suspension={data.suspension} />
        </Card3D>

        <Card3D title="Temperature">
          <TemperatureIndicator temperature={data.temperature} />
        </Card3D>

        <Card3D title="Alerts">
          <AlertNotifications alerts={data.alerts} />
        </Card3D>
      </div>

      {/* Full-width FlashMap */}
      <div className="w-full mt-6">
        <Card3D title="Live GPS" className="w-full">
          <FlashMap />
        </Card3D>
      </div>

      <div className="mt-9">
        <Card3D title="History">
          <HistoryChart history={data.history} />
        </Card3D>
      </div>
    </div>
  );
};

export default VehicleDashboard;
=======
import React from "react";
import Speedometer from "./Speedometer";
import AccelerationGraph from "./AccelerationGraph";
import BatteryStatus from "./BatteryStatus";
import SuspensionStatus from "./SuspensionStatus";
import TemperatureIndicator from "./TemperatureIndicator";
import AlertNotifications from "./AlertNotifications";
import ThemeToggle from "./ThemeToggle";
import HistoryChart from "./HistoryChart";
import useVehicleData from "./useVehicleData";
import Card3D from "./Card3D"; // Import 3D card effect

const VehicleDashboard = () => {
  const data = useVehicleData();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Vehicle Dashboard</h1>
        <ThemeToggle />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Card3D title="Speed">
          <Speedometer speed={data.speed} />
        </Card3D>

        <Card3D title="Acceleration">
          <AccelerationGraph history={data.history} />
        </Card3D>

        <Card3D title="Battery">
          <BatteryStatus battery={data.battery} />
        </Card3D>

        <Card3D title="Suspension">
          <SuspensionStatus suspension={data.suspension} />
        </Card3D>

        <Card3D title="Temperature">
          <TemperatureIndicator temperature={data.temperature} />
        </Card3D>

        <Card3D title="Alerts">
          <AlertNotifications alerts={data.alerts} />
        </Card3D>
      </div>

      <div className="mt-6">
        <Card3D title="History">
          <HistoryChart history={data.history} />
        </Card3D>
      </div>
    </div>
  );
};

export default VehicleDashboard;
>>>>>>> d445825 (Esp32 and graph)

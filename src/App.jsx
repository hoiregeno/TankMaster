import { useWaterLogic } from "./hooks/useWaterLogic";
import { TankStatus, OrderForm, SalesHistory } from "./components/index";
import "./App.css";

const App = () => {
  const {
    currentLevel,
    capacity,
    sales,
    stats, // New grouped object
    actions, // New grouped object
  } = useWaterLogic();

  return (
    <>
      <h1 className="title">TankMaster Tracker</h1>

      <div className="dashboard">
        <TankStatus
          currentLevel={currentLevel}
          capacity={capacity}
          refillTank={actions.refillTank}
        />

        <OrderForm addSale={actions.addSale} />

        <div className="stats-grid">
          <div className="stat-card">Revenue: K{stats.revenue}</div>
          <div className="stat-card">Cash: K{stats.collected}</div>
          <div className="stat-card">Debt: K{stats.debt}</div>
        </div>

        <SalesHistory
          sales={sales}
          togglePaymentStatus={actions.togglePaymentStatus}
        />
      </div>

      <div className="danger-zone">
        <button onClick={actions.resetEverything} className="reset-btn">
          Reset All Data
        </button>
      </div>
    </>
  );
};

export default App;

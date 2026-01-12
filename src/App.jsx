import { useWaterLogic } from "./hooks/useWaterLogic";
import { TankStatus, OrderForm, SalesHistory } from "./components/index";
import "./App.css";

const App = () => {
  const {
    currentLevel,
    capacity,
    sales,
    totalRevenue,
    amountCollected,
    outstandingDebt,
    refillTank,
    addSale,
    togglePaymentStatus,
    resetEverything,
  } = useWaterLogic();

  return (
    <>
      <h1 className="title">TankMaster Tracker</h1>

      <div className="dashboard">
        <TankStatus
          currentLevel={currentLevel}
          capacity={capacity}
          refillTank={refillTank}
        />

        <OrderForm addSale={addSale} />

        <div className="stats-grid">
          <div className="stat-card">Revenue: K{totalRevenue}</div>
          <div className="stat-card">Cash: K{amountCollected}</div>
          <div className="stat-card">Debt: K{outstandingDebt}</div>
        </div>

        <SalesHistory sales={sales} togglePaymentStatus={togglePaymentStatus} />
      </div>

      <div className="danger-zone">
        <button onClick={resetEverything} className="reset-btn">
          Reset All Data
        </button>
      </div>
    </>
  );
};

export default App;

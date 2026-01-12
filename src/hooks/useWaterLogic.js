import { useState, useEffect } from "react";

const CAPACITY = 5000;
const PRICE_PER_LITER = 0.5;
const RATES = { 5: 2, 10: 4, 20: 7, 50: 15 };

export const useWaterLogic = () => {
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem("tank_master_sales");
    return saved ? JSON.parse(saved) : [];
  });

  // Track total added water (persistence is key)
  const [totalAdded, setTotalAdded] = useState(() => {
    const saved = localStorage.getItem("tank_master_total_added");
    return saved ? Number(saved) : CAPACITY;
  });

  // 1. Math: Volume Logic
  const totalLitersSold = sales.reduce((sum, s) => sum + Number(s.liters), 0);
  const currentLevel = totalAdded - totalLitersSold;

  // 2. Math: Financial Logic
  const totalRevenue = sales.reduce((sum, s) => sum + Number(s.price), 0);
  const amountCollected = sales
    .filter((s) => s.isPaid)
    .reduce((sum, s) => sum + Number(s.price), 0);
  const outstandingDebt = totalRevenue - amountCollected;

  // 3. Persistence
  useEffect(() => {
    localStorage.setItem("tank_master_sales", JSON.stringify(sales));
    localStorage.setItem("tank_master_total_added", totalAdded.toString());
  }, [sales, totalAdded]);

  // 4. Actions
  const addSale = (customerName, liters, isPaid) => {
    const amount = Number(liters);

    if (amount > currentLevel) {
      alert("Insufficient water!");
      return false;
    }

    const calculatedPrice = RATES[amount] || amount * PRICE_PER_LITER;

    const newSale = {
      id: Date.now(),
      customerName,
      liters: amount,
      price: Number(calculatedPrice).toFixed(2),
      isPaid,
      date: new Date().toLocaleString(),
    };

    setSales([newSale, ...sales]);
    return true;
  };

  const refillTank = () => {
    const spaceLeft = CAPACITY - currentLevel;
    if (spaceLeft <= 0) {
      alert("Tank is already full");
      return;
    }

    if (window.confirm(`Add ${CAPACITY}L to the current tank?`)) {
      setTotalAdded((prev) => prev + CAPACITY);
    }
  };

  const togglePaymentStatus = (salesId) => {
    setSales(
      sales.map((s) => (s.id === salesId ? { ...s, isPaid: !s.isPaid } : s))
    );
  };

  // The "Nuclear" Reset (only for starting a new year/session)
  const resetEverything = () => {
    if (window.confirm("ERASE ALL DATA? This clears history and debt!")) {
      setSales([]);
      setTotalAdded(CAPACITY);
    }
  };

  return {
    capacity: CAPACITY,
    currentLevel,
    sales,
    totalRevenue: totalRevenue.toFixed(2),
    amountCollected: amountCollected.toFixed(2),
    outstandingDebt: outstandingDebt.toFixed(2),
    addSale,
    refillTank,
    togglePaymentStatus,
    resetEverything,
  };
};

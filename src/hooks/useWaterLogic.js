import { useState, useEffect } from "react";

// --- Configuration ---
const CAPACITY = 5000;
const PRICE_PER_LITER = 0.5;
const RATES = { 5: 2, 10: 4, 20: 7, 50: 15 };
const STORAGE_KEYS = {
  SALES: "tank_master_sales",
  TOTAL_ADDED: "tank_master_total_added",
};

export const useWaterLogic = () => {
  // --- State (Lazy Initialization) ---
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SALES);
    return saved ? JSON.parse(saved) : [];
  });

  const [totalAdded, setTotalAdded] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TOTAL_ADDED);
    return saved ? Number(saved) : CAPACITY;
  });

  // --- Math & Derived State ---
  // 1. Volume Logic
  const totalLitersSold = sales.reduce((sum, s) => sum + Number(s.liters), 0);
  const currentLevel = totalAdded - totalLitersSold;

  // 2. Financial Logic
  const totalRevenue = sales.reduce((sum, s) => sum + Number(s.price), 0);
  const amountCollected = sales
    .filter((s) => s.isPaid)
    .reduce((sum, s) => sum + Number(s.price), 0);
  const outstandingDebt = totalRevenue - amountCollected;

  // --- Actions ---
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
    const amountNeeded = CAPACITY - currentLevel;

    if (amountNeeded <= 0) {
      alert("Tank is already full");
      return;
    }

    if (window.confirm(`Top up tank? Adding ${amountNeeded}L.`)) {
      setTotalAdded((prev) => prev + amountNeeded);
    }
  };

  const togglePaymentStatus = (salesId) => {
    setSales((prevSales) =>
      prevSales.map((s) => (s.id === salesId ? { ...s, isPaid: !s.isPaid } : s))
    );
  };

  const resetEverything = () => {
    if (window.confirm("ERASE ALL DATA? This clears history and debt!")) {
      setSales([]);
      setTotalAdded(CAPACITY);
    }
  };

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(sales));
    localStorage.setItem(STORAGE_KEYS.TOTAL_ADDED, totalAdded.toString());
  }, [sales, totalAdded]);

  // --- Public Interface ---
  return {
    capacity: CAPACITY,
    currentLevel,
    sales,
    stats: {
      revenue: totalRevenue.toFixed(2),
      collected: amountCollected.toFixed(2),
      debt: outstandingDebt.toFixed(2),
    },
    actions: {
      addSale,
      refillTank,
      togglePaymentStatus,
      resetEverything,
    },
  };
};

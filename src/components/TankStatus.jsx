import styles from "../styles/TankStatus.module.css";

// Visual of water level
const TankStatus = ({ currentLevel, capacity, refillTank }) => {
  const percentage = (currentLevel / capacity) * 100;

  return (
    <div className={styles.tankContainer}>
      <h3 className={styles.title}>Tank Status</h3>

      <div className={styles.tankShell}>
        <div className={styles.waterFill} style={{ height: `${percentage}%` }}>
          <span>{Math.round(percentage)}%</span>
        </div>
      </div>

      <p>
        Available: <strong>{currentLevel}L</strong>
      </p>

      <button onClick={refillTank} className={styles.refillBtn}>
        Top Up Tank
      </button>
    </div>
  );
};

export default TankStatus;

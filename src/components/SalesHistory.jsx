import styles from "../styles/SalesHistory.module.css";

const SalesHistory = ({ sales, togglePaymentStatus }) => {
  return (
    <div className={styles.historyContainer}>
      <h3 className={styles.title}>Sales Ledger</h3>

      {sales.length === 0 ? (
        <p className={styles.emptyState}>No sales recorded yet.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Liters</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(({ id, date, customerName, liters, price, isPaid }) => (
              <tr
                key={id}
                className={isPaid ? styles.paidRow : styles.unpaidRow}
              >
                <td>{date.split(",")[0]}</td>
                <td className={styles.customer}>{customerName}</td>
                <td>{liters}L</td>
                <td>K{price}</td>
                <td>
                  <button
                    onClick={() => togglePaymentStatus(id)}
                    className={isPaid ? styles.btnPaid : styles.btnDebt}
                  >
                    {isPaid ? "Paid" : "Mark Paid"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SalesHistory;

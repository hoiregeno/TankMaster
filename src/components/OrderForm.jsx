// Input for new sales record
import { useState } from "react";
import styles from "../styles/OrderForm.module.css";

const OrderForm = ({ addSale }) => {
  const [name, setName] = useState("");
  const [liters, setLiters] = useState("");
  const [isPaid, setIsPaid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !liters) return alert("Fill in all fields");

    // Attempt to add sale via the hool
    const success = addSale(name, liters, isPaid);
    if (success) {
      // Clear form if the sale went through
      setName("");
      setLiters("");
      setIsPaid(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.orderForm}>
      <h3 className={styles.title}>New Sale</h3>

      <input
        type="text"
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Liters (L)"
        value={liters}
        min="1"
        onChange={(e) => setLiters(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={isPaid}
          onChange={(e) => setIsPaid(e.target.checked)}
        />
        Paid?
      </label>

      <button type="submit">Record Sale</button>
    </form>
  );
};

export default OrderForm;

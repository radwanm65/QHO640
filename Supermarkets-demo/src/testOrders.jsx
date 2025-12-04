import { useState } from "react";
import ProductOrder from "./orders";

export default function TestOrder() {
  const [log, setLog] = useState([]);

  const product = {
    id: 101,
    name: "Organic Fuji Apples",
    category: "Produce",
    proce: 3.49,
    supermarket: "Downtown Market - Aisle 4",
    location: "London",
    quantity: 120,
    expiration_date: "2025-03-15",
  };
  const handleOrder = ({
    id,
    productName,
    productSupermarket,
    location,
    quantity,
    newStock,
  }) => {
    setLog((prev) => [
      ...prev,
      `Ordered ${quantity} of product #${id} (${productName}) from [${productSupermarket}] in [${location}]. Remaining stock: ${newStock}`,
    ]);
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Test Product Order Component</h2>
      <ProductOrder product={product} onOrder={handleOrder} />

      <div className="card p-3 mt-4 shadow-sm rounded-4">
        <h5 className="fw-bold">Order Log</h5>
        {log.length === 0 && <p>No orders yet.</p>}
        <ul className="mt-2">
          {log.map((entry, index) => (
            <>
              <li key={index}>{entry}</li>
              <button onClick={handleOrder}>Cancel Order</button>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}

import { useState } from "react";

export default function ProductOrder({ product, onOrder }) {
  const [quantity, setQuantity] = useState(1);
  const [remaining, setRemaining] = useState(product.quantity);

  const handleOrder = () => {
    if (quantity < 1) return;
    if (quantity > remaining) {
      alert("Quantity exceeds available stock!");
      return;
    }

    const newStock = remaining - quantity;
    setRemaining(newStock);

    if (onOrder) {
      onOrder({
        id: product.id,
        productName: product.name,
        productSupermarket: product.supermarket,
        location: product.location,
        quantity,
        newStock,
      });
    }
  };

  return (
    <div className="card p-4 shadow-sm rounded-4 my-4">
      <h4 className="fw-bold">Order Product</h4>
      <p className="mb-1">
        <strong>Product:</strong> {product.name}
      </p>
      <p className="mb-1">
        <strong>Supermarket:</strong> {product.supermarket}
      </p>
      <p className="mb-1">
        <strong>Category:</strong> {product.category}
      </p>
      <p className="mb-3">
        <strong>Available Stock:</strong> {remaining}
      </p>

      <div className="mb-3">
        <label className="form-label">Quantity to Order</label>
        <input
          type="number"
          min="1"
          className="form-control rounded-3"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
      </div>

      <button
        className="btn btn-success w-100 py-2 rounded-3 fw-semibold"
        onClick={handleOrder}
      >
        Confirm Order
      </button>
    </div>
  );
}

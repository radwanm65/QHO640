import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * AdminAddProduct Component
 * Props:
 *  - pharmacies: array of pharmacy names or objects
 *  - categories: array of product categories
 *  - onAdd: function(productData)
 */
export default function AdminAddProduct({ supermarkets, categories, onAdd }) {
  const [form, setForm] = useState({
    productName: "",
    price: "",
    category: "",
    nutrition: "",
    expiryDate: "",
    quantity: "",
    supermarket: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onAdd) {
      onAdd(form);
    }

    alert("Product added successfully!");

    setForm({
      productName: "",
      price: "",
      category: "",
      nutrition: "",
      expiryDate: "",
      quantity: "",
      pharmacy: "",
    });
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div
        className="card p-4 shadow-lg rounded-4"
        style={{ maxWidth: "600px", width: "100%" }}
      >
        <h3 className="fw-bold mb-4 text-center">
          Add New Product to Supermarket Inventory
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              className="form-control rounded-3"
              name="productName"
              value={form.productName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control rounded-3"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              name="category"
              className="form-select rounded-3"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Nutrition Info</label>
            <input
              type="text"
              className="form-control rounded-3"
              name="nutrition"
              value={form.nutrition}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Expiry Date</label>
            <input
              type="date"
              className="form-control rounded-3"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity Available</label>
            <input
              type="number"
              className="form-control rounded-3"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">supermarket</label>
            <select
              name="supermarket"
              className="form-select rounded-3"
              value={form.supermarket}
              onChange={handleChange}
              required
            >
              <option value="">Select Supermarket</option>
              {supermarkets.map((supermarket) => (
                <option key={supermarket} value={supermarket}>
                  {supermarket}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-success w-100 py-2 rounded-3 fw-semibold">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

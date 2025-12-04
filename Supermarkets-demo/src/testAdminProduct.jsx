import { useState } from "react";
import AdminAddProduct from "./adminProduct";

export default function TestAdminAddProduct({ supermarkets, categories }) {
  const [products, setProducts] = useState([]);
  const handleAddProduct = (productData) => {
    setProducts((prev) => [...prev, productData]);
  };

  return (
    <div className="container py-5">
      <AdminAddProduct
        supermarkets={supermarkets}
        categories={categories}
        onAdd={handleAddProduct}
      />

      <div className="mt-5">
        <h4 className="fw-bold mb-3">Inventory</h4>
        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Nutrition Info</th>
                  <th>Expiry Date</th>
                  <th>Quantity</th>
                  <th>Supermarket</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, idx) => (
                  <tr key={idx}>
                    <td>{p.productName}</td>
                    <td>{p.price}</td>
                    <td>{p.category}</td>
                    <td>{p.nutrition}</td>
                    <td>{p.expiryDate}</td>
                    <td>{p.quantity}</td>
                    <td>{p.supermarket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

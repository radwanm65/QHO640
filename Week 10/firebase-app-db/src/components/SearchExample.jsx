import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

export default function SearchItems() {
  const [items, setItems] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(data);
    });

    return () => unsubscribe();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesName = item.name
      .toLowerCase()
      .includes(searchName.toLowerCase());

    const matchesCategory =
      searchCategory === "" ||
      item.category.toLowerCase() === searchCategory.toLowerCase();

    return matchesName && matchesCategory;
  });

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Search Products</h3>

      {/* Search Inputs */}
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>

        <div className="col-md-4 mb-2">
          <select
            className="form-control"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Over the Counter">Over the Counter</option>
            <option value="medicine">Medicine</option>
            <option value="Health products">Health products</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

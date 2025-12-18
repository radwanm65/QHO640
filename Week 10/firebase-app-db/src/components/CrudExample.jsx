// src/CrudExample.js
import React, { useEffect, useState } from "react";
import {
  createItem,
  subscribeToItems,
  updateItem,
  deleteItem,
} from "../config/firebase";

export default function CrudExample() {
  const [items, setItems] = useState([]);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  // Listen to item changes in real time
  useEffect(() => {
    const unsubscribe = subscribeToItems((data) => setItems(data));
    return () => unsubscribe();
  }, []);

  const handleCreate = async () => {
    if (!newName) return;
    await createItem({
      name: newName,
      category: newCategory,
      quantity: newQuantity,
      createdAt: Date.now(),
    });
    setNewName("");
    setNewCategory("");
    setNewQuantity("");
  };

  const handleUpdate = async (id) => {
    const updatedName = prompt("New name:");
    const updatedCategory = prompt("New Category:");
    const updatedQuantity = prompt("New Quantity:");
    if (updatedName) {
      await updateItem(id, {
        name: updatedName,
        category: updatedCategory,
        quantity: updatedQuantity,
      });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete item?")) {
      await deleteItem(id);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>CWA-QHO640-Firestore CRUD Example</h2>

      <input
        placeholder="Item Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        placeholder="Category"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <input
        placeholder="Quantity"
        value={newQuantity}
        onChange={(e) => setNewQuantity(e.target.value)}
      />
      <button className="btn btn-success" onClick={handleCreate}>
        Create Item
      </button>

      <ul className="list-group">
        {items.map((item) => (
          <li className="list-group-item" key={item.id}>
            {item.name} {"-----"}
            {item.category} {"-----"}
            {item.quantity} {"-----"}
            <button
              className="btn btn-primary"
              onClick={() => handleUpdate(item.id)}
            >
              Edit
            </button>{" "}
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

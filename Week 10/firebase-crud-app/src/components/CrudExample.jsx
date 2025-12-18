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

  // Listen to item changes in real time
  useEffect(() => {
    const unsubscribe = subscribeToItems((data) => setItems(data));
    return () => unsubscribe();
  }, []);

  const handleCreate = async () => {
    if (!newName) return;
    await createItem({ name: newName, createdAt: Date.now() });
    setNewName("");
  };

  const handleUpdate = async (id) => {
    const updatedName = prompt("New name:");
    if (updatedName) {
      await updateItem(id, { name: updatedName });
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
      <button className="btn btn-success" onClick={handleCreate}>
        Create Item
      </button>

      <ul className="list-group">
        {items.map((item) => (
          <li className="list-group-item" key={item.id}>
            {item.name}{" "}
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

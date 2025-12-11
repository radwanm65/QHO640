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
      <h2>Firestore CRUD Example</h2>

      <input
        placeholder="Item name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={handleCreate}>Add Item</button>

      <ul style={{ marginTop: 20 }}>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}{" "}
            <button onClick={() => handleUpdate(item.id)}>Edit</button>{" "}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

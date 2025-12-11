"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { getItems, addItem, deleteItem } from "./config/db-functions";

export default function ItemsPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [items, setItems] = useState([]);

  async function loadItems() {
    const data = await getItems();
    setItems(data);
  }

  async function handleAdd() {
    if (!name || !password) return;
    await addItem(name, password);
    setName("");
    setPassword("");
    loadItems();
  }

  async function handleDelete(id) {
    await deleteItem(id);
    loadItems();
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Users List</h1>

      {/* Input + Add button */}
      <div className="mt-4">
        <input
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter User Name"
        />
        <input
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>

      {/* Table */}
      <table className="border-collapse border w-full mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">User ID</th>
            <th className="border p-2">User Name</th>
            <th className="border p-2">User password</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.id}</td>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.password}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { UsersDAO } from "./dao/usersDao";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");

  async function loadItems() {
    const data = await UsersDAO.getAll();
    setItems(data);
  }

  async function handleAdd() {
    if (!name || !password) return;
    await UsersDAO.create(name, password);
    setName("");
    setPassword("");
    loadItems();
  }
  async function handleSave(id) {
    await UsersDAO.update(id, editName, editPassword);
    setEditId(null);
    setEditName("");
    setEditPassword("");
    loadItems();
  }

  async function handleDelete(id) {
    await UsersDAO.remove(id);
    loadItems();
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div>
      <h2>Users List</h2>

      <input
        value={name}
        className="border p-2"
        placeholder="Enter User Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2"
        value={password}
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-3 py-1 rounded"
        onClick={handleAdd}
      >
        Add
      </button>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>

              <td>
                {editId === item.id ? (
                  <input
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editId === item.id ? (
                  <input
                    className="form-control"
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                  />
                ) : (
                  item.password
                )}
              </td>
              <td>
                {editId === item.id ? (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleSave(item.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => {
                      setEditId(item.id);
                      setEditName(item.name);
                      setEditPassword(item.password);
                    }}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDelete(item.id)}
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

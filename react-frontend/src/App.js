import React, { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // READ — fetch all users
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();

    // Make sure data is always an array
    if (Array.isArray(data)) {
      setUsers(data);
    } else {
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // CREATE & UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      await fetch(`http://localhost:3000/users/${editIndex}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      setEditIndex(null);
    } else {
      // CREATE
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
    }

    setName("");
    setEmail("");

    // Always fetch fresh array from backend
    fetchUsers();
  };

  // DELETE
  const handleDelete = async (index) => {
    await fetch(`http://localhost:3000/users/${index}`, {
      method: "DELETE",
    });
    fetchUsers();
  };

  // EDIT
  const handleEdit = (index) => {
    setName(users[index].name);
    setEmail(users[index].email);
    setEditIndex(index);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>CRUD Form</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      <hr />

      <h3>User List</h3>
      <table border="1" style={{ margin: "0 auto" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>{" "}
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

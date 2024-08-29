import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [exporting, setExporting] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:8080/users/register", newUser);
      setUsers([...users, response.data.new_user]);
      setSignUpModal(false);
      setNewUser({
        email: "",
        firstName: "",
        lastName: "",
        password: ""
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/users/delete/${deleteUserId}`);
      setUsers(users.filter(user => user._id !== deleteUserId));
      setDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const response = await axios.get("http://localhost:8080/users/export", {
        params: {
          userIds: selectedUsers.map(user => user._id)
        }
      });
      const csvContent = response.data;
      const csvBlob = new Blob([csvContent], { type: "text/csv" });
      const csvUrl = URL.createObjectURL(csvBlob);
      const csvLink = document.createElement("a");
      csvLink.href = csvUrl;
      csvLink.download = "users.csv";
      csvLink.click();
      setExporting(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectUser = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <button onClick={() => setSignUpModal(true)}>Sign Up</button>
      <button onClick={handleExport} disabled={exporting || selectedUsers.length === 0}>
        {exporting ? "Exporting..." : "Export"}
      </button>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                <button onClick={() => handleSelectUser(user)}>
                  {selectedUsers.includes(user) ? "Deselect" : "Select"}
                </button>
                <button onClick={() => {
                  setDeleteModal(true);
                  setDeleteUserId(user._id);
                }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {signUpModal && (
        <div>
          <h2>Sign Up</h2>
          <form>
            <label>Email:</label>
            <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
            <br />
            <label>First Name:</label>
            <input type="text" value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
            <br />
            <label>Last Name:</label>
            <input type="text" value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
            <br />
            <label>Password:</label>
            <input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
            <br />
            <button onClick={handleSignUp}>Sign Up</button>
          </form>
        </div>
      )}
      </div>
  )
}

// module.exports={Home}
    
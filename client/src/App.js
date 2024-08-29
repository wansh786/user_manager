import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
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
  const [deleteUserId, setDeleteUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const usersPerPage = 5;

  useEffect(() => {
    axios.get("http://localhost:8080/users")
      .then(response => {
        setUsers(response.data.users_data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Hide after 3 seconds
  };

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
      showPopupMessage("User signed up successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/users/delete/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      showPopupMessage("User deleted successfully!");
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

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      {/* Popup Message */}
      {showPopup && <div className="popup">{popupMessage}</div>}

      {/* Signup Modal */}
      <div className={`signup-form ${signUpModal ? 'active' : ''}`}>
        <div className="signup">
          <h2>Sign Up</h2>
          <form>
            <label>Email:</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <br />
            <label>First Name:</label>
            <input
              type="text"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            />
            <br />
            <label>Last Name:</label>
            <input
              type="text"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            />
            <br />
            <label>Password:</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            />
            <br />
            <button type="button" onClick={handleSignUp}>Sign Up</button>
            <button type="button" onClick={() => setSignUpModal(false)}>Cancel</button>
          </form>
        </div>
      </div>

      <div className="user-data">
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
            {currentUsers.map(user => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <button onClick={() => handleSelectUser(user)}>
                    {selectedUsers.includes(user) ? "Deselect" : "Select"}
                  </button>
                  <button onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

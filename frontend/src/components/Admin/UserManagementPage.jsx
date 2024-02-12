// src/components/Admin/UserManagementPage.jsx

import React, { useState, useEffect } from "react";
import "./UserManagementPage.css";
import EditUserPopup from "./EditUserPopup"; // Import the EditUserPopup component
import axios from "axios";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [filterRole, setFilterRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  var currentUsers,indexOfLastItem,indexOfFirstItem,paginate,nextPage,prevPage=0

  useEffect(() => {
      console.log("Useeffect")
      axios.get("http://localhost:3000/admin/get-users")
      .then((server_response)=>{

        setUsers(server_response.data.data.users);

          // Calculate the index of the last item to display on the current page
        indexOfLastItem = currentPage * itemsPerPage;
        // Calculate the index of the first item to display on the current page
        indexOfFirstItem = indexOfLastItem - itemsPerPage;
        // Get the current page of users
        currentUsers= users.slice(indexOfFirstItem, indexOfLastItem);
        // Pagination functions
        paginate = (pageNumber) => setCurrentPage(pageNumber);
        nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
        prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

      })
      .catch((err)=>{
        console.log("error in useeffect of UsermanagementPage")
      })

  }, []);

  var handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditPopup(true);
  };

  var handleSaveUser = (editedUser) => {
    // Save edited user details to the backend (to be implemented later)
    // For now, update the user in the local state
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === editedUser.id ? editedUser : u))
    );
    setShowEditPopup(false);
  };

  var handleCancelEdit = () => {
    setShowEditPopup(false);
  };

  var handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirmation(true);
  };

  var confirmDelete = () => {
    // Delete the user from the local state
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userToDelete.id));
    setShowDeleteConfirmation(false);
  };

  var cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  var togglePasswordVisibility = (user) => {
    // Toggle password visibility for the selected user
    const updatedUsers = users.map((u) => {
      if (u.id === user.id) {
        return { ...u, passwordVisible: !u.passwordVisible };
      }
      return u;
    });
    setUsers(updatedUsers);
  };

  var filterUsersByRole = (role) => {
    setFilterRole(role);
  };

  var clearFilter = () => {
    setFilterRole("");
  };

  var handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  var clearSearch = () => {
    setSearchTerm("");
  };

  var filteredUsers = users.filter((user) => {
    return (
      (!filterRole || user.role === filterRole) &&
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });


  return (
    <div className="user-management-container">
      <h2>User Management</h2>
      <div className="filter-container">
        <div className="filter-select">
          <select
            value={filterRole}
            onChange={(e) => filterUsersByRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="DevOps">DevOps</option>
            <option value="TechOps">TechOps</option>
            {/* Add more role options as needed */}
          </select>
          <button
           onClick={clearFilter}
           >Clear</button>
        </div>
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
          />
          <button 
          onClick={clearSearch}
          >Clear</button>
        </div>
      </div>
      <table class="content-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {users?users.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.associate_name}</td>
      <td>{user.lastname}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button onClick={() => handleEditUser(user)}>Edit</button>
        <button onClick={() => handleDeleteUser(user)}>Delete</button>
      </td>
    </tr>
  )):null}
</tbody>

      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {/* Render page numbers */}
        {Array.from({ length: Math.ceil(users?users.length:0 / itemsPerPage) }).map(
          (number, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(users?users.length:0 / itemsPerPage)}
        >
          Next
        </button>
      </div>

      {/* Render edit user popup if showEditPopup is true */}
      {showEditPopup && (
        <EditUserPopup
          user={selectedUser}
          onSave={handleSaveUser}
          onCancel={handleCancelEdit}
        />
      )}
      {/* Render delete confirmation popup if showDeleteConfirmation is true */}
      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this user?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
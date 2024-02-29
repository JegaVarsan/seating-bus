import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./UserManagementPage.css";
import axios from "axios";
// import VisibilityIcon from "@material-ui/icons/Visibility";
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAssociateId, setSelectedAssociateId] = useState(null); // New state variable for storing the selected associate ID
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [temp, settemp] = useState(false);

  const token = localStorage.getItem("jwt_token");
  const history = useHistory();

  useEffect(() => {

    axios.post("http://localhost:3000/decodejwt", {
      "jwttoken": token,
    })
      .then((data) => {
        // consolelog(data);
        if (!data.data.data.isadmin) {
          history.push("/home");
        }
      })
      .catch((err) => {
        console.log("Error in DecodeJWTToken");
        console.log(err);
      })

    axios
      .get("http://localhost:3000/admin/get-users",
        {
          headers: {
            Authorization: token.toString()
          }
        })
      .then((response) => {
        setUsers(response.data.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });

    settemp(true);
  }, []);

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  // Filtered users based on search term
  const filteredUsers = users.filter((user) =>
    user.associate_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current page of users based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Event handlers
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  var handleEditUser = (user) => {
    setSelectedUser(user);
    setSelectedAssociateId(user.associate_id); // Set the selected associate ID
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
    setShowDeleteConfirmation(true); // Show the delete confirmation popup
  };

  var confirmDelete = () => {
    // Make a DELETE request to delete the user using the API
    axios
      .delete(`http://localhost:3000/admin/delete-user/${userToDelete.associate_id}`,
        {
          headers: {
            Authorization: token.toString()
          }
        }
      )
      .then(() => {
        // If the request is successful, remove the user from the local state
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userToDelete.id));
        setShowDeleteConfirmation(false); // Close the delete confirmation popup
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error deleting user:", error);
      });
  };

  var cancelDelete = () => {
    setShowDeleteConfirmation(false); // Close the delete confirmation popup without deleting
  };


  // Other event handlers (handleEditUser, handleSaveUser, handleDeleteUser, etc.)




  return (
    <div className="user-management-container">
      <h2 className="ump-h2">User Management</h2>
      <div className="filter-container">
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            className="ump-searchbar"
          />
          <button onClick={clearSearch} className="anu-clear-btn">Clear</button>
        </div>
        <div className="add-new-user-btn">
          <Link to="./addnewuser">Add New User</Link>
        </div>
      </div>
      <table className="content-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Associate ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Manager Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.associate_id}</td>
              <td>{user.associate_name}</td>
              <td>{user.email}</td>
              <td>{user.manager_name}</td>
              <td className="action-column">
                <Link to={`/admin/viewuser/${user.associate_id}`}>
                  <InfoIcon />
                  {/* <VisibilityIcon /> */}
                </Link>
                <button onClick={() => handleDeleteUser(user)}>
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {/* Render page numbers */}
        {Array.from({
          length: Math.ceil(filteredUsers.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(filteredUsers.length / itemsPerPage)
          }
        >
          Next
        </button>
      </div>

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

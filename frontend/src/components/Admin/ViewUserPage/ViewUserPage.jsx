
import React, { useState, useEffect } from 'react';
import './ViewUserPage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom"; // Import useHistory from react-router-dom
import AdminToastMessage from '../Admin-ToastMessage';

const ViewUserPage = ({ onSave, onCancel }) => {

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Function to trigger toast message
  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setToastMessage('');
      // window.location.reload(); // Refresh the page after 3 seconds
      history.push('/admin/usermanagement');
    }, 3000);
  };


  const history = useHistory(); // Initialize useHistory hook
  const { associate_id } = useParams();
  const [viewUser, setViewUser] = useState({
    associate_id: '',
    associate_name: '',
    localsystemid: '',
    email: '',
    password: '',
    manager_id: '',
    manager_name: '',
    mobile_no: '',
    manager_email: '',
    company: '',
    OpCo: ''
  });
  const token = localStorage.getItem("jwt_token")

  useEffect(() => {
    axios.get(`http://localhost:3000/admin/get-user/${associate_id}`, {
      headers: {
        Authorization: token.toString()
      }
    })
      .then(response => {
        console.log(response);
        const userData = response.data.data;
        setViewUser(userData);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [associate_id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setViewUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSave = () => {
    axios.patch(`http://localhost:3000/admin/edit-user/${viewUser.associate_id}`, viewUser, {
      headers: {
        Authorization: token.toString()
      }
    })
      .then(response => {
        console.log("User data Updated successfully");
        onSave(viewUser);
      })
      .catch(error => {
        console.error("Error updating user data:", error);
      })
      .finally(() => {
        triggerToast("User Details Updated Successfully!");
        // history.push('/admin/usermanagement');
      });
  };

  const handleCancel = () => {
    history.push('/admin/usermanagement'); // Redirect to "/admin/usermanagement" page
  };

  return (
    <>
      {showToast && <AdminToastMessage message={toastMessage} />}
      <div className="view-user-container">
        <div className="id-card">
          <div className="id-card-section">
            <div className="vup-field readonly-vup-field">
              <label>Associate ID:</label>
              <input type="text" name="associate_id" value={viewUser.associate_id} onChange={handleChange} readOnly />
            </div>
            <div className="vup-field readonly-vup-field">
              <label>Associate Name:</label>
              <input type="text" name="associate_name" value={viewUser.associate_name} onChange={handleChange} readOnly />
            </div>
            <div className="vup-field readonly-vup-field">
              <label>Local System ID:</label>
              <input type="text" name="localsystemid" value={viewUser.localsystemid} onChange={handleChange} readOnly />
            </div>
            <div className="vup-field readonly-vup-field">
              <label>Email:</label>
              <input type="email" name="email" value={viewUser.email} onChange={handleChange} readOnly />
            </div>
            <div className="vup-field">
              <label>Phone Number:</label>
              <input type="text" name="mobile_no" value={viewUser.mobile_no} onChange={handleChange} />
              {/* <input type="password" name="password" value={viewUser.password} onChange={handleChange} /> */}
            </div>
          </div>
          <div className="id-card-section">
            <div className="vup-field">
              <label>Manager ID:</label>
              <input type="text" name="manager_id" value={viewUser.manager_id} onChange={handleChange} />
            </div>
            <div className="vup-field">
              <label>Manager Name:</label>
              <input type="text" name="manager_name" value={viewUser.manager_name} onChange={handleChange} />
            </div>
            <div className="vup-field">
              <label>Manager Email:</label>
              <input type="email" name="manager_email" value={viewUser.manager_email} onChange={handleChange} />
            </div>
            <div className="vup-field readonly-vup-field">
              <label>Company:</label>
              <input type="text" name="company" value={viewUser.company} onChange={handleChange} readOnly />
            </div>
            <div className="vup-field readonly-vup-field">
              <label>OpCo:</label>
              <input type="text" name="OpCo" value={viewUser.OpCo} onChange={handleChange} readOnly />
            </div>
          </div>
        </div>
        <div className="buttons">
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button> {/* Cancel button */}
        </div>
      </div>
    </>
  );
};

export default ViewUserPage;

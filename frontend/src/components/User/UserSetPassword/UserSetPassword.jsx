import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
const useStyles = makeStyles(theme => ({
  setPasswordContainer: {
    maxWidth: 400,
    margin: '0 auto',
    padding: 30,
    border: '1px solid #ccc',
    borderRadius: 10,
    position:"relative",
    top:250,
    boxShadow: '0 5px 20px rgba(0, 0, 0, 1)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  headercp: {
    marginBottom:20,
    color:"rebeccapurple",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    border: '1px solid #ccc',
    borderRadius: 5,
  },
  error: {
    color: '#ff0000',
    marginTop: 5,
  },
  button: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    backgroundColor: 'rebeccapurple',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  },
  
}));

const SetPassword = () => {
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmationError, setConfirmationError] = useState('');

  const token = localStorage.getItem("jwt_token");
  const validatePassword = (value) => {
    // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (!validatePassword(newPassword)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);
    if (newPassword !== password) {
      setConfirmationError('Passwords do not match.');
    } else {
      setConfirmationError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordError && !confirmationError && password && confirmPassword === password) {
      // Password meets all requirements and confirmation matches
      try {
        const id = window.location.pathname.split('/').pop(); // Extract the user ID from the URL
        console.log("Value of Id from UserSetPassword : "+id);
        console.log(`http://localhost:3000/associates/setpass/${id}`);
        const response = await axios.patch(`http://localhost:3000/associates/setpass/${id}`, { "password":password }, {
        // const response = await axios.patch(`http://localhost:3000/admin/edit-user/${id}`, { "password":password }, {
          headers: {
            Authorization: token.toString()
          }
        }); // Send a PATCH request to update the user's password
        alert('Password set successfully!');
        // You can perform further actions here if needed
      } catch (error) {
        console.error('Error setting password:', error);
        // Handle error, display error message, or perform other actions as needed
      }
    }
  };

  return (
    <div className={classes.setPasswordContainer}>
      <h2 className={classes.headercp}>Set Your Password</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.inputContainer}>
          <label htmlFor="password">Enter Password:</label>
          <input
            className={classes.input}
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && <p className={classes.error}>{passwordError}</p>}
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            className={classes.input}
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {confirmationError && <p className={classes.error}>{confirmationError}</p>}
        </div>
        <button className={classes.button} type="submit">Confirm Password</button>
      </form>
    </div>
  );
};

export default SetPassword;

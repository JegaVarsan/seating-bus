import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Hidden, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import BookIcon from '@material-ui/icons/Book';
import HomeIcon from '@material-ui/icons/Home';
import { useSelector } from "react-redux";
import veraltoLogo from "./Veralto-logo.png"; // Import the image


const useStyles = makeStyles({
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  logo: {
    width: 100, // Adjust the width as needed
    height: "auto",
    marginRight:0, // Add margin if necessary
    position:"relative",
    top:-1,
  },
  authuser:
  {
    color:"white",
    fontSize:20,
  },
  userprofile:
  {
    fontSize:15,
  },
  userlogout:
  {
    fontSize:15,
  }
});

function TopBar(props) {
  const { className, openMenu, ...rest } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const auth = useSelector(state => state.auth);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar {...rest} className={clsx(classes.root, className)} color="primary">
      <Toolbar>
        <IconButton color="inherit" component={Link} to="/">
          <img src={veraltoLogo} alt="Veralto Logo" className={classes.logo} /> {/* Add the image */}
        </IconButton>
        <Typography variant="h5" color="inherit" style={{ paddingLeft: '10px' , fontSize:'20px'}}>Book Your Seat</Typography>
        <div className={classes.flexGrow} />
        <Menu open={Boolean(anchorEl)} onClose={handleMenuClose} anchorEl={anchorEl}>
          <MenuItem><Link to="/user/userprofile" className={classes.userprofile}>Profile</Link></MenuItem>
          <MenuItem><Link to="/auth/login" onClick={() => {localStorage.removeItem("user");}} className={classes.userlogout}> Logout</Link></MenuItem>
        </Menu>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={openMenu}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <IconButton color="inherit" component={Link} to="/">
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/admin/usermanagement">
            <PeopleAltIcon />
          </IconButton>
          <IconButton color="inherit" component={Link} to="/user/userbookhistory">
            <BookIcon  />
          </IconButton>
          <IconButton onClick={handleMenuOpen}>
            <p className={classes.authuser}>{auth.user}</p>
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

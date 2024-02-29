

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Hidden, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography, Tooltip } from "@material-ui/core";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import BookIcon from '@material-ui/icons/Book';
import HomeIcon from '@material-ui/icons/Home';
import { useSelector } from "react-redux";
import veraltoLogo from "./Veralto-logo.png"; // Import the image

import {getAccessLevel} from "../../../../utils/getAccessLevel";



const useStyles = makeStyles({
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  logo: {
    width: 100,
    height: "auto",
    marginRight: 0,
    position: "relative",
    top: -1,
  },
  authuser: {
    color: "white",
    fontSize: 20,
  },
  userprofile: {
    fontSize: 15,
  },
  userlogout: {
    fontSize: 15,
  },
  tooltip: {
    fontSize: 16, //font size for the words in the tooltip
    color: "black",
    background:"white",
  },
  arrow: {
    color: "red",
  },
});
// let role = await getAccessLevel(localStorage.getItem("uid"));
function TopBar(props) {
  const { className, openMenu, ...rest } = props;
  const classes = useStyles();
  const classHome = useStyles({label:"Home"});
  const classUser = useStyles({label:"Manager users"});
  const classBookHistory = useStyles({label:"Booking History"});

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
        <Typography variant="h5" color="inherit" style={{ paddingLeft: '10px', fontSize: '20px' }}>Book Your Seat</Typography>
        <div className={classes.flexGrow} />
        <Menu open={Boolean(anchorEl)} onClose={handleMenuClose} anchorEl={anchorEl}>
          <MenuItem><Link to="/userprofile" className={classes.userprofile}>Profile</Link></MenuItem>
          <MenuItem><Link to="/auth/login" onClick={() => { localStorage.removeItem("user"); localStorage.removeItem("jwt_token") }} className={classes.userlogout}> Logout</Link></MenuItem>
        </Menu>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={openMenu}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <Tooltip title="Home" arrow classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}>
            <IconButton color="inherit" component={Link} to="/">
              <HomeIcon />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="User Management" arrow classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}>
            <IconButton color="inherit" component={Link} to="/admin/usermanagement">
              <PeopleAltIcon />
            </IconButton>
          </Tooltip> */}
          {/* <Tooltip title="Manage FOW" arrow classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}>
            <IconButton color="inherit" component={Link} to="/adminmanagebooking">
              <EventIcon />
            </IconButton>
          </Tooltip> */}
          <Tooltip title="My Bookings" arrow classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}>
            <IconButton color="inherit" component={Link} to="/userbookhistory">
              <BookIcon />
            </IconButton>
          </Tooltip>
          <IconButton onClick={handleMenuOpen}>
            <Tooltip title="User" arrow classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}>
              <p className={classes.authuser}>{auth.user?auth.user.user_name:"Not loaded"}</p>
            </Tooltip>
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

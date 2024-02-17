import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import clsx from "clsx";
import React from "react";
import { Fragment } from "react";
import AppsIcon from "@material-ui/icons/Apps";
import { Link, useLocation } from "react-router-dom"; // Import useLocation hook

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    overflowY: "auto",
    // backgroundColor:"rgb(66,75,83)"
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  listItem: {
    transition: "background-color 0.3s, box-shadow 0.3s",
    color:"black",
  },
  activeListItem: {
    backgroundColor: "rgb(113, 47, 145)",
    color:"white",
  },
  
  listItemHover: {
    "&:hover": {
      backgroundColor: "rgb(170, 187, 17)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      "& .navbar-lit": {
        color: "#FFFFFF", // Change text color to white on hover
      },
    },
  },
  
}));

function NavBar(props) {
  const { openMenu, closeMenu, className, ...rest } = props;
  const classes = useStyles();
  const location = useLocation(); // Use useLocation hook to get the current location

  return (
    <Fragment>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          variant="temporary"
          onClose={closeMenu}
          open={openMenu}
        >
          <div {...rest} className={clsx(classes.root, className)}></div>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Paper
          {...rest}
          className={clsx(classes.root, className)}
          elevation={1}
          square
        >
          <List>
            <ListItem
              component={Link}
              to="/"
              className={clsx(
                classes.listItem,
                classes.listItemHover,
                location.pathname === "/" && classes.activeListItem // Check for exact match with location.pathname
              )}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText className="navbar-lit">Home</ListItemText>
            </ListItem>
            <ListItem
              component={Link}
              to="/table"
              className={clsx(
                classes.listItem,
                classes.listItemHover,
                location.pathname === "/table" && classes.activeListItem
              )}
            >
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText className="navbar-lit">Table</ListItemText>
            </ListItem>
            <ListItem
              component={Link}
              to="/admin/usermanagement"
              className={clsx(
                classes.listItem,
                classes.listItemHover,
                location.pathname === "/admin/usermanagement" && classes.activeListItem
              )}
            >
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText className="navbar-lit">Manage User</ListItemText>
            </ListItem>
            <ListItem
              component={Link}
              to="/bookyourseat"
              className={clsx(
                classes.listItem,
                classes.listItemHover,
                location.pathname === "/bookyourseat" && classes.activeListItem
              )}
            >
              <ListItemIcon>
                <EventSeatIcon />
              </ListItemIcon>
              <ListItemText className="navbar-lit">Book Your Seat</ListItemText>
            </ListItem>
          </List>
        </Paper>
      </Hidden>
    </Fragment>
  );
}

export default NavBar;
import { AppBar, Toolbar,IconButton,makeStyles,  Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import veraltoLogo from "./Veralto-logo.png"; // Import the image


const useStyles = makeStyles({
  logo: {
    width: 100, // Adjust the width as needed
    height: "auto",
    marginRight:0, // Add margin if necessary
    position:"relative",
    top:-1,
  },
});

function TopBar() {
  const classes = useStyles();
  return (
    <AppBar color="primary">
      <Toolbar>
      <IconButton color="inherit" component={Link} to="/">
          <img src={veraltoLogo} alt="Veralto Logo" className={classes.logo} /> {/* Add the image */}
        </IconButton>
        <Typography
          variant="h5"
          color="inherit"
          style={{ paddingLeft: "10px" }}
        >
          Veralto | Book Your Seat
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

const white = '#FFFFFF';
const black = '#000000';
const rebeccapurple = '#663399'; // Color code for rebeccapurple

const palette = {
  black,
  white,
  primary: {
    contrastText: white,
    dark: "#663399", // Dark shade of rebeccapurple
    main: "#663399", // Main shade of rebeccapurple
    light: "#663399" // Light shade of rebeccapurple
  },
  secondary: {
    contrastText: white,
    dark: `${rebeccapurple}D3`, // Dark shade of rebeccapurple
    main: `${rebeccapurple}A4`, // Main shade of rebeccapurple
    light: `${rebeccapurple}A4` // Light shade of rebeccapurple
  },
  error: {
    contrastText: white,
    dark: '#B00020', // Dark shade of red for error
    main: '#FF5252', // Main shade of red for error
    light: '#FFCDD2' // Light shade of red for error
  },
  text: {
    primary: '#121212', // Primary text color
    secondary: '#616161', // Secondary text color
    link: '#FFFFFF' // Link text color
  },
  link: `${rebeccapurple}80`, // Link color with alpha
  icon: '#757575', // Icon color
  background: {
     default: '#F4F6F8', // Default background color
     paper: white // Paper background color
  },
  divider: '#E0E0E0' // Divider color
};

export default palette;


// const white = '#FFFFFF';
// const black = '#000000';
// const rebeccapurple = '#712F91'; // Color code for rebeccapurple

// const palette = {
//   black,
//   white,
//   primary: {
//     contrastText: white,
//     dark: `${rebeccapurple}`, // Dark shade of rebeccapurple
//     main: "#663399", // Main shade of rebeccapurple
//     light: `${rebeccapurple}` // Light shade of rebeccapurple
//   },
//   secondary: {
//     contrastText: white,
//     dark: `${rebeccapurple}D3`, // Dark shade of rebeccapurple
//     main: `${rebeccapurple}A4`, // Main shade of rebeccapurple
//     light: `${rebeccapurple}A4` // Light shade of rebeccapurple
//   },
//   error: {
//     contrastText: white,
//     dark: '#B00020', // Dark shade of red for error
//     main: '#FF5252', // Main shade of red for error
//     light: '#FFCDD2' // Light shade of red for error
//   },
//   text: {
//     primary: '#121212', // Primary text color
//     secondary: '#616161', // Secondary text color
//     link: '#FFFFFF' // Link text color
//   },
//   link: `${rebeccapurple}80`, // Link color with alpha
//   icon: '#757575', // Icon color
//   background: {
//      default: '#F4F6F8', // Default background color
//      paper: white // Paper background color
//   },
//   divider: '#E0E0E0' // Divider color
// };

// export default palette;

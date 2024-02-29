exports.getDate=(date)=>{
// Parse the input date string
var inputDate = new Date(date);

// Extract year, month, and day components
var year = inputDate.getFullYear();
var month = inputDate.toLocaleString('default', { month: 'long' });
var day = inputDate.getDate();

// Add ordinal suffix to day
var suffix = "";
if (day === 1 || day === 21 || day === 31) {
    suffix = "st";
} else if (day === 2 || day === 22) {
    suffix = "nd";
} else if (day === 3 || day === 23) {
    suffix = "rd";
} else {
    suffix = "th";
}

// Assemble the components into the desired format
var outputDateStr = day + suffix + " " + month + " " + year;
return outputDateStr;
}


const nodemailer = require('nodemailer');
 
 
const User = require('../models/user');
 
 
const {  MAIL_SERVER_USER_NAME,MAIL_SERVER_USER_PASSWORD } = require('../utils/secrets');
 
const { generate: generateToken, decode: decodeToken } = require('../utils/token');
 
// Create a transporter object using SMTP details
function getDate(date){
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
outputDateStr = day + suffix + " " + month + " " + year;
return outputDateStr;
}
const transporter = nodemailer.createTransport({
    host: 'email-smtp.eu-central-1.amazonaws.com',
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user:'AKIAYUXGM3VQMLJC2FSM',
      pass:'BC6iA1cAGSWVkTFp4yLrL7+QomPOqQsci3utkMjrPpX4'
    }
  });
 
  exports.sendMail = async (req, res) => {
    // Extract email data from request body
    const associate_id = req.params.uid;
    let associate_mail;
    let associate_name;
    try{
     const user =  await User.findOne({where:{
            associate_id:associate_id
        }});
     associate_mail = user.dataValues.email;
     associate_name = user.dataValues.associate_name;
    }catch(err){
        console.log("Something went wrong while fetching the mail "+err);
    }
   
    const setpass_token = generateToken(associate_id,associate_mail);
    console.log(setpass_token);
    console.log(decodeToken(setpass_token));
    // Create email message
    const mailOptions = {
      from: 'seating_app@compliance.esko-saas.com',
      to: associate_mail,
      subject: `Welcome to Book Your Seat!`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Set your password</title>
      </head>
      <body>
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Hi ${associate_name}, Welcome to Book Your Seat</h2>
          <p>You've been added as a new user. To set your password and access your account, please click the link below:</p>
          <p><a href="http://localhost:3000/associates/resetpass/${setpass_token}" target="_blank">Click here to set your passwordd</a></p>
          <p>If you did not request this, you can ignore this email and your password will remain unchanged.</p>
          <p>Thanks,<br>Admin</p>
        </div>
      </body>
      </html>
    `,
      text:"test mail"
    };
 
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.send('Email sent successfully');
      }
    });
  }
 
 
  exports.forgotPassMail = async (email) => {
    // Extract email data from request body
    let associate_mail = email;
 
    const setpass_token = "test";
 
    console.log("Sending mail to ..."+associate_mail);
    // Create email message
    const mailOptions = {
      from: 'seating_app@compliance.esko-saas.com',
      to: associate_mail,
      subject: "Book Your Seat | Forgot password ",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Set Your Password</title>
      </head>
      <body>
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Welcome to Book Your Seat</h2>
          <p>Here is the link to reset your password. Please don't share this link with anyone</p>
          <p><a href="http://localhost:3000/associates/resetpass/${setpass_token}" target="_blank">Set Your Password</a></p>
          <p>If you did not request this, you can ignore this email and your password will remain unchanged.</p>
          <p>Thanks,<br>Admin</p>
        </div>
      </body>
      </html>
    `,
      text:"test mail"
    };
 
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
 
 
  exports.bookingSucessMail = async (req,res) => {
   
    console.log("From booking success mail "+JSON.stringify(req.body));
    // Extract email data from request body
    let id = req.body.booked_for_id;
    const seat_no = req.body.seat_number;
    const booked_by= req.body.seat_booked_by;
    const booked_date= getDate(req.body.seat_selection_date);
    console.log("Sending mail for this id "+id);
    User.findOne({where:{
      associate_id:id
    }}).then(user=>{
      console.log("Booked for user "+JSON.stringify(user));
 
      const mailOptions = {
        from: 'seating_app@compliance.esko-saas.com',
        to: user.email,
        subject: "Book Your Seat | Booking successful!",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking details</title>
        </head>
        <body>
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>A seat has been booked for you ! on ${booked_date}</h2>
            <p>Please find the booking details below!</p>
            <p>Seat number: ${seat_no}</p>
            <p>Booked By: ${booked_by}</p>
            <p>If you want to cancel this seat, You can do it under your booking history page</p>
            <p>Thanks,<br>Admin</p>
          </div>
        </body>
        </html>
      `,
        text:"test mail"
      };
   
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }).catch(err=>{
      console.log("Error while fetching user data in bookingsuccessmail controller "+err);
    })
   
  }
 
 
  exports.bookingSucessMailManager = async (req,res) => {
   
    console.log("From manager booking success mail "+JSON.stringify(req.body));
    // Extract email data from request body
    let id = req.body.booked_by_id;
    const booked_date = getDate(req.body.booked_for_date);
    const booked_by= req.body.booked_by;
    const bookings = req.body.bookings;
    console.log("Sending mail for this id "+id);
    User.findOne({where:{
      associate_id:id
    }}).then(user=>{
      console.log("Booked for user "+JSON.stringify(user));
 
      const mailOptions = {
        from: 'seating_app@compliance.esko-saas.com',
        to: user.email,
        subject: "Book Your Seat | Booking successful!",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking details</title>
        </head>
        <body>
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>You have booked seats for you/your associates on ${booked_date}</h2>
            <p>Please find the booking details below!</p>
            <p>${bookings}</p>
            <p>If you want to cancel this seat, You can do it under your booking history page</p>
            <p>Thanks,<br>Admin</p>
          </div>
        </body>
        </html>
      `,
        text:"test mail"
      };
   
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }).catch(err=>{
      console.log("Error while fetching user data in bookingsuccessmail controller "+err);
    })
   
  }
 
  exports.bookingCancelMail = async (req,res) => {
   
    console.log("From booking cancel mail "+JSON.stringify(req.body));
    // Extract email data from request body
    let booked_for_mail = req.body.booked_for_email;
    const seat_no = req.body.seat_number;
    const cancelled_by = req.body.seat_cancelled_by;
    const cancellation_date = getDate(req.body.seat_cancellation_date);
    console.log("From ec , The seat "+seat_no+" that was booked on "+cancellation_date+" by "+cancelled_by);
      const mailOptions = {
        from: 'seating_app@compliance.esko-saas.com',
        to: booked_for_mail,
        subject: "Book Your Seat | Booking Cancelled",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking details</title>
        </head>
        <body>
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Your seat booking for ${cancellation_date} has been cancelled</h2>
            <p>Please find the booking details below!</p>
            <p>Seat number: ${seat_no}</p>
            <p>Cancelled by: ${cancelled_by}</p>
            <p>Thanks,<br>Admin</p>
          </div>
        </body>
        </html>
      `,
      };
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });  
   
  }
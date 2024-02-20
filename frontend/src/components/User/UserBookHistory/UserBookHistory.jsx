import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserBookHistory.css"; // Import CSS for styling
 
const UserBookHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
 
  useEffect(() => {
    fetchBookings(); // Fetch bookings data on initial render
  }, []);
 
  const fetchBookings = () => {
    // Fetch bookings data from the API for the associate with id 102
    axios.get(`http://localhost:3000/get-bookings/1234`)
      .then(response => {
        if (response.data.stats === "success") {
          const allBookings = response.data.data.user;
          // Separate bookings into current and past based on date comparison
          const currentDate = new Date();
          const currentBookings = allBookings.filter(booking => new Date(booking.seat_selection_date) >= currentDate);
          const pastBookings = allBookings.filter(booking => new Date(booking.seat_selection_date) < currentDate);
          setCurrentBookings(currentBookings);
          setPastBookings(pastBookings);
          setBookings(allBookings);
        } else {
          console.error("Invalid data format:", response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching bookings:", error);
      });
  };
 
  return (
    <div className="user-book-history">
      <h1 className="ubh-h">User Book History</h1>
      <div className="bookings-container">
        <div className="lf-section">
          <h2 className="lf-h">Current and Future Bookings</h2>
          {currentBookings.length > 0 ? (
            currentBookings.map((booking, index) => (
              <div key={index} className="lf-booking">
                {/* Render booking details for current and future dates */}
                <div className="booking-item lf-bi">
                  <div className="label">Booking ID</div>
                  <div className="value">{booking.booking_id}</div>
                </div>
                <div className="separator"></div>
                <div className="booking-item lf-bi">
                  <div className="label">Seat Number</div>
                  <div className="value">{booking.seat_number}</div>
                </div>
                <div className="separator"></div>
                <div className="booking-item lf-bi">
                  <div className="label">Selection Date</div>
                  <div className="value">{booking.seat_selection_date}</div>
                </div>
                <div className="separator"></div>
                <div className="booking-item lf-bi">
                  <div className="label">Booked For ID</div>
                  <div className="value">{booking.booked_for_id}</div>
                </div>
                <div className="separator"></div>
                <div className="booking-item lf-bi">
                  <div className="label">Booked For Name</div>
                  <div className="value">{booking.booked_for_name}</div>
                </div>
                <div className="separator"></div>
                <div className="booking-item lf-bi">
                  <div className="label">Booked By</div>
                  <div className="value">{booking.seat_booked_by}</div>
                </div>
              </div>
            ))
          ) : (
            <p>No current or future bookings found.</p>
          )}
        </div>
        <div className="separator-line"></div>
        <div className="pb-section">
          <h2 className="pb-h">Past Bookings</h2>
          {pastBookings.length > 0 ? (
            pastBookings.map((booking, index) => (
              <div key={index} className="pb-booking">
                {/* Render booking details for past dates */}
                <div className="booking-item pb-bi">
                  <div className="label">Booking ID</div>
                  <div className="value">{booking.booking_id}</div>
                </div>
                <div className="separator"></div>
                <div className="booking-item pb-bi">
                  <div className="label">Seat Number</div>
                  <div className="value">{booking.seat_number}</div>
                </div>
                <div className="separator"></div>
                <div className="booking-item pb-bi">
                  <div className="label">Selection Date</div>
                  <div className="value">{booking.seat_selection_date}</div>
                </div>
                <div className="separator"></div>
                <div className="booking-item pb-bi">
                  <div className="label">Booked For ID</div>
                  <div className="value">{booking.booked_for_id}</div>
                </div>
                <div className="separator"></div>
                <div className="booking-item pb-bi">
                  <div className="label">Booked For Name</div>
                  <div className="value">{booking.booked_for_name}</div>
                </div>
                <div className="separator"></div>
                <div className="booking-item pb-bi">
                  <div className="label">Booked By</div>
                  <div className="value">{booking.seat_booked_by}</div>
                </div>
              </div>
            ))
          ) : (
            <p>No past bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default UserBookHistory;
 
import React from 'react';
import './UserBookHistory.css';

const UserBookingHistory = () => {
  // Static data for live and future bookings
  const liveBookings = [
    { id: 1, associateId: 'A123', associateName: 'John Doe', bookedBy: 'Jane Smith', bookedFor: 'John Doe', fromDate: '2024-02-10', toDate: '2024-02-12', seatNumber: 'A1' },
    { id: 2, associateId: 'B456', associateName: 'Alice Johnson', bookedBy: 'Bob Brown', bookedFor: 'Alice Johnson', fromDate: '2024-03-15', toDate: '2024-03-18', seatNumber: 'B5' },
    { id: 2, associateId: 'B456', associateName: 'Alice Johnson', bookedBy: 'Bob Brown', bookedFor: 'Alice Johnson', fromDate: '2024-03-15', toDate: '2024-03-18', seatNumber: 'B5' },
    { id: 2, associateId: 'B456', associateName: 'Alice Johnson', bookedBy: 'Bob Brown', bookedFor: 'Alice Johnson', fromDate: '2024-03-15', toDate: '2024-03-18', seatNumber: 'B5' },
    { id: 2, associateId: 'B456', associateName: 'Alice Johnson', bookedBy: 'Bob Brown', bookedFor: 'Alice Johnson', fromDate: '2024-03-15', toDate: '2024-03-18', seatNumber: 'B5' },
    { id: 2, associateId: 'B456', associateName: 'Alice Johnson', bookedBy: 'Bob Brown', bookedFor: 'Alice Johnson', fromDate: '2024-03-15', toDate: '2024-03-18', seatNumber: 'B5' },
    { id: 2, associateId: 'B456', associateName: 'Alice Johnson', bookedBy: 'Bob Brown', bookedFor: 'Alice Johnson', fromDate: '2024-03-15', toDate: '2024-03-18', seatNumber: 'B5' },
    { id: 2, associateId: 'B456', associateName: 'Alice Johnson', bookedBy: 'Bob Brown', bookedFor: 'Alice Johnson', fromDate: '2024-03-15', toDate: '2024-03-18', seatNumber: 'B5' },
    { id: 2, associateId: 'B456', associateName: 'Alice Johnson', bookedBy: 'Bob Brown', bookedFor: 'Alice Johnson', fromDate: '2024-03-15', toDate: '2024-03-18', seatNumber: 'B5' },
    { id: 2, associateId: 'B456', associateName: 'Alice Johnson', bookedBy: 'Bob Brown', bookedFor: 'Alice Johnson', fromDate: '2024-03-15', toDate: '2024-03-18', seatNumber: 'B5' },
    // Add more live bookings here
  ];

  // Static data for past bookings
  const pastBookings = [
    { id: 3, associateId: 'C789', associateName: 'Emily Williams', bookedBy: 'David Wilson', bookedFor: 'Emily Williams', fromDate: '2023-12-20', toDate: '2023-12-22', seatNumber: 'C10' },
    // Add more past bookings here
  ];

  return (
    <div className="user-booking-history">
      <div className="live-future-bookings">
        <h2>Live and Future Bookings</h2>
        <div className="lf-bookings-container">
          {liveBookings.map(booking => (
            <div key={booking.id} className="booking">
              <p>Associate ID: {booking.associateId}</p>
              <p>Associate Name: {booking.associateName}</p>
              <p>Booked By: {booking.bookedBy}</p>
              <p>Booked For: {booking.bookedFor}</p>
              <p>From Date: {booking.fromDate}</p>
              <p>To Date: {booking.toDate}</p>
              <div className="seat-icon">{booking.seatNumber}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="past-bookings">
        <h2>Past Bookings</h2>
        <div className="pb-bookings-container">
          {pastBookings.map(booking => (
            <div key={booking.id} className="booking">
              <p>Associate ID: {booking.associateId}</p>
              <p>Associate Name: {booking.associateName}</p>
              <p>Booked By: {booking.bookedBy}</p>
              <p>Booked For: {booking.bookedFor}</p>
              <p>From Date: {booking.fromDate}</p>
              <p>To Date: {booking.toDate}</p>
              <div className="seat-icon">{booking.seatNumber}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserBookingHistory;

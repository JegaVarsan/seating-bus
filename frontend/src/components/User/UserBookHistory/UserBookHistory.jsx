import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserBookHistory.css"; // Import CSS for styling
import ToastMessage from '../ToastMessage'; // Import Toast Message
 

 
const trim = (str) => {
  var string = "";
  for (let i = 1; i < str.length - 1; i++) string += str[i];
  return string;
};
 
const UserBookHistory = () => {
 
  console.log("Loading user book history");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
 
  // Function to trigger toast message
  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setToastMessage('');
      // window.location.reload(); // Refresh the page after 3 seconds
    }, 1000);
  };
 
 
  const [currentBookings, setCurrentBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Leave");
  const [remarks, setRemarks] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
 
  useEffect(() => {
 
    const fetchData = async () => {
      try {
 
        const responseCurrent = await axios.get(
          `http://localhost:3000/seat/get-booking/${json_body}`
        );
        const responseCancelled = await axios.get(
          `http://localhost:3000/seat/get-cancel-booking/${json_body}`
        );
 
        if (
          responseCurrent.data.status === "success" &&
          responseCancelled.data.status === "success"
        ) {
          const allBookings = responseCurrent.data.datas;
          const currentDate = new Date().toISOString().split('T')[0];
          const current = allBookings.filter(
            (booking) => new Date(booking.seat_selection_date).toISOString().split('T')[0] > currentDate
          );
          const past = allBookings.filter(
            (booking) => new Date(booking.seat_selection_date).toISOString().split('T')[0] <= currentDate
          );
 
          setCurrentBookings(current);
          setPastBookings(past);
          setCancelledBookings(responseCancelled.data.datas);
          setLoading(false);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
 
    var json_body;
 
    axios.post(`http://localhost:3000/decodejwt`, {
      "jwttoken": localStorage.getItem("jwt_token"),
    })
      .then((data) => {
        json_body = data.data.data.id
        fetchData();
      })
      .catch((err) => {
        console.log("Error in DecodeJWTToken");
        console.log(err);
      })
 
 
  }, []);
 
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
 
  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };
 
  const handleCancel = () => {
    setShowPopup(false);
    setRemarks("");
  };
 
  const handleConfirmCancel = async () => {
    if (!selectedBooking || !selectedBooking.seat_selection_date) {
      console.error("Invalid booking object:", selectedBooking);
      return;
    }
 
    const json_body = {
      date: selectedBooking.seat_selection_date,
      seat_number: selectedBooking.seat_number,
      associate_id: selectedBooking.booked_for_id,
      booked_by: selectedBooking.seat_booked_by,
      cancelled_by: trim(localStorage.getItem("user")),
      remarks: selectedOption === "Other" ? remarks : selectedOption,
    };
    var response =  await axios
      .post(`http://localhost:3000/api/auth/cancelseat`, json_body)
    console.log("Book history "+JSON.stringify(response));
    if(response){
        window.location.reload();
        setShowPopup(false);
        triggerToast("Reason Saved & Seat Cancelled successfully!"); // Trigger toast message on successful booking
        alert("Seat cancelled successfully!!!");
        var response = await axios.post(`http://localhost:3000/booking-cancelled`,response.data.data);
    }
  };
 
  return (
    <>
      {showToast && <ToastMessage message={toastMessage} />}
      {loading ? (
        <h1>Loading!!!</h1>
      ) : (
        <div className="user-book-history">
          <h1 className="ubh-h">Your Booking history</h1>
          <div className="bookings-container">
            <div className="lf-section">
              <h2 className="lf-h">Current and Future Bookings</h2>
              <div className="lf-table-container">
                <table className="lf-table">
                  <thead>
                    <tr>
                      <th>Booking Number</th>
                      <th>Seat Number</th>
                      <th>Booking Date</th>
                      <th>Associate Name</th>
                      <th>Booked By</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBookings.map((booking, index) => (
                      <tr key={index}>
                        <td>{booking.booking_id}</td>
                        <td>{booking.seat_number}</td>
                        <td>{booking.seat_selection_date}</td>
                        <td>{booking.booked_for_name}</td>
                        <td>{booking.seat_booked_by}</td>
                        <td>
                          <button
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowPopup(true);
                            }}
                            className="cancelseat-btn"
                          >
                            Cancel Seat
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
 
            <div className="separator-line"></div>
            <div className="pb-section">
              <h2 className="pb-h">Past Bookings</h2>
              <table className="pb-table">
                <thead>
                  <tr>
                    <th>Booking Number</th>
                    <th>Seat Number</th>
                    <th>Booked Date</th>
                    <th>Associate Name</th>
                    <th>Booked By</th>
                  </tr>
                </thead>
                <tbody>
                  {pastBookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.booking_id}</td>
                      <td>{booking.seat_number}</td>
                      <td>{booking.seat_selection_date}</td>
                      <td>{booking.booked_for_name}</td>
                      <td>{booking.seat_booked_by}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="separator-line"></div>
            <div className="cb-section">
              <h2 className="cb-h">Cancelled Bookings</h2>
              <table className="cb-table">
                <thead>
                  <tr>
                    <th>Cancellation Number</th>
                    <th>Seat Number</th>
                    <th>Cancelled Date</th>
                    <th>Cancelled By</th>
                    <th>Cancelled Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {cancelledBookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.booking_id}</td>
                      <td>{booking.seat_number}</td>
                      <td>{booking.seat_cancellation_date}</td>
                      <td>{booking.seat_cancelled_by}</td>
                      <td>{booking.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>Select reason:</h2>
            <div>
              <input
                type="radio"
                id="On Leave"
                name="reason"
                value="On Leave"
                checked={selectedOption === "On Leave"}
                onChange={handleOptionChange}
              />
              <label htmlFor="On Leave">On Leave</label>
            </div>
            <div>
              <input
                type="radio"
                id="Picked Wrong Seat"
                name="reason"
                value="Picked Wrong Seat"
                checked={selectedOption === "Picked Wrong Seat"}
                onChange={handleOptionChange}
              />
              <label htmlFor="Picked Wrong Seat">Picked Wrong Seat</label>
            </div>
            <div>
              <input
                type="radio"
                id="other"
                name="reason"
                value="Other"
                checked={selectedOption === "Other"}
                onChange={handleOptionChange}
              />
              <label htmlFor="other">Other (Specify Reason)</label>
              {selectedOption === "Other" && (
                <textarea
                  className="remarks-input"
                  placeholder="Enter Reason (Max 200 characters)"
                  value={remarks}
                  onChange={handleRemarksChange}
                  maxLength={200}
                />
              )}
            </div>
            <div className="popup-button">
              <div>
                <button className="confirm-btn" onClick={handleConfirmCancel}>
                  Confirm
                </button>
              </div>
              <div>
                <button className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
 
export default UserBookHistory;
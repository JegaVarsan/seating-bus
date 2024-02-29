import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import './AdminManageBooking.css'
import "./cubes_veralto.png";

const generate_FOW_table = async () => {
    try {
        var json_body = {
            "from_date": document.getElementById('date-checkin').value,
            "to_date": document.getElementById('date-checkout').value,
        }
        const response = await axios.post('http://localhost:3000/generate_seat', json_body);
        console.log(response.data);
        alert("Seat generation is success!!!");
        window.location.reload();
    }
    catch (err) {
        console.log("Error in generate FOW table")
        console.log(err);
    }
}


const AdminManageBooking = () => {
    const [pickedDate, setPickedDate] = useState(null);
    const [today, setToday] = useState('');
    const history = useHistory();

    useEffect(() => {
        axios.post("http://localhost:3000/decodejwt", {
            "jwttoken": localStorage.getItem("jwt_token"),
        })
            .then((data) => {
                // consolelog(data);
                if (!data.data.data.isadmin) {
                    history.push("/home");
                }
            })
            .catch((err) => {
                console.log("Error in DecodeJWTToken");
                console.log(err);
            })
        const todayDate = new Date().toISOString().split('T')[0];
        setToday(todayDate);
    }, []);

    const handleDateChange = (date) => {
        setPickedDate(date);
    };
    return (
        <div id="manage-booking" className="section-managebooking">
            <h2 className="section-title">Manage FOW</h2>
            <div className="manage-seat-datebody">
                <div className="reservation-box">
                    <div className="top">
                        <div className="static">
                            <div className="input-container" id="date-picker-container">
                                <label htmlFor="date-from">check-in</label>
                                <input
                                    type="date"
                                    id="date-checkin"
                                    className="date-field"
                                    name="date-from"
                                    min={today} // Set min attribute to disable past dates
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="input-container" id="date-picker-container">
                                <label htmlFor="date-from">check-out</label>
                                <input
                                    type="date"
                                    id="date-checkout"
                                    className="date-field"
                                    name="date-to"
                                    min={today} // Set min attribute to disable past dates
                                />
                            </div>
                        </div>
                        <div className="button-container">
                            <span className="button ok" onClick={generate_FOW_table}>Open Booking</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminManageBooking

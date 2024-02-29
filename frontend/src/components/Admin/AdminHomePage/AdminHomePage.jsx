import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./AdminHomePage.css";

const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
};

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

const generatereport = () => {
    axios.get('http://localhost:3000/generatereport')
        .then((data) => {
            console.log(data);
            alert("Report generation is success");
        })
        .catch((err) => {
            console.log("Error in report generation")
        })
}

const HeroSection = ({ handleDateChange, pickedDate }) => {
    const [date, setdate] = useState('');
    const [today, setToday] = useState('');

    useEffect(() => {
        const todayDate = new Date().toISOString().split('T')[0];
        setdate(todayDate);
        setToday(todayDate);
    }, []);

    const handlechange = (event) => {
        setdate(event.target.value);
    }

    return (
        <header className="adminhome-hero">
            <div className="adminhome-hero-content">
                <h1 className="adminhome-hero-title">Your Comfort Awaits, Reserve Now</h1>
                <p className="adminhome-hero-subtitle">
                    Make seat reservations simple and straightforward.
                </p>

                <div className="adminhome-hero-buttons">
                    <div>
                        <input type="date" id="date_picker" className="admin-date-picker" value={date} selected={pickedDate} min={today} onChange={handlechange} />
                    </div>
                    <div>
                        <Link to={{ pathname: "/seatlayout", state: { selecteddate: date } }
                        } className="AdminHomePage-btn-2">Block Seat</Link>
                    </div>
                </div>

                <div className="reportgen-btn">
                    <button onClick={generatereport} className="AdminHomePage-gr-btn">Generate Report</button>
                </div>
            </div>
        </header>
    );
};

const AdminHomePage = () => {
    const [pickedDate, setPickedDate] = useState(null);
    const [today, setToday] = useState('');
    const history = useHistory();

    useEffect(() => {
        const todayDate = new Date().toISOString().split('T')[0];
        setToday(todayDate);
    }, []);

    const handleDateChange = (date) => {
        setPickedDate(date);
    };

    return (
        <div className="content whole-body-AdminHomePage">
            <HeroSection handleDateChange={handleDateChange} pickedDate={pickedDate} />
        </div>
    );
};

export default AdminHomePage;
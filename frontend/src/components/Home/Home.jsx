import React, { useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import "./Home.css";


const HeroSection = ({ handleDateChange, pickedDate }) => {

  
  const [date,setdate]=useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setdate(today);
  }, []);

  const handlechange=(event)=>{
    setdate(event.target.value);
  }

  return (
    <header className="userhome-hero">
      <div className="userhome-hero-content">
        
        <h1 className="userhome-hero-title">Your Comfort Awaits, Reserve Now</h1>
        <p className="userhome-hero-subtitle">
          Make seat reservations simple and straightforward.
        </p>
        <div className="home-seatlayout-gad">
          <input type="date" id="date_picker" className="date-picker" value={date} selected={pickedDate}  min={date} onChange={handlechange} />
          
          <Link
            to={{ pathname: "./seatlayout", state: { selecteddate:date }}}
            className="book-seat-link"
          >
            Book Seat
          </Link>
        </div>
      </div>
    </header>
  );
};

const Home = () => {
  const [pickedDate, setPickedDate] = useState(null);
  const history = useHistory();

  const handleDateChange = (date) => {
    setPickedDate(date);
  };

  return (
    <div className="content whole-body-home">
      <HeroSection handleDateChange={handleDateChange} pickedDate={pickedDate} />
    </div>
  );
};

export default Home;

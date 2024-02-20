import React from "react";
// import { Link } from "react-router-dom";
import "./Home.css";
import SeatLayout from "../Seat_Booking/SeatLayout";
import { useHistory } from 'react-router-dom';

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  section.scrollIntoView({ behavior: "smooth" });
};

const date_pick={
  width:200,
  padding:10,
}



const HeroSection = () => {

  const history = useHistory();

  const handleclick=()=>{
    history.push({
      pathname: '/seatlayout',
      state: { date: document.getElementById('date_picker').value }
  });

  }
  return (
    <header className="userhome-hero">
      <div className="userhome-hero-content">
        <h1 className="userhome-hero-title">Your Comfort Awaits, Reserve Now</h1>
        <p className="userhome-hero-subtitle">
          Make seat reservations simple and straightforward.
        </p>
        <div>
            <label htmlFor="date">Date:</label>
            <input
                type="date"
                id="date_picker"
                name="Date"
                style={date_pick}
            />
        </div>
        <br></br>

        <div className="userhome-hero-button">
          <button
            onClick={handleclick}
            className="HomePage-btn-1"
          >
            Book Your Seat
          </button>
        </div>
        <div id="wrapper">
          <div id="wrapper-inner">
            <div id="scroll-down">
              <span class="arrow-down"></span>
              <span id="scroll-title">Scroll down</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Home = () => {
  return (
    <div className="content whole-body-home">
      <HeroSection />
      <div id="user-bookseatsection" className="section-bookseat">
        <h2 className="section-title">Book Your Seat!!</h2>
        <SeatLayout /> {/* Render SeatLayout component here */}
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import SeatLayout from "../Seat_Booking/SeatLayout";


const scrollToSection = (id) => {
  const section = document.getElementById(id);
  section.scrollIntoView({ behavior: "smooth" });
};


const HeroSection = () => {
  return (
    <header className="userhome-hero">
      <div className="userhome-hero-content">
        <h1 className="userhome-hero-title">Your Comfort Awaits, Reserve Now</h1>
        <p className="userhome-hero-subtitle">
          Make seat reservations simple and straightforward.
        </p>
        <div className="userhome-hero-button">
          <button
            onClick={() => scrollToSection("user-bookseatsection")}
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

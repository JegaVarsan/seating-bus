import React from "react";
import { Link } from "react-router-dom";
import "./AdminHomePage.css";

const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
};

const HeroSection = () => {
    return (
        <header className="adminhome-hero">
            <div className="adminhome-hero-content">
                <h1 className="adminhome-hero-title">Your Comfort Awaits, Reserve Now</h1>
                <p className="adminhome-hero-subtitle">
                    Make seat reservations simple and straightforward.
                </p>
                <div className="adminhome-hero-buttons">
                    <button
                        onClick={() => scrollToSection("manage-booking")}
                        className="AdminHomePage-btn-1"
                    >
                        Manage Booking
                    </button>
                    <button
                        onClick={() => scrollToSection("manage-seat")}
                        className="AdminHomePage-btn-2"
                    >
                        Manage Seat
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

const AdminHomePage = () => {
    return (
        <div className="content whole-body-AdminHomePage">
            <HeroSection />
            <div id="manage-booking" className="section-managebooking">
                <h2 className="section-title">Manage Booking</h2>
                <div class="manage-seat-datebody">
                    <div class="reservation-box">
                        <div class="top">
                            <div class="static">
                                <div class="input-container" id="date-picker-container">
                                    <label for="date-from">check-in</label>
                                    <input type="date" id="date-checkin" class="date-field" name="date-from" />
                                </div>
                            </div>
                            <div class="flex">
                                <div class="input-container" id="date-picker-container">
                                    <label for="date-from">check-out</label>
                                    <input type="date" id="date-checkout" class="date-field" name="" />
                                </div>
                                <div class="button-container">
                                    <span class="button ok">Open Booking</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="manage-seat" className="section-manageseat">
                <h2 className="section-title">Manage Seat</h2>
                {/* Your content for Manage Seat section */}
            </div>
        </div>
    );
};

export default AdminHomePage;

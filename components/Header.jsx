// src/components/Header.js
import React, { useState } from 'react';
import './home.css';
import './NewPage.css';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import yt from '../assets/images/yt.png';
import fb from '../assets/images/fb.png';
import linked from '../assets/images/linked.png';
import inst from '../assets/images/inst.png';
import call from '../assets/images/call.png';
import searchIcon from '../assets/images/search-icon.png';
import menuIcon from '../assets/images/menu.png';
import closeIcon from '../assets/images/closethick.png';

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header" id="header">
            <div className="desk-head">
                <div className="cust-container">
                    <div className="head flex">
                        <div className="logo">
                            <NavLink to="/"><img src={logo} alt="logo" /></NavLink>
                        </div>
                        <div className="contact-details flex">
                            <div className="social-links flex">
                                <a href="#"><img src={yt} alt="yoytube" /></a>
                                <a href="#"><img src={fb} alt="facebook" /></a>
                                <a href="#"><img src={linked} alt="linkedin" /></a>
                                <a href="#"><img src={inst} alt="instagram" /></a>
                            </div>
                            <div className="phone-details flex">
                                <a href="tel:+912224476666">
                                    <img className="phone-num" src={call} alt="phone" />022-69871211
                                </a>
                                <div className="search-icon">
                                    <a href="#"><img src={searchIcon} alt="search" /></a>
                                </div>
                            </div>
                            <div className="information flex">
                                <NavLink to="/contact" className="btn with-color">Book Appointment</NavLink>
                                <NavLink to="/opd-schedule" className="btn without-color">OPD Schedule</NavLink>
                                <NavLink to="/take-a-tour" className="btn without-color">Take a Tour</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="navbar menu deskmenubar" id="navbar">
                    <div className="cust-container">
                        <ul className="nav-links flex">
                            <li><NavLink to="/about"><b>About Us</b></NavLink></li>
                            <li><NavLink to="/specialities">Specialities</NavLink></li>
                            <li><NavLink to="/doctors">Doctors</NavLink></li>
                            <li><NavLink to="/corporate-tpa">Corporate & TPA</NavLink></li>
                            <li><NavLink to="/international-patients">International Patients</NavLink></li>
                            <li><NavLink to="/academics">Academics</NavLink></li>
                            <li><NavLink to="/events">Events</NavLink></li>
                            <li><NavLink to="/blogs">Blogs</NavLink></li>
                            <li><NavLink to="/career">Career</NavLink></li>
                            <li><NavLink to="/contact">Contact Us</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>

            <nav className="navbar navbar-expand-lg mobilenavbar">
                <div className="mobile-headmain">
                    <div className="mobhead-logo">
                        <a className="navbar-brand custom-brand" href="#"><img className="image-fluid" src={logo} alt="" title="" /></a>
                    </div>
                    <div className="mobileheaderitems">


                        <div className="icon-bars">
                            <button className="navbar-toggler custom-toggler" type="button" onClick={toggleMenu} data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span id="myImage">
                                    <img className="navbar-toggler-icon" src={isMenuOpen ? closeIcon : menuIcon} alt="Menu" />
                                    {/* <img className="navbar-toggler-icon" src={closeIcon} alt="" style={{display:"none"}} /> */}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`navbar-collapse topmrmob" ${isMenuOpen ? 'show' : 'collapse'}`} id="navbarNavDropdown">
                    <ul className="nav-links">
                        <li><NavLink to="/about"><b>About Us</b></NavLink></li>
                        <li><NavLink to="/specialities">Specialities</NavLink></li>
                        <li><NavLink to="/doctors">Doctors</NavLink></li>
                        <li><NavLink to="/corporate-tpa">Corporate & TPA</NavLink></li>
                        <li><NavLink to="/international-patients">International Patients</NavLink></li>
                        <li><NavLink to="/academics">Academics</NavLink></li>
                        <li><NavLink to="/events">Events</NavLink></li>
                        <li><NavLink to="/blogs">Blogs</NavLink></li>
                        <li><NavLink to="/career">Career</NavLink></li>
                        <li><NavLink to="/contact">Contact Us</NavLink></li>
                    </ul>

                    <div className="phone-details">
                        <a href="tel:+912224476666">
                            <img className="phone-num" src={call} alt="phone" />022-69871211
                        </a>
                        {/* <div className="search-icon">
                        <a href="#"><img src="./assets/images/search-icon.png" alt="search" /></a>
                    </div> */}
                    </div>
                    <div className="information">
                        <NavLink to="/book-appointment" className="btn without-color">Book Appointment</NavLink>
                        <NavLink to="/opd-schedule" className="btn without-color">OPD Schedule</NavLink>
                        <NavLink to="/take-a-tour" className="btn without-color">Take a Tour</NavLink>
                    </div>
                    <div className="social-links">
                        <a href="#"><img src={yt} alt="yoytube" /></a>
                        <a href="#"><img src={fb} alt="facebook" /></a>
                        <a href="#"><img src={linked} alt="linkedin" /></a>
                        <a href="#"><img src={inst} alt="instagram" /></a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
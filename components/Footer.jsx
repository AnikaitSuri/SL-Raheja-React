// src/components/Footer.js
import React from 'react';
import './home.css';
import { NavLink } from 'react-router-dom';
import flogo from '../assets/images/foot-logo.png';

const Footer = () => {
    return (
        <>
            <footer class="footer">
                <div class="cust-container">
                    <div class="footer-content foot-add">
                        <div class="footer-section footercol-1">
                            <img src={flogo} alt="Logo" class="footlogo" />
                            <p>
                                S.L Raheja Hospital is located in the suburb of Mahim in Mumbai. It is associated with Fortis
                                Hospitals and has established a high standard of healthcare services and medical facilities since
                                its inception. We are one of the best multispecialty hospitals in Mumbai.
                            </p>
                            <div class="subscribe email-num">
                                <input type="email" placeholder="Enter email" class="subscribe-input" />
                                <button class="btn with-color">Subscribe</button>
                            </div>
                            <div class="subscribe cont-numm">
                                <input type="email" placeholder="Contact Number" class="subscribe-input" />
                                <button class="btn with-color">Subscribe</button>
                            </div>
                        </div>
                        <div class="footer-section footercol-2">
                            <h4>For Patients</h4>
                            <ul>
                                <li><NavLink to="/doctors">Find a Doctor</NavLink></li>
                                <li><NavLink to="/book-appointment">Book an Appointment</NavLink></li>
                                <li><a href="#">Video Consultation</a></li>
                                <li><a href="#">Service Request</a></li>
                                <li><a href="#">International Patients</a></li>
                                <li><a href="#">OPD Schedule</a></li>
                                <li><a href="#">Guider & Blogs</a></li>
                            </ul>
                        </div>
                        <div class="footer-section footercol-3">
                            <h4>Specialties</h4>
                            <ul>
                                <li><a href="#">Diabetology</a></li>
                                <li><a href="#">Diabetic Foot Surgery</a></li>
                                <li><a href="#">Cardiology</a></li>
                                <li><a href="#">Oncology</a></li>
                                <li><a href="#">Neurology</a></li>
                                <li><a href="#">Nephrology</a></li>
                                <li><a href="#">Orthopaedics Surgeon</a></li>
                                <li><a href="#">Critical Care Specialist</a></li>
                            </ul>
                        </div>
                        <div class="footer-section footercol-4">
                            <h4>Corporate</h4>
                            <ul>
                                <li><NavLink to="/hel-desk">Help Desk</NavLink></li>
                                <li><NavLink to="/about">About Us</NavLink></li>
                                <li><NavLink to="/blogs">Blogs</NavLink></li>
                                <li><NavLink to="/career">Careers</NavLink></li>
                                <li><NavLink to="/contact">Contact Us</NavLink></li>
                                <li><NavLink to="/news-events">News & Events</NavLink></li>
                                <li><NavLink to="/invester-relations">Investor Relations</NavLink></li>
                                <li><NavLink to="/academics">Academics</NavLink></li>
                            </ul>
                        </div>
                        <div class="footer-section last-foot">
                            <h4>Contact Us</h4>
                            <p>Call: +912269871211/+919167676790
                                Emergency Number: +912266529979
                                info@rahejahospital.com</p>
                            <p>S.L. Raheja Hospital - A Fortis Associate (Diabetic Association
                                of India), Raheja Rugnalaya Marg, Mahim West, Mumbai,
                                Maharashtra, India - 400016</p>

                        </div>
                    </div>
                </div>

            </footer>
            <div class="copy-right">
                <p>© Copyright 2024 S.L. Raheja Hospital</p>
            </div>
        </>
    );
};

export default Footer;

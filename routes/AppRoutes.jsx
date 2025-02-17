// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import About from '../pages/About';
import ContactUs from '../pages/ContactUs';
import Career from '../pages/Career';
import CareerDetails from "../pages/CareerDetails";
import HealthCheckup from "../pages/HealthCheckup";
import HealthCheckupDetails from "../pages/HealthCheckupDetails";
import AcTpas from "../pages/AcTpas";
import Academics from "../pages/Academics";
import Specialities from '../pages/Specialities';
import SpecialitiesDetails from '../pages/SpecialitiesDetails';
import HealthCheckupComparison from '../pages/HealthCheckupComparison';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/corporate-tpa" element={<AcTpas />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/career" element={<Career />} />
            <Route path="/career-details/:id" element={<CareerDetails />} />
            <Route path="/health-checkup" element={<HealthCheckup />} />
            <Route path="/health-checkup-details/:id" element={<HealthCheckupDetails />} />
            <Route path="/health-checkup-comparison" element={<HealthCheckupComparison />} />
            <Route path="/specialities" element={<Specialities />} />
            <Route path="/specialities-details" element={<SpecialitiesDetails />} />
            {/* Add more routes as needed */}
        </Routes>
    );
};

export default AppRoutes;
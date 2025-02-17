import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/dashboard/index.jsx";
import Contacts from "../pages/contacts/index.jsx";
import Calendar from "../pages/calendar/index.jsx";
import Team from "../pages/team/index.jsx";
import Invoices from "../pages/invoices/index.jsx";
import Form from "../pages/form/index.jsx";
import FAQ from "../pages/faq/index.jsx";
import AddBanner from "../pages/homeBanner/index.jsx";
import BannerList from "../pages/homeBanner/BannerList.jsx";
import TechPatientsList from "../pages/TechPatient/TechPatientsList.jsx";
import AddTechPatient from "../pages/TechPatient/AddTechPatient.jsx";
import AddPatientStory from "../pages/PatientStory/AddPatientStory.jsx";
import PatientStoriesList from "../pages/PatientStory/PatientStoriesList.jsx";
import AddUpcomingEvent from "../pages/Events/AddUpcomingEvent.jsx";
import UpcomingEventsList from "../pages/Events/UpcomingEventsList.jsx";
import AddBetterInfoHealth from "../pages/BetterInfoHealth/AddBetterInfoHealth.jsx";
import BetterInfoHealthList from "../pages/BetterInfoHealth/BetterInfoHealthList.jsx";
import AddDoctors from "../pages/Doctors/AddDoctors.jsx";
import ListDoctors from "../pages/Doctors/ListDoctors.jsx";
import AddSpecialties from "../pages/Specialties/AddSpecialties.jsx";
import ListSpecialties from "../pages/Specialties/ListSpecialties.jsx";
import ProtectedRoute from "./ProtectedRoute";
import AddWhyChooseRaheja from "../pages/aboutPage/AddWhyChooseRaheja.jsx";
import WhyChooseRahejaList from "../pages/aboutPage/WhyChooseRahejaList.jsx";
import AwardsAccoladesList from "../pages/aboutPage/AwardsAccoladesList.jsx";
import AddAwardsAccolades from "../pages/aboutPage/AddAwardsAccolades.jsx";
import AddCareerJob from "../pages/Careers/AddCareerJob.jsx";
import CareerJobs from "../pages/Careers/CareerJobs.jsx";
import AddCareerAtRaheja from "../pages/Careers/AddCareerAtRaheja.jsx";
import ListCareerAtRaheja from "../pages/Careers/ListCareerAtRaheja.jsx";
import AddContactInfo from "../pages/ContactPage/AddContactInfo.jsx";
import ListContactInfo from "../pages/ContactPage/ListContactInfo.jsx";
import ListHealthCheckup from "../pages/HealthCheckup/ListHealthCheckup.jsx";
import AddHealthCheckup from "../pages/HealthCheckup/AddHealthCheckup.jsx";
import AddHealthCheckupPackage from "../pages/HealthCheckup/AddHealthCheckupPackage.jsx";
import ListHealthCheckupPackage from "../pages/HealthCheckup/ListHealthCheckupPackage.jsx";
import AddHealthCheckupTestInclusion from "../pages/HealthCheckup/AddHealthCheckupTestInclusion.jsx";
import ListHealthCheckupTestInclusion from "../pages/HealthCheckup/ListHealthCheckupTestInclusion.jsx";
import AddAcademicsOverview from "../pages/Academics/AddAcademicsOverview.jsx";
import ListAcademicsOverview from "../pages/Academics/ListAcademicsOverview.jsx";
import AddAcademicsProgramDetails from "../pages/Academics/AddAcademicsProgramDetails.jsx";
import ListAcademicsProgramDetails from "../pages/Academics/ListAcademicsProgramDetails.jsx";
import AddBannerCMS from "../pages/Banners/AddBannerCMS.jsx";
import ListBanners from "../pages/Banners/ListBanners.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/contacts" element={<ProtectedRoute element={<Contacts />} />} />
            <Route path="/calendar" element={<ProtectedRoute element={<Calendar />} />} />
            <Route path="/team" element={<ProtectedRoute element={<Team />} />} />
            <Route path="/invoices" element={<ProtectedRoute element={<Invoices />} />} />
            <Route path="/form" element={<ProtectedRoute element={<Form />} />} />
            <Route path="/faq" element={<ProtectedRoute element={<FAQ />} />} />
            <Route path="/add-banner" element={<ProtectedRoute element={<AddBanner />} />} />
            <Route path="/banners-list" element={<ProtectedRoute element={<BannerList />} />} />;
            <Route path="/tech-patients" element={<ProtectedRoute element={<TechPatientsList />} />} />;
            <Route path="/add-tech-patient" element={<ProtectedRoute element={<AddTechPatient />} />} />;
            <Route path="/add-patient-story" element={<ProtectedRoute element={<AddPatientStory />} />} />;
            <Route path="/patient-stories" element={<ProtectedRoute element={<PatientStoriesList />} />} />;
            <Route path="/add-upcoming-event" element={<ProtectedRoute element={<AddUpcomingEvent />} />} />
            <Route path="/upcoming-event-list" element={<ProtectedRoute element={<UpcomingEventsList />} />} />
            <Route path="/add-better-info-health" element={<ProtectedRoute element={<AddBetterInfoHealth />} />} />
            <Route path="/list-better-info-health" element={<ProtectedRoute element={<BetterInfoHealthList />} />} />
            <Route path="/add-doctor" element={<ProtectedRoute element={<AddDoctors />} />} />
            <Route path="/list-doctors" element={<ProtectedRoute element={<ListDoctors />} />} />
            <Route path="/add-specialties" element={<ProtectedRoute element={<AddSpecialties />} />} />
            <Route path="/list-specialties" element={<ProtectedRoute element={<ListSpecialties />} />} />
            <Route path="/add-why-slraheja" element={<ProtectedRoute element={<AddWhyChooseRaheja />} />} />
            <Route path="/about-why-slraheja-list" element={<ProtectedRoute element={<WhyChooseRahejaList />} />} />
            <Route path="/awards-accolades-list" element={<ProtectedRoute element={<AwardsAccoladesList />} />} />
            <Route path="/add-awards-accolades" element={<ProtectedRoute element={<AddAwardsAccolades />} />} />
            <Route path="/add-career-job" element={<ProtectedRoute element={<AddCareerJob />} />} />
            <Route path="/career-jobs" element={<ProtectedRoute element={<CareerJobs />} />} />
            <Route path="/add-career-at-raheja" element={<ProtectedRoute element={<AddCareerAtRaheja />} />} />
            <Route path="/list-career-at-raheja" element={<ProtectedRoute element={<ListCareerAtRaheja />} />} />
            <Route path="/add-contact-info" element={<ProtectedRoute element={<AddContactInfo />} />} />
            <Route path="/list-contact-info" element={<ProtectedRoute element={<ListContactInfo />} />} />
            <Route path="/list-health-checkup" element={<ProtectedRoute element={<ListHealthCheckup />} />} />
            <Route path="/add-health-checkup" element={<ProtectedRoute element={<AddHealthCheckup />} />} />
            <Route path="/add-health-checkup-package" element={<ProtectedRoute element={<AddHealthCheckupPackage />} />} />
            <Route path="/list-health-checkup-package" element={<ProtectedRoute element={<ListHealthCheckupPackage />} />} />
            <Route path="/add-health-checkup-test-inclusion" element={<ProtectedRoute element={<AddHealthCheckupTestInclusion />} />} />
            <Route path="/list-health-checkup-test-inclusion" element={<ProtectedRoute element={<ListHealthCheckupTestInclusion />} />} />
            <Route path="/add-academics-overview" element={<ProtectedRoute element={<AddAcademicsOverview />} />} />
            <Route path="/list-academics-overview" element={<ProtectedRoute element={<ListAcademicsOverview />} />} />
            <Route path="/add-academics-program-details" element={<ProtectedRoute element={<AddAcademicsProgramDetails />} />} />
            <Route path="/list-academics-program-details" element={<ProtectedRoute element={<ListAcademicsProgramDetails />} />} />
            <Route path="/add-bannerscms" element={<ProtectedRoute element={<AddBannerCMS />} />} />
            <Route path="/list-bannerscms" element={<ProtectedRoute element={<ListBanners />} />} />

            <Route path="*" element={<Login />} />
        </Routes>
    );
};

export default AppRoutes;
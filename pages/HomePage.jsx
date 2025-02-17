// src/components/HomePage.jsx
import React from 'react';
import HeroSlider from '../components/HeroSlider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Frame1 from '../assets/images/Frame1.png';
import Frame2 from '../assets/images/Frame2.png';
import health from '../assets/images/healthblk.png';
import frame4 from '../assets/images/frame4blk.png';
import BlackArrow from '../assets/images/black-arr.png';
import WhiteArrow from '../assets/images/white-arr.png';
import About2 from '../assets/images/about2.png';
import About3 from '../assets/images/about3.png';
import Endocrine from '../assets/images/endocrine.png';
import googleImg from '../assets/images/google.png';
import LG1 from '../assets/images/lg1.png';
import LG2 from '../assets/images/lg2.png';
import LG3 from '../assets/images/lg3.png';
import LG4 from '../assets/images/lg4.png';
import LG5 from '../assets/images/lg5.png';
import DLG1 from '../assets/images/dlg1.png';
import DLG2 from '../assets/images/dlg2.png';
import DLG3 from '../assets/images/dlg3.png';
import DLG4 from '../assets/images/dlg4.png';
import DLG5 from '../assets/images/dlg5.png';
import Doct1 from '../assets/images/doct1.png';
import Doct2 from '../assets/images/doct2.png';
import Doct3 from '../assets/images/doct3.png';
import Doct4 from '../assets/images/doct4.png';
import VectorIcon from '../assets/images/Vector.png';
import PatientTech from '../components/PatientTech';
import PatientStory from '../components/PatientStory';
import InformationEvents from '../components/InformationEvents';
import map from '../assets/images/map.png';


const HomePage = () => {

    // Corporate Carousel Options
    const corpOptions = {
        loop: true,
        margin: 10,
        stagePadding: 50,
        autoplay: true,
        autoplayTimeout: 2000,
        nav: false,
        dots: false,
        responsive: {
            0: { items: 2 },
            576: { items: 1 },
            768: { items: 2 },
            1024: { items: 3 },
            1200: { items: 5 }
        }
    };

    // TPA Carousel Options
    const tpaOptions = {
        rtl: true,
        loop: true,
        margin: 10,
        stagePadding: 50,
        autoplay: true,
        autoplayTimeout: 2000,
        nav: false,
        dots: false,
        responsive: corpOptions.responsive
    };

    return (
        <>
            <HeroSlider />

            {/* Appointments Section */}
            <section class="appoint">
                <div class="cust-container">
                    <div class="appoint-cards">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="card-app light-green">
                                    <div class="appoit-box">
                                        <div class="icon">
                                            <img src={Frame1} alt="" />
                                        </div>
                                        <h3>BOOK AN APPOINTMENT</h3>
                                    </div>
                                    <p>View all information of the visitors and follow all terms & conditions.</p>
                                    <a href="#" class="with-arr">Learn More <img src={BlackArrow} alt="" /> </a>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card-app light-green">
                                    <div class="appoit-box">
                                        <div class="icon"><img src={Frame2} alt="" /></div>
                                        <h3>SECOND OPINION</h3>
                                    </div>
                                    <p>View all information of the visitors and follow all terms & conditions.</p>
                                    <a href="#" class="with-arr">Learn More <img src={BlackArrow} alt="" /> </a>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card-app green">
                                    <div class="appoit-box">
                                        <div class="icon"><img src={health} alt="" /></div>
                                        <h3>HEALTH CHECK UP</h3>
                                    </div>
                                    <p>View all information of the visitors and follow all terms & conditions.</p>
                                    <a href="#" class="with-arr">Learn More <img src={BlackArrow} alt="" /> </a>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card-app green">
                                    <div class="appoit-box">
                                        <div class="icon"><img src={frame4} alt="" /></div>
                                        <h3>ONLINE CONSULTATION</h3>
                                    </div>
                                    <p>View all information of the visitors and follow all terms & conditions.</p>
                                    <a href="#" class="with-arr">Learn More
                                        <img src={BlackArrow} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section class="section towr-work">
                <div class="cust-container">
                    <div class="build-block">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="finnest">
                                    <h5>ABOUT S.L. RAHEJA</h5>
                                    <h3>We Provide Finnest
                                        Patient's <span><b>Care & Amenities</b></span></h3>
                                    <p>Embrace a world of comprehensive healthcare where your well-being takes center stage. At SL
                                        Raheja, we're dedicated to providing you with personalized and compassionate medical
                                        services.
                                    </p>
                                    <a href="#" class="btn with-color with-arr"> <img src={WhiteArrow} alt="" />
                                        More About Us</a>
                                    <div class="go-rt">
                                        <img src={googleImg} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="tower-img">
                                    <img src={About2} alt="" />
                                    <div class="pat-rev">
                                        <div class="bck-bor">
                                            <h4>10k+</h4>
                                            <p>PATIENT'S <br /> REVIEWS</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="doct-team">
                                    <img src={About3} alt="" />
                                    <div class="doct-deta">
                                        <h6>Why Us</h6>
                                        <div class="check-list">
                                            <p> <i class="ri-check-line"></i> Seamless Care</p>
                                            <p> <i class="ri-check-line"></i> Warm and Welcoming Environment</p>
                                            <p> <i class="ri-check-line"></i> Comprehensive Care</p>
                                            <p> <i class="ri-check-line"></i> Expert Doctors</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>

            </section>

            {/* Specialties Section */}
            <section class="section specialties">
                <div class="specail">
                    <div class="cust-container">
                        <h2 class="section-title">Comprehensive Care Across a <span>Spectrum of Specialties</span></h2>
                        <div class="spec-card">
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="card-end">
                                        <div class="cardi-img">
                                            <img src={Endocrine} alt="Endocrinology Icon" />
                                        </div>
                                        <h3>Endocrinology</h3>
                                        <p>20+ Doctors are available under this department who serve.</p>
                                        <a href="#" class="btn with-arr with-arr">Read More <img src={BlackArrow}
                                            alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card-end">
                                        <div class="cardi-img">
                                            <img src={Endocrine} alt="Cardiology Icon" />
                                        </div>
                                        <h3>Cardiology</h3>
                                        <p>20+ Doctors are available under this department who serve.</p>
                                        <a href="#" class="btn with-arr with-arr">Read More <img src={BlackArrow}
                                            alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card-end">
                                        <div class="cardi-img">
                                            <img src={Endocrine} alt="Oncology Icon" />
                                        </div>
                                        <h3>Oncology</h3>
                                        <p>20+ Doctors are available under this department who serve.</p>
                                        <a href="#" class="btn with-arr with-arr">Read More <img src={BlackArrow}
                                            alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card-end">
                                        <div class="cardi-img">
                                            <img src={Endocrine} alt="Neurology Icon" />
                                        </div>
                                        <h3>Neurology & Neurosurgery</h3>
                                        <p>20+ Doctors are available under this department who serve.</p>
                                        <a href="#" class="btn with-arr with-arr">Read More <img src={BlackArrow}
                                            alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card-end">
                                        <div class="cardi-img">
                                            <img src={Endocrine} alt="Orthopaedic Icon" />
                                        </div>
                                        <h3>Orthopaedic</h3>
                                        <p>20+ Doctors are available under this department who serve.</p>
                                        <a href="#" class="btn with-arr with-arr">Read More <img src={BlackArrow}
                                            alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card-end">
                                        <div class="cardi-img">
                                            <img src={Endocrine} alt="Urology Icon" />
                                        </div>
                                        <h3>Urology</h3>
                                        <p>20+ Doctors are available under this department who serve.</p>
                                        <a href="#" class="btn with-arr with-arr">Read More <img src={BlackArrow}
                                            alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card-end">
                                        <div class="cardi-img">
                                            <img src={Endocrine} alt="Spine Care Icon" />
                                        </div>
                                        <h3>Spine Care & Surgery</h3>
                                        <p>20+ Doctors are available under this department who serve.</p>
                                        <a href="#" class="btn with-arr with-arr">Read More <img src={BlackArrow}
                                            alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="card-end">
                                        <div class="cardi-img">
                                            <img src={Endocrine} alt="ENT Icon" />
                                        </div>
                                        <h3>ENT</h3>
                                        <p>20+ Doctors are available under this department who serve.</p>
                                        <a href="#" class="btn with-arr with-arr">Read More <img src={BlackArrow}
                                            alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="view-all">
                            <a href="#">View All</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Corporate Empanelled */}
            <section className="section corparate">
                <h2 className="section-title">Corporate Empanelled</h2>
                <div className="corp-slid">
                    <Swiper
                        modules={[Autoplay]}
                        slidesPerView={5}
                        spaceBetween={20}
                        loop={true}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                            reverseDirection: false,  // Slides move to the left
                        }}
                        speed={6000}  // Smooth continuous slide
                        breakpoints={{
                            0: { slidesPerView: 2 },
                            576: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 }
                        }}
                    >
                        {[LG1, LG2, LG3, LG4, LG5, LG2, LG1, LG4].map((logo, index) => (
                            <SwiperSlide key={index}>
                                <img src={logo} alt={`Corporate Logo ${index + 1}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* TPA Empanelled */}
                <h2 className="section-title">TPA Empanelled</h2>
                <div className="corp-slid">
                    <Swiper
                        modules={[Autoplay]}
                        slidesPerView={5}
                        spaceBetween={20}
                        loop={true}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                            reverseDirection: true,  // Slides move to the right
                        }}
                        speed={6000}  // Smooth continuous slide
                        breakpoints={{
                            0: { slidesPerView: 2 },
                            576: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 }
                        }}
                    >
                        {[DLG1, DLG2, DLG3, DLG4, DLG5, DLG2, DLG4, DLG5].map((logo, index) => (
                            <SwiperSlide key={index}>
                                <img src={logo} alt={`TPA Logo ${index + 1}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            <section class="section expert-doctors">
                <h2 class="section-title">Our Expert Doctors</h2>
                <div class="cust-container">
                    <div class="doctor-box">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="doc-card">
                                    <img src={Doct1} alt="Dr. Alka Kumar" />
                                    <div class="card-content">
                                        <div class="card-header">
                                            <span class="specialty">Gynecologist</span>
                                            <a href="#" class="">View Profile</a>
                                        </div>
                                        <div class="doct-det">
                                            <h3>Dr. Alka Kumar</h3>
                                            <img src={VectorIcon} alt="" />
                                        </div>
                                        <p>Area of interest</p>
                                    </div>
                                    <div class="card-footer">
                                        <a href="" class="btn without-color">Book Appointment</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="doc-card">
                                    <img src={Doct2} alt="Dr. Alok Pandey" />
                                    <div class="card-content">
                                        <div class="card-header">
                                            <span class="specialty">Orthopedist</span>
                                            <a href="#">View Profile</a>
                                        </div>
                                        <div class="doct-det">
                                            <h3>Dr. Alok Pandey</h3>
                                            <img src={VectorIcon} alt="" />
                                        </div>
                                        <p>Area of interest</p>
                                    </div>
                                    <div class="card-footer">
                                        <a href="" class="btn without-color">Book Appointment</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="doc-card">
                                    <img src={Doct3} alt="Dr. Aditi Phulpagar" />
                                    <div class="card-content">
                                        <div class="card-header">
                                            <span class="specialty">Gynecologist</span>
                                            <a href="#">View Profile</a>
                                        </div>
                                        <div class="doct-det">
                                            <h3>Dr. Aditi Phulpagar</h3>
                                            <img src={VectorIcon} alt="" />
                                        </div>
                                        <p>Area of interest</p>
                                    </div>
                                    <div class="card-footer">
                                        <a href="" class="btn without-color">Book Appointment</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="doc-card">
                                    <img src={Doct4} alt="Dr. Pankaj Gupta" />
                                    <div class="card-content">
                                        <div class="card-header">
                                            <span class="specialty">Orthopedist</span>
                                            <a href="#">View Profile</a>
                                        </div>
                                        <div class="doct-det">
                                            <h3>Dr. Pankaj Gupta</h3>
                                            <img src={VectorIcon} alt="" />
                                        </div>
                                        <p>Area of interest</p>
                                    </div>
                                    <div class="card-footer">
                                        <a href="" class="btn without-color">Book Appointment</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="view-all">
                    <a href="#">View All</a>
                </div>
            </section>

            <PatientTech />

            <PatientStory />

            <section class="section dot-background">
                <div class="cust-container">
                    <div class="custom-background">
                        <div class="map-right">
                            <p>Beyond Boundaries</p>
                            <h4>Fostering health with <span>cutting-edge medical services</span> for international patients
                            </h4>
                            <a href="#">Enquiry Now</a>
                        </div>
                        <div class="map-left">
                            <img src={map} alt="" />
                            <div class="plus-data">
                                <div class="avrage">
                                    <h4>20000+</h4>
                                    <p>Average International Patients Per Year</p>
                                </div>
                                <div class="avrage">
                                    <h4>30+</h4>
                                    <p>Countries</p>
                                </div>
                                <div class="avrage">
                                    <h4>25+</h4>
                                    <p>Doctors in India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            < InformationEvents />
        </>
    );
};

export default HomePage;
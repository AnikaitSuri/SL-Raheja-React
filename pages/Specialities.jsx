import React from "react";
import bannerImage from "../assets/images/spciallites/speciban.jpg"; // Adjust the path based on your project structure
import searchIcon from "../assets/images/spciallites/searchblk.png";

export const specialtiesData = [
    {
        image: "../assets/images/spciallites/physical-therapy 1.png",
        title: "Physiotherapy & Rehabilitation",
        description:
            "Customised <b>therapy programs</b> aiding recovery and improving <b>mobility</b> post-surgery or injury.",
    },
    {
        image: "../assets/images/spciallites/mental-health 1.png",
        title: "Mental Health",
        description:
            "Comprehensive <b>psychiatric services</b>, addressing <b>mental health conditions</b> and promoting <b>emotional well-being.</b>",
    },
    {
        image: "../assets/images/spciallites/pediatrics 1.png",
        title: "Paediatrics",
        description:
            "Dedicated <b>child healthcare</b>, ensuring healthy <b>growth and development.</b>",
    },
    {
        image: "../assets/images/spciallites/liver 1.png",
        title: "Organ Transplant",
        description:
            "Life-saving <b>organ transplant services</b> with holistic pre-and post-operative care.",
    },
    {
        image: "../assets/images/spciallites/tooth 1.png",
        title: "Dentistry",
        description:
            "Comprehensive <b>dental services</b>, from <b>routine check-ups</b> to advanced <b>oral care treatments.</b>",
    },
    {
        image: "../assets/images/spciallites/gastroenterology 1.png",
        title: "Gastro-Intestinal Science",
        description:
            "Advanced diagnosis and treatment of <b>digestive system diseases,</b> ensuring <b>gastrointestinal wellness</b>.",
    },
    {
        image: "../assets/images/spciallites/ophthalmology 1.png",
        title: "Ophthalmology",
        description:
            "Expert <b>eye care services</b>, including <b>vision correction</b> and <b>ocular disease treatment</b>.",
    },
    {
        image: "../assets/images/spciallites/heart.png",
        title: "Cardiac Sciences",
        description:
            "Comprehensive <b>heart care</b>, including <b>diagnosis, treatment</b>, and <b>surgical interventions</b> for <b>cardiovascular diseases</b>.",
    },
];

const Specialities = () => {
    return (
        <div>
            {/* Banner Section */}
            <section className="banner-spac">
                <div className="cust-container">
                    <div className="banner-box">
                        <img src={bannerImage} alt="Specialities Banner" />
                        <div className="ban-con">
                            <h1>Specialties</h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Specialty Search Section */}
            <section className="section about-host specialty-search-sec">
                <div className="cust-container">
                    <div className="row">
                        <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                            <div className="finnest host-det">
                                <h4>
                                    Comprehensive Care Across a
                                    <span> Spectrum of Specialties</span>
                                </h4>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
                            <div className="specialty-search">
                                <form className="example" action="">
                                    <input
                                        type="text"
                                        placeholder="Search by Specialties"
                                        name="search"
                                    />
                                    <button type="submit">
                                        <img src={searchIcon} alt="Search" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Specialties List Section */}
            <section className="specialites-sec mrgntop70 margnbot90 healthcheckup-sec">
                <div className="cust-container">
                    <div className="row">
                        {specialtiesData.map((specialty, index) => (
                            <div
                                className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12"
                                key={index}
                            >
                                <div className="specialites-item">
                                    <div className="specialttm-img">
                                        <img
                                            src={specialty.image}
                                            alt={specialty.title}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="spcialttm-desc">
                                        <h4>{specialty.title}</h4>
                                        <p dangerouslySetInnerHTML={{ __html: specialty.description }} />
                                    </div>
                                    <div className="specialttm-cta">
                                        <a href="javascript:;">
                                            Read More{" "}
                                            <img src="assets/images/spciallites/blkarw.svg" alt="" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Specialities;

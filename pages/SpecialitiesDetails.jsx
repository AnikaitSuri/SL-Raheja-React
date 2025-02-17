import React from "react";
import SpecialBan from "../assets/images/speci-detail/specdetailban.jpg";

const SpecialitiesDetails = () => {
  return (
    <>
      {/* Banner Section */}
      <section className="banner-spac">
        <div className="cust-container">
          <div className="banner-box">
            <img src={SpecialBan} alt="" />
            <div className="ban-con">
              <h1>Cardiology</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="special-detail-target-sec mrgntop70">
        <div className="cust-container">
          <div className="special-detail-target-inner">
            <ul>
              <li>
                <a href="#overviewid">Overview</a>
              </li>
              <li>
                <a href="#expert-cardiologistid">Our Expert Cardiologist</a>
              </li>
              <li>
                <a href="#ourvideosid">Videos</a>
              </li>
              <li>
                <a href="#ourblogs">Our Blogs</a>
              </li>
              <li>
                <a href="#patientstoriesid">Patient Stories</a>
              </li>
              <li>
                <a href="#faqid">FAQ</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="overview-sec mrgntop70" id="overviewid">
        <div className="cust-container">
          <div className="finnest host-det">
            <h4>Overview</h4>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
            </p>
          </div>
        </div>
      </section>

      {/* Our Expert Cardiologist Section */}
      <section
        className="our-expert-cardiologist-sec mrgntop70 margnbot90"
        id="expert-cardiologistid"
      >
        <div className="cust-container">
          <div className="finnest host-det text-center margin-botom40">
            <h4>Our Expert Cardiologist</h4>
          </div>
          <div className="row">
            {["Dr. Alka Kumar", "Dr. Alok Pandey", "Dr. Aditi Phulpagar", "Dr. Pankaj Gupta"].map(
              (doctor, index) => (
                <div
                  key={index}
                  className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 mb-4"
                >
                  <div className="oueextpert-cardiolo-item">
                    <div className="cardiolo-item-img">
                      <img
                        src={`assets/images/speci-detail/dr${index + 1}.jpg`}
                        alt=""
                      />
                    </div>
                    <div className="cardiolo-itemdesc">
                      <div className="drs-design">
                        <span>Specialist</span>
                        <a href="javascript:;">View Profile</a>
                      </div>
                      <div className="drs-title">
                        <h4>{doctor}</h4>
                      </div>
                      <p>Total Experience - 15yrs</p>
                      <div className="drs-bookapp-cta common-roundcta">
                        <a href="javascript:;">Book Appointment</a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="our-video-sec mrgntop70 margnbot90" id="ourvideosid">
        <div className="cust-container">
          <div className="finnest host-det text-center margin-botom40">
            <h4>Videos</h4>
          </div>
          <div className="row">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-4"
              >
                <div className="our-video-sec-item">
                  <div className="our-video-img">
                    <img src="assets/images/speci-detail/videoimg.jpg" alt="" />
                  </div>
                  <div className="our-video-desc">
                    <h4>Name of the Video</h4>
                    <a href="javascript:;">
                      Watch now{" "}
                      <img
                        src="assets/images/spciallites/blkarw.svg"
                        alt=""
                      />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Blogs Section */}
      <section
        className="our-blogs-sec mrgntop70 margnbot90"
        id="ourblogs"
      >
        <div className="cust-container">
          <div className="finnest host-det text-center margin-botom40">
            <h4>Our Blogs</h4>
          </div>
          <div className="row">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-4"
              >
                <div className="blog-item">
                  <h4>Blog Title {index + 1}</h4>
                  <p>Short description of the blog content.</p>
                  <a href="javascript:;">Read More</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Stories Section */}
      <section
        className="patient-stories-sec mrgntop70 margnbot90"
        id="patientstoriesid"
      >
        <div className="cust-container">
          <div className="finnest host-det text-center margin-botom40">
            <h4>Patient Stories</h4>
          </div>
          <div className="row">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-4"
              >
                <div className="story-item">
                  <h4>Patient Story {index + 1}</h4>
                  <p>Details about the patient's experience.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-sec mrgntop70 margnbot90" id="faqid">
        <div className="cust-container">
          <div className="finnest host-det text-center margin-botom40">
            <h4>FAQ</h4>
          </div>
          <div className="faqsec-inner">
            <div className="accordion" id="special-detail-faqs">
              {[1, 2, 3, 4].map((item, index) => (
                <div className="card" key={index}>
                  <div className="card-header" id={`heading${item}`}>
                    <button
                      className="collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target={`#collapse${item}`}
                      aria-expanded="false"
                      aria-controls={`collapse${item}`}
                    >
                      FAQ Question {item}
                    </button>
                  </div>
                  <div
                    id={`collapse${item}`}
                    className="collapse"
                    aria-labelledby={`heading${item}`}
                    data-parent="#special-detail-faqs"
                  >
                    <div className="card-body">
                      <p>Answer to question {item}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SpecialitiesDetails;

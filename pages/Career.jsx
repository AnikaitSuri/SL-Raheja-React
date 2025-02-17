import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCareerBanner, fetchCareerAtRaheja, fetchJobListings } from "../Adapter/PageAdapter";
import CareerBg from "../assets/images/careerbg.jpg";
import CareerJoin from "../assets/images/careerjoin.jpg";
import recogImg from "../assets/images/recog.png";
import rightArr from "../assets/images/rightarw.svg";
import whyWork1 from "../assets/images/whywork1.png";
import whyWork2 from "../assets/images/whywork2.png";
import five5Img from "../assets/images/five5.png";
import five1Img from "../assets/images/five1.png";
import five2Img from "../assets/images/five2.png";
import five3Img from "../assets/images/five3.png";
import five4Img from "../assets/images/five4.png";

import rp1Img from "../assets/images/rp1.png";
import rp3Img from "../assets/images/rp3.png";
import rp4Img from "../assets/images/rp4.png";
import rp5Img from "../assets/images/rp5.png";
import { baseImage_path } from '../variables/Variables';

// const BASE_IMAGE_URL = 'http://localhost/slraheja/sl-raheja/public';

const Career = () => {

  const [bannerData, setBannerData] = useState(null);
  const [careerAtRaheja, setCareerAtRaheja] = useState(null);
  const [jobListings, setJobListings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannerResponse = await fetchCareerBanner();
        setBannerData(bannerResponse.data);

        const careerResponse = await fetchCareerAtRaheja();
        if (careerResponse && careerResponse.data.length > 0) {
          setCareerAtRaheja(careerResponse.data[0]);
        }

        const jobResponse = await fetchJobListings();
        if (jobResponse && jobResponse.data) {
          setJobListings(jobResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data for Career page:", error);
      }
    };

    fetchData();
  }, []);

  const handleJobClick = (jobId) => {
    navigate(`/career-details/${jobId}`); // Navigate to the job details page with the job ID
  };

  const valueSystem = [
    { img: five1Img, title: "Patient Centricity" },
    { img: five2Img, title: "Ownership" },
    { img: five3Img, title: "Integrity" },
    { img: five4Img, title: "Innovation" },
    { img: five5Img, title: "Teamwork" },
  ];

  const recognitionPrograms = [
    {
      img: rp1Img,
      description: "‘Dil Jeet Liya Aapne’ Card: Spot recognition for going above and beyond.",
    },
    {
      img: rp3Img,
      description: "Patient Accolades: Awards for exceptional care recognized by patients.",
    },
    {
      img: rp4Img,
      description: "Long Service Awards: Celebrating loyalty and milestones.",
    },
    {
      img: rp5Img,
      description: "Star Performers: Quarterly awards for outstanding contributions.",
    },
  ];

  return (
    <>
      {/* Banner Section */}
      <section className="banner-spac">
        <div className="cust-container">
          <div className="banner-box">
            {bannerData && bannerData.img_path ? (
              <img
                src={`${baseImage_path}${bannerData.img_path.replace(/^\./, "")}`}
                alt="Career Banner"
              />
            ) : (
              <img
                src={"http://localhost/slraheja/sl-raheja/public/images/default-banner.jpg"}
                alt="Default Banner"
              />
            )}
            <div className="ban-con">
              <h1>Careers</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Career Introduction */}
      <section className="section about-host">
        <div className="cust-container">
          <div className="row">
            <div className="col-md-6">
              <div className="host-img careerjoinsec">
                <img
                  src={
                    careerAtRaheja?.img
                      ? `${baseImage_path}/${careerAtRaheja.img.replace(/^\./, "")}`
                      : CareerJoin
                  }
                  alt="Career Join"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="finnest host-det mobtopmarg careerjoininner">
                <h5>{careerAtRaheja?.title || "Careers at S.L. Raheja Hospital - A Fortis Associate"}</h5>
                <h4>
                  {careerAtRaheja?.heading || "Join Mumbai’s Leading"} <br />
                  <span>{careerAtRaheja?.sub_heading || "Tertiary Care Hospital"}</span>
                </h4>
                <p>
                  {careerAtRaheja?.content ||
                    "S.L. Raheja Hospital is known not just for exceptional patient care but also for being a rewarding workplace."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Point Value System */}
      <section className="fivepointsec mrgntop70">
        <div className="cust-container">
          <div className="fivepoint-desc">
            <p>
              At S.L. Raheja Hospital, we follow a <b>5-POINT Value System</b> that forms the core of our culture and
              drives our operations:
            </p>
          </div>
          <div className="row justify-content-center">
            {valueSystem.map((item, index) => (
              <div key={index} className="col-md-3">
                <div className="card-end text-center cardend-border">
                  <div className="cardi-img">
                    <img src={item.img} alt={item.title} />
                  </div>
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="fivepoint-desc">
            <p>With NABH accreditation and numerous awards, we are committed to patient care and employee development.</p>
          </div>
        </div>
      </section>

      {/* Recognition Programs */}
      <section className="recoprograsec">
        <div className="cust-container">
          <div className="row">
            <div className="col-lg-8 col-md-8 col-sm-12">
              <div className="finnest">
                <h3>Recognition Programs</h3>
                <p>We value and celebrate our employees through:</p>
                <div className="aboutus-howchoose gapbtwli">
                  <ul>
                    {recognitionPrograms.map((item, index) => (
                      <li key={index}>
                        <div className="howchooseitem">
                          <div className="howchooseicn howchooseimgchng">
                            <img src={item.img} alt="Recognition Program" />
                          </div>
                          <div className="howchoosedesc">
                            <p>{item.description}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="recog-img">
                <img src={recogImg} alt="Recognition" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us? */}
      <section class="fivepointsec mrgntop70">
        <div class="cust-container">
          <div class="fivepoint-desc">
            <h4>Why Work with Us?</h4>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-3">
              <div class="card-end text-center cardend-border">
                <div class="cardi-img">
                  <img src={whyWork1} alt="Endocrinology Icon" />
                </div>
                <p>Join a legacy of excellence in healthcare.</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card-end text-center cardend-border">
                <div class="cardi-img">
                  <img src={five5Img} alt="Endocrinology Icon" />
                </div>
                <p>Thrive in a culture of growth, integrity, and teamwork.</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card-end text-center cardend-border">
                <div class="cardi-img">
                  <img src={whyWork2} alt="Endocrinology Icon" />
                </div>
                <p>Benefit from recognition and learning opportunities.</p>
              </div>
            </div>
          </div>
          <div class="fivepoint-desc text-center">
            <p>Be a part of S.L. Raheja Hospital - A Fortis Associate, where your efforts are valued, and your career flourishes.</p>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="fivepointsec mrgntop90 margnbot90">
        <div className="cust-container">
          <div className="fivepoint-desc">
            <h4>Apply For Current Openings:</h4>
          </div>
          <div className="row">
            {jobListings.length > 0 ? (
              jobListings.map((job) => (
                <div key={job.id} className="col-md-4 mb-3" onClick={() => handleJobClick(job.id)}
                  style={{ cursor: "pointer" }}>
                  <div className="card-app light-green">
                    <div className="appoit-box appoithead">
                      <h3>{job.title || "Job Title"}</h3>
                    </div>
                    <div className="appoit-desc">
                      <p>{job.details || "Job Description"}</p>
                      <a href="javascript:;" className="with-arr">
                        <img src={rightArr} alt="Apply" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No current openings available.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Career;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAcademicsBanner, fetchAcademicsOverview } from "../Adapter/PageAdapter";
import { Tab, Nav } from "react-bootstrap";
import AcademicsBan from "../assets/images/careerdetailban.jpg";
import acadRight from "../assets/images/acaderght.png";
import doctorTab from "../assets/images/doctortab.png";
import nurseTab from "../assets/images/nursetab.png";
import arrSvg from "../assets/images/arrw.svg";
import { baseImage_path } from '../variables/Variables';

// const BASE_IMAGE_URL = "http://localhost/slraheja/sl-raheja/public";

const Academics = () => {
  const [activeTab, setActiveTab] = useState("doctors");
  const [bannerData, setBannerData] = useState(null);
  const [overviewData, setOverviewData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannerResponse = await fetchAcademicsBanner();
        setBannerData(bannerResponse.data);

        // Fetch Academics Overview
        const overviewResponse = await fetchAcademicsOverview();
        setOverviewData(overviewResponse.data);

      } catch (error) {
        console.error("Error fetching data for Academics page:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Banner Section */}
      <section className="banner-spac">
        <div className="cust-container">
          <div className="banner-box">
            {bannerData && bannerData.img_path ? (
              <img
                src={`${baseImage_path}${bannerData.img_path.replace(/^\./, "")}`}
                alt="Academics Banner"
              />
            ) : (
              <img
                src={AcademicsBan}
                alt="Default Banner"
              />
            )}
            <div className="ban-con">
              <h1>Academics</h1>
            </div>
          </div>
        </div>
      </section>

      {/* Academics Overview Section */}
      <section className="academics-sec mrgntop70">
        <div className="cust-container">
          <div className="academics-sec-inner">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="finnest host-det mobtopmarg careerjoininner academics-secdesc">
                  <h4>
                    <span>{overviewData?.heading || "Academics"}</span>
                  </h4>
                  <p>
                    {overviewData?.content ||
                      "S.L. Raheja Hospital - A Fortis Associate, is indeed a prominent name in tertiary care, excelling in patient care and providing world-class treatments across various specialties. In addition to its clinical expertise, the hospital is actively involved in medical education and training."}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="academics-rght-img">
                  <img src={acadRight} alt="Academics Right" />
                  {/* <img
                    src={
                      overviewData?.side_img
                        ? `${baseImage_path}/${overviewData.side_img.replace(/^\./, "")}`
                        : `${baseImage_path}/images/academics-overview.png`
                    }
                    alt="Academics Right"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Programs Section */}
      <section className="academics-docnurse-sec mrgntop70 margnbot90">
        <div className="cust-container">
          <div className="academics-docnurse-inner">
            <div className="academics-docnurse-head text-center">
              <p>Here are some of the academic programs conducted at the hospital:</p>
            </div>

            {/* Tabs for Doctors & Nurses */}
            <Tab.Container defaultActiveKey="doctors">
              <Nav variant="pills" className="mb-3 justify-content-center academic-ul">
                <Nav.Item>
                  <Nav.Link
                    eventKey="doctors"
                    className={`doccls ${activeTab === "doctors" ? "active" : ""}`}
                    onClick={() => setActiveTab("doctors")}
                  >
                    <div className="academics-docnurse-tabs-icn">
                      <img src={doctorTab} alt="Doctors Tab" />
                    </div>
                    <span>For Doctors</span>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    eventKey="nurses"
                    className={`nursecls ${activeTab === "nurses" ? "active" : ""}`}
                    onClick={() => setActiveTab("nurses")}
                  >
                    <div className="academics-docnurse-tabs-icn">
                      <img src={nurseTab} alt="Nurses Tab" />
                    </div>
                    <span>For Nurses</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              {/* Tab Content */}
              <Tab.Content>
                {/* Doctors Tab */}
                <Tab.Pane eventKey="doctors">
                  <p>For Doctors:</p>
                  <ul>
                    <li>DNB in Internal Medicine</li>
                    <li>Masters in Emergency Medicine by SEMI (Society for Emergency Medicine India)</li>
                    <li>Indian Diploma in Critical Care Medicine (IFCCM)</li>
                    <li>Certificate in Critical Medicine (ISCCM)</li>
                    <li>Fellowship in Diabetic Foot Surgery (Recognized by MUHS)</li>
                    <li>Fellowship in Critical Care Medicine (Recognized by MUHS)</li>
                    <li>International Diabetic Federation’s Certificate Course in Diabetology</li>
                    <li>Critical Care Nutrition Course by ISPEN</li>
                    <li>Fellowship in Diabetology by RSSDI (Research Society for the Study of Diabetes in India)</li>
                  </ul>
                  <div className="jdapplybtn">
                    <a href="#" className="btn with-color with-arr">
                      <img src={arrSvg} alt="Arrow" /> Enquire Now
                    </a>
                  </div>
                </Tab.Pane>

                {/* Nurses Tab */}
                <Tab.Pane eventKey="nurses">
                  <p>For Nurses:</p>
                  <ul>
                    <li>DNB in Internal Medicine</li>
                    <li>Masters in Emergency Medicine by SEMI (Society for Emergency Medicine India)</li>
                    <li>Indian Diploma in Critical Care Medicine (IFCCM)</li>
                    <li>Certificate in Critical Medicine (ISCCM)</li>
                    <li>Fellowship in Diabetic Foot Surgery (Recognized by MUHS)</li>
                    <li>Fellowship in Critical Care Medicine (Recognized by MUHS)</li>
                    <li>International Diabetic Federation’s Certificate Course in Diabetology</li>
                  </ul>
                  <div className="jdapplybtn">
                    <a href="#" className="btn with-color with-arr">
                      <img src={arrSvg} alt="Arrow" /> Enquire Now
                    </a>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </section>
    </>
  );
};

export default Academics;

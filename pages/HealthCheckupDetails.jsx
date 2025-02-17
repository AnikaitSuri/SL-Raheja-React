import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Box } from "@mui/material";
import { fetchHealthCheckupDetailsBanner, fetchHealthCheckupDetailsById } from "../Adapter/PageAdapter";
import careerBan from "../assets/images/careerdetailban.jpg";
import healthDetail from "../assets/images/speci-detail/healthdetl.jpg";
import arrSvg from "../assets/images/arrw.svg";
import { baseImage_path } from '../variables/Variables';

const BASE_IMAGE_URL = "http://localhost/slraheja/sl-raheja/public";

const HealthCheckupDetails = () => {
    const [bannerData, setBannerData] = useState(null);
    const { id } = useParams(); // Get the checkup_id from the URL
    const [healthCheckup, setHealthCheckup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const bannerResponse = await fetchHealthCheckupDetailsBanner();
                setBannerData(bannerResponse.data);

                // Fetch Health Checkup Details by ID
                const response = await fetchHealthCheckupDetailsById(id);
                if (response && response.data.length > 0) {
                    setHealthCheckup(response.data[0]); // Set the details of the health checkup
                }
            } catch (error) {
                console.error("Error fetching health checkup details:", error);
            }
        };
        fetchDetails();
    }, [id]);

    // if (loading) {
    //     return <p>Loading health checkup details...</p>;
    // }

    if (!healthCheckup) {
        return <p>No health checkup details found for ID: {id}</p>;
    }

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    // Test Inclusions Data
    const testInclusions = [
        {
            category: "Diabetes Risk Evaluation",
            tests: ["Blood Sugar Fasting", "Blood Sugar PP"],
        },
        {
            category: "Lipid Profile",
            tests: [
                "Total Cholesterol",
                "HDL Cholesterol",
                "LDL Cholesterol",
                "VLDL",
                "Triglycerides",
                "Total Cholesterol / HDL Ratio",
            ],
        },
        {
            category: "Kidney Profile",
            tests: ["S Creatinine", "S Uric Acid", "S Electrolytes", "BUN", "S Calcium"],
        },
        {
            category: "Liver Function Test",
            tests: [
                "Total Protein (Albumin, Globulin, A/G Ratio)",
                "SGOT",
                "SGPT",
                "Bilirubin",
                "LDH",
                "Alkaline Phosphatase",
            ],
        },
        {
            category: "Preventive Cardiology",
            tests: ["ECG", "2D Echo"],
        },
        {
            category: "Other Tests",
            tests: [
                "CBC with ESR",
                "Blood Group",
                "Stool Routine and Microscopy",
                "Urine Routine and Microscopy",
                "Chest X-ray",
                "PSA - Male",
                "USG Abdomen",
                "Audiometry",
            ],
        },
        {
            category: "Consultation",
            tests: ["Physician", "Dietician", "Dental", "Eye Consultation (Retinal Check)"],
        },
    ];

    // Health Checkup Package List
    const healthPackages = [
        "Comprehensive Health Package – Male",
        "Comprehensive Health Package – Female",
        "Executive Health Check Up Package",
        "Cardiac Check Up Package",
        "Diabetes Check Up Package",
        "Senior Citizen Health Package – Male",
        "Senior Citizen Health Package – Female",
        "Women Health Check Up Package",
        "Basic Health Check Up Package",
        "Knee Screening Package",
    ];

    return (
        <>
            {/* Banner Section */}
            <section className="banner-spac">
                <div className="cust-container">
                    <div className="banner-box">
                        {/* <img src={careerBan} alt="Health Check - Comprehensive Men" /> */}
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
                            <h1>Health Check - Comprehensive Men</h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* Health Checkup Details Section */}
            <section className="heatlchup-detail-sec mrgntop70 margnbot90">
                <div className="cust-container">
                    <div className="row">
                        {/* Left Section */}
                        <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                            <div className="healthchkdetail-left">
                                <div className="healthdetailcard">
                                    <div className="health-cardimg">
                                        <img src={healthDetail} alt="Comprehensive Health Package – Male" />
                                    </div>
                                    <div className="healthdetail-carddesc">
                                        <h4>{healthCheckup.health_checkup_package_name || "N/A"}</h4>
                                        <p>
                                            Email: <a href="mailto:info@rahejahospital.com">{healthCheckup.email}</a>
                                        </p>
                                        <p>
                                            Contact: <a href="tel:022-69871211">{healthCheckup.phone}</a>
                                        </p>
                                        {/* <span>Fees: Rs. {healthCheckup.checkup_fees}/-</span> */}
                                        <p>
                                            <strong>Fees:</strong> Rs. {healthCheckup.checkup_fees}/-
                                        </p>

                                        <div className="healthdetail-carddesc-cta">
                                            <a href="javascript:;" className="btn with-color with-arr">
                                                <img src={arrSvg} alt="Book Now" className="ctaimgwht" /> Book Now
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Test Inclusions */}
                                {/* <div className="health-detail-pkg-detail">
                                    <div className="pkgdetail-head">
                                        <h5>Test Inclusions</h5>
                                        <p>Package Instruction</p>
                                    </div>
                                    <div className="health-details">
                                        {testInclusions.map((item, index) => (
                                            <div key={index}>
                                                <p>{item.category}</p>
                                                <ul>
                                                    {item.tests.map((test, idx) => (
                                                        <li key={idx}>{test}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div> */}
                                {/* Tabs for Test Inclusions & Package Instructions */}
                                <Box sx={{ borderBottom: 1, borderColor: "divider", 
                                    marginTop: "20px", backgroundColor:'#0ca854', borderRadius:'0px 50px 50px 0px'  }}>
                                    <Tabs value={activeTab} onChange={handleTabChange} centered>
                                        <Tab label="Test Inclusions" style={{color:"#fff"}} />
                                        <Tab label="Package Instructions" style={{color:"#fff"}} />
                                    </Tabs>
                                </Box>

                                {/* Tab Content */}
                                {activeTab === 0 && (
                                    <div className="health-detail-pkg-detail" style={{marginTop:'30px'}}>
                                        <h5>Test Inclusions</h5>
                                        <div className="health-details">
                                            {healthCheckup.test_master &&
                                                healthCheckup.test_master.map((testCategory, index) => (
                                                    <div key={index}>
                                                        <p>{testCategory.test_master_name}</p>
                                                        <ul>
                                                            {testCategory.test_inclusion &&
                                                                testCategory.test_inclusion.length > 0 ? (
                                                                testCategory.test_inclusion.map((test, idx) => (
                                                                    <li key={idx}>{test.test_inclusion_names}</li>
                                                                ))
                                                            ) : (
                                                                <li>No tests included in this category.</li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 1 && (
                                    <div className="package-instructions">
                                        <h5>Package Instructions</h5>
                                        <p>
                                            Instructions are available here for the health package. Follow these guidelines to prepare for the
                                            checkup.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Section - Health Checkup Packages List */}
                        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
                            <div className="healthchkdetail-right">
                                <div className="health-chkup-pkgslist">
                                    <h4>Health Checkup Packages</h4>
                                    <ul>
                                        {healthPackages.map((packageName, index) => (
                                            <li key={index}>
                                                <a href="javascript:;">{packageName}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </>
    );
};

export default HealthCheckupDetails;
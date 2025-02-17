import React, { useState, useEffect } from 'react';
import tech1 from '../assets/images/tech1.png';
import BlackArrow from '../assets/images/black-arr.png';
import { techPatient } from '../Adapter/HomePageAdapter';

const PatientTech = () => {
    const [techData, setTechData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchTechData = async () => {
            try {
                const response = await techPatient();
                if (response && response.data && response.data.length >= 4) {
                    // Select only the 4th item (index 3)
                    setTechData(response.data[3]);
                } else {
                    setError("No data found for the 4th item.");
                }
            } catch (err) {
                setError("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchTechData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <section className="section technology">
                <h2 className="section-title">Technology <span>For The Patients</span></h2>
                <div className="cust-container">
                    <div className="tech-box">

                        {/* 1st Block - Show Image */}
                        <div className="tech-card ins-crd">
                            <img
                                src={techData.blog_img ? `https://localhost/slraheja/sl-raheja/public${techData.blog_img.replace('.', '')}` : tech1}
                                alt={techData.name || "Technology Image"}
                            />
                            <div className="box-tehc">
                                <h3>{techData.name || "Technology"}</h3>
                                <p>{techData.content || "No description available."}</p>
                                <a href="#" className="btn with-arr">
                                    Know More <img src={BlackArrow} alt="Arrow" />
                                </a>
                            </div>
                        </div>

                        {/* 2nd & 3rd Block - No Image */}
                        <div className="tech-card ins-crd">
                            <div className="box-tehc">
                                <h3>{techData.name || "Technology"}</h3>
                                <p>{techData.content || "No description available."}</p>
                                <a href="#" className="btn with-arr">
                                    Know More <img src={BlackArrow} alt="Arrow" />
                                </a>
                            </div>
                            <div className="box-tehc" style={{marginTop:'15px'}}>
                                <h3>{techData.name || "Technology"}</h3>
                                <p>{techData.content || "No description available."}</p>
                                <a href="#" className="btn with-arr">
                                    Know More <img src={BlackArrow} alt="Arrow" />
                                </a>
                            </div>
                        </div>

                        {/* 4th Block - Show Image */}
                        <div className="tech-card ins-crd">
                            <img
                                src={techData.blog_img ? `https://localhost/slraheja/sl-raheja/public${techData.blog_img.replace('.', '')}` : tech1}
                                alt={techData.name || "Technology Image"}
                            />
                            <div className="box-tehc">
                                <h3>{techData.name || "Technology"}</h3>
                                <p>{techData.content || "No description available."}</p>
                                <a href="#" className="btn with-arr">
                                    Know More <img src={BlackArrow} alt="Arrow" />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* <section class="section technology">
                <h2 class="section-title">Technology <span>For The Patients</span></h2>
                <div class="cust-container">
                    <div class="tech-box">
                        <div class="tech-card ins-crd">
                            <img src={tech1} alt="Latest Technology" />
                            <div class="box-tehc">
                                <h3>Latest Technology</h3>
                                <p>We offer a host of technologies to transform the way we treat patients and develop new
                                    cures...</p>
                                <a href="#" class="btn with-arr with-arr">Know More <img src={BlackArrow}
                                    alt="" />
                                </a>
                            </div>
                        </div>

                        <div class="tech-inner-box ins-crd">
                            <div class="card-different">
                                <div class="box-tehc">
                                    <h3>Latest Technology</h3>
                                    <p>We offer a host of technologies to transform the way we treat patients and develop
                                        new
                                        cures...</p>
                                    <a href="#" class="btn with-arr with-arr">Know More <img
                                        src={BlackArrow} alt="" />
                                    </a>
                                </div>
                            </div>

                            <div class="card-different">
                                <div class="box-tehc">
                                    <h3>Latest Technology</h3>
                                    <p>We offer a host of technologies to transform the way we treat patients and develop
                                        new
                                        cures...</p>
                                    <a href="#" class="btn with-arr with-arr">Know More <img
                                        src={BlackArrow} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="tech-card ins-crd">
                            <img src={tech1} alt="Latest Technology" />
                            <div class="box-tehc">
                                <h3>Latest Technology</h3>
                                <p>We offer a host of technologies to transform the way we treat patients and develop new
                                    cures...</p>
                                <a href="#" class="btn with-arr with-arr">Know More <img src={BlackArrow}
                                    alt="" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </section> */}
        </>
    )
}

export default PatientTech
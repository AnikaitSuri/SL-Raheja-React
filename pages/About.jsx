import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../assets/css/swiper.min.css';
import {
    fetchAboutUsBanner,
    fetchWhyChooseRaheja,
    fetchAwardsAccolades,
} from '../Adapter/PageAdapter';
import AboutBan from '../assets/images/aboutusbanner.jpg';
import AboutImg1 from '../assets/images/aboutus-left.jpg';
import googlerevew from '../assets/images/googlerevew.svg';
import accrediationImg from '../assets/images/accrediation.png';
import ceos1Img from '../assets/images/ceos1.jpg';
import ceos2Img from '../assets/images/ceos1.jpg';
import revleft from '../assets/images/revleft.jpg';
import revright from '../assets/images/revright.jpg';
import wc1Img from "../assets/images/wc1.png";
import wc2Img from "../assets/images/wc2.png";
import wc3Img from "../assets/images/wc3.png";
import wc4Img from "../assets/images/wc4.png";
import wc5Img from "../assets/images/wc5.png";
import wc6Img from "../assets/images/wc6.png";
import { baseImage_path } from '../variables/Variables';

// const BASE_IMAGE_URL = 'http://localhost/slraheja/sl-raheja/public';

const About = () => {
    const [bannerData, setBannerData] = useState([]);
    const [whyChooseData, setWhyChooseData] = useState(null);
    const [awardsData, setAwardsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const bannerResponse = await fetchAboutUsBanner();
            if (bannerResponse && bannerResponse.data) {
                setBannerData(bannerResponse.data);
            }

            const whyChooseResponse = await fetchWhyChooseRaheja();
            if (whyChooseResponse && whyChooseResponse.data.length > 0) {
                setWhyChooseData(whyChooseResponse.data[0]);
            }

            const awardsResponse = await fetchAwardsAccolades();
            if (awardsResponse && awardsResponse.data) {
                setAwardsData(awardsResponse.data);
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
                                src={`${baseImage_path}${bannerData.img_path.replace('.', '')}`}
                                alt={bannerData.banner_heading || "About Us"}
                            />
                        ) : (
                            <img src={AboutBan} alt="About Us Fallback" />
                        )}
                        <div className="ban-con">
                            <h1>{bannerData[0]?.banner_heading || 'About Us - Overview'}</h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Hospital Section */}
            <section className="section about-host">
                <div className="cust-container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="host-img">
                                <img src={AboutImg1} alt="About Us Left" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="host-det mobtopmarg">
                                <h4>
                                    About the Hospital, <br />
                                    <span>Located in Mumbai, India.</span>
                                </h4>
                                <p>
                                    Founded in 1981, S.L. Raheja Hospital—A Fortis Associate—has
                                    evolved into a premier healthcare institution known for its
                                    dedication to patient care, the latest technologies, and a
                                    wide range of specialties. Located in the vibrant neighborhood
                                    of South Bombay, Mahim, this multispecialty hospital is a go-to
                                    health partner, offering world-class medical services to
                                    thousands of patients for over 40+ years now.
                                </p>
                                <p>
                                    As one of the top hospitals for over four decades, we are one
                                    of the few dedicated to the treatment of diabetes, diabetic
                                    foot surgery, and various other multi-specialties. S.L. Raheja
                                    is a proud home to the Diabetic Association of India, the only
                                    association in India that caters to 20,000+ diabetic patients
                                    in a year and associated fields resulting from diabetic
                                    complications.
                                </p>
                                <p>
                                    Our mission is concise: To be a globally respected healthcare
                                    organization known for services efficiently.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="section towr-work">
                <div className="cust-container">
                    {whyChooseData && (
                        <div className="build-block">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="finnest">
                                        <h3>
                                            Why Choose <b>S.L. Raheja Hospital?</b>
                                        </h3>
                                        <p>
                                            {whyChooseData.content}
                                        </p>
                                        <div className="aboutus-howchoose">
                                            {/* <ul>
                                                {whyChooseData.hospital_achievements
                                                    .split(' ')
                                                    .map((achievement, index) => (
                                                        <li key={index}>
                                                            <div className="howchooseitem">
                                                                <div className="howchoosedesc">
                                                                    <p>{achievement}</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                            </ul> */}
                                            <ul>
                                                <li>
                                                    <div class="howchooseitem">
                                                        <div class="howchooseicn">
                                                            <img src={wc1Img} alt="" />
                                                        </div>
                                                        <div class="howchoosedesc">
                                                            <p>43+ Years of Trust</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="howchooseitem">
                                                        <div class="howchooseicn">
                                                            <img src={wc2Img} alt="" />
                                                        </div>
                                                        <div class="howchoosedesc">
                                                            <p>300+ Expert Doctors</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="howchooseitem">
                                                        <div class="howchooseicn">
                                                            <img src={wc3Img} alt="" />
                                                        </div>
                                                        <div class="howchoosedesc">
                                                            <p>170+ Beds with Advanced ICUs</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="howchooseitem">
                                                        <div class="howchooseicn">
                                                            <img src={wc4Img} alt="" />
                                                        </div>
                                                        <div class="howchoosedesc">
                                                            <p>6 Million+ Lives Touched</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="howchooseitem">
                                                        <div class="howchooseicn">
                                                            <img src={wc5Img} alt="" />
                                                        </div>
                                                        <div class="howchoosedesc">
                                                            <p>NABH Accredited</p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="howchooseitem">
                                                        <div class="howchooseicn">
                                                            <img src={wc6Img} alt="" />
                                                        </div>
                                                        <div class="howchoosedesc">
                                                            <p>24/7 Emergency Care</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="tower-img">
                                        <img
                                            src={
                                                whyChooseData && whyChooseData.main_img
                                                    ? `${baseImage_path}/${whyChooseData.main_img.replace(/^\.\//, '')}`
                                                    : AboutImg1 // Fallback image if main_img is undefined
                                            }
                                            alt="About Doctor" />
                                        <div className="pat-rev chngwidth">
                                            <div className="bck-bor">
                                                <h4>{whyChooseData.total_patients_review}+</h4>
                                                <p>
                                                    PATIENT'S <br />
                                                    REVIEWS
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="doct-team">
                                        <img src={accrediationImg} alt="Accreditations" />
                                        <div className="doct-deta">
                                            <h6>Accreditations</h6>
                                            <div className="check-list checklistwithicn">
                                                {whyChooseData.accreditations_type
                                                    .split(',')
                                                    .map((type, index) => (
                                                        <p key={index}>{type}</p>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Awards Section */}
            <section className="awardcarousel-sec mrgntop70">
                <div className="cust-container">
                    <div className="awardcarousel-head">
                        <h4>Awards & Accolades</h4>
                    </div>
                    <div className="award-carousel-inner">
                        <Swiper
                            navigation={{
                                nextEl: ".cust-swiper-button-next",
                                prevEl: ".cust-swiper-button-prev",
                            }}
                            modules={[Navigation]}
                            spaceBetween={2}
                            slidesPerView={3}
                            className='awardcarousel'
                        >
                            {awardsData.map((award) => (
                                <SwiperSlide key={award.id}>
                                    <div className="awardcarousel-item">
                                        <div className="award-desc">
                                            <p>{award.heading}</p>
                                            <p>
                                                <b>{award.sub_heading}</b>
                                            </p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {/* Swiper Navigation */}
                        <div className="cust-swiper-button-prev"></div>
                        <div className="cust-swiper-button-next"></div>
                    </div>
                </div>
            </section>

            {/* CEO's Message Section */}
            <section className="ceos-mesg-sec mrgntop70">
                <div className="cust-container">
                    <div className="ceo-mesg-inner">
                        <div className="ceos-head">
                            <h4>
                                CEO’s <b>Message</b>
                            </h4>
                            <p>
                                At S.L. Raheja Hospital, Mahim, we are dedicated to delivering
                                world-class healthcare with compassion, innovation, and
                                excellence. Our commitment is to improve lives through advanced
                                medical expertise and personalized patient care.
                            </p>
                        </div>
                        <div className="ceos-desc">
                            <div className="ceos-itmeimg ceodescitem">
                                <img src={ceos1Img} alt="CEO 1" />
                            </div>
                            <div className="ceos-itmeimg ceodescitem">
                                <img src={ceos2Img} alt="CEO 2" />
                            </div>
                            <div className="ceos-detail ceodescitem">
                                <h5>Our MISSION</h5>
                                <p>
                                    To be globally respected healthcare organization known for
                                    Clinical Excellence and Distinctive Patient care.
                                </p>
                                <p>
                                    To create a world-class integrated healthcare delivery system
                                    in India, entailing the finest medical skills combined with
                                    compassionate patient care.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Reviews Section */}
            <section className="aboutus-googlerevwsec mrgntop70 margnbot90">
                <div className="cust-container">
                    <div className="aboutus-googlerevinner">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="googlervew-left">
                                    <div className="googlervew-img">
                                        <img src={revleft} alt="Google Review Left" />
                                    </div>
                                    <div className="googlervew-card">
                                        <div className="googlervwcard-img">
                                            <img src={googlerevew} alt="Google Logo" />
                                        </div>
                                        <p>
                                            Et eligendi expedita. Accusantium qui est eius nemo eaque
                                            dolore necessitatibus voluptatem. Ut accusamus provident
                                            beatae dolorum amet. Omnis sapiente aut saepe aliquam
                                            doloribus eaque. Iure sit sed animi molestiae impedit.
                                        </p>
                                        <div className="googlervcard-author">
                                            <p>
                                                <i>From: Sophia Jenkins</i>
                                            </p>
                                            <a href="#">See it on Google</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="googlervew-right">
                                    <div className="googlervew-img">
                                        <img src={revright} alt="Google Review Right" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About

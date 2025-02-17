/* global $ */
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../assets/css/swiper.min.css';
import whiteArr from '../assets/images/white-arr.png';
import { homeBaner } from '../Adapter/HomePageAdapter';
import { baseImage_path } from '../variables/Variables';

const HeroSlider = () => {

    // Banner Carousel Options
    const bannerOptions = {
        loop: true,
        margin: 10,
        nav: true,
        dots: false,
        items: 1,
    };

    const [banners, setBanners] = useState([]);      // To store API data
    const [loading, setLoading] = useState(true);    // Loading state
    const [error, setError] = useState(null);        // Error state

    // Fetch the banner data on component mount
    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await homeBaner();
                if (response && response.data) {
                    setBanners(response.data);      // Set banner data
                } else {
                    setError("Failed to load banners.");
                }
            } catch (err) {
                setError("An error occurred while fetching banners.");
            } finally {
                setLoading(false);                // Stop loading
            }
        };

        fetchBannerData();
    }, []);

    // Handle loading state
    if (loading) {
        return <div>Loading banners...</div>;
    }

    // Handle error state
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="home">
            <Swiper
                modules={[Navigation, Autoplay]}
                loop
                spaceBetween={5}
                autoplay={{ delay: 300000 }}
                navigation={{
                    nextEl: '.swiper-button-prev',
                    prevEl: '.swiper-button-next',
                }}
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div
                            className="back-img"
                            style={{
                                backgroundImage: `url(${baseImage_path}${banner.img_path.replace(/^\./, "")})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '600px',
                            }}
                        >
                            <div className="container">
                                <div className="safe-card">
                                    <h1>{banner.banner_heading} <br />
                                        <span>{banner.banner_sub_heading}</span>
                                    </h1>
                                    <p>{banner.banner_content}</p>
                                    <a href="#" className="btn with-color with-arr">
                                        <img src={whiteArr} alt="arrow" /> Learn More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                {/* Custom Navigation Arrows */}
                <div className="Home-swiperNav">
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
            </Swiper>
        </div>
    );
};

export default HeroSlider;

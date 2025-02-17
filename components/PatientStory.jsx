import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import pat1 from '../assets/images/pat1.png';
import feed from '../assets/images/feed.png';
import { fetchPatientStory, fetchPatientVideos } from '../Adapter/HomePageAdapter';

const PatientStory = () => {

    const [videoTestimonials, setVideoTestimonials] = useState([]);
    const [textTestimonials, setTextTestimonials] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null); // For popup
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch both video and text testimonials
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [videoResponse, textResponse] = await Promise.all([
                    fetchPatientVideos(),
                    fetchPatientStory()
                ]);

                // if (videoResponse && videoResponse.data) {
                //     setVideoTestimonials(videoResponse.data);
                // }

                // if (textResponse && textResponse.data) {
                //     setTextTestimonials(textResponse.data);
                // }
                if (videoResponse?.data) {
                    // Convert standard YouTube links to embed format
                    const sanitizedVideos = videoResponse.data.map((video) => ({
                        ...video,
                        video_link: video.video_link?.replace(
                            'watch?v=',
                            'embed/'
                        ),
                    }));
                    setVideoTestimonials(sanitizedVideos);
                }

                if (textResponse?.data) {
                    setTextTestimonials(textResponse.data);
                }
            } catch (err) {
                setError("Failed to load patient stories.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <section className="section patient">
                <h2 className="section-title">Patient Stories</h2>
                <div className="patient-stories">

                    {/* Video Testimonials Slider */}
                    <div className="video-stories">
                        <Swiper
                            modules={[Autoplay, Navigation, Pagination]}
                            loop
                            spaceBetween={5}
                            slidesPerView={3}
                            autoplay={{ delay: 3000 }}
                            pagination={{
                                clickable: true,
                                el: '.swiper-pagination',
                            }}
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 },
                                1024: { slidesPerView: 3 }
                            }}
                            navigation={{
                                nextEl: '.swiper-button-prev',
                                prevEl: '.swiper-button-next',
                            }}
                        >
                            {videoTestimonials.map((video) => (
                                <SwiperSlide key={video.id}>
                                    <div
                                        className="pat-vid-card"
                                        onClick={() => setSelectedVideo(video.video_link)}
                                    >
                                        <img src={pat1} alt={video.name || "Patient Video"} />
                                    </div>
                                </SwiperSlide>
                            ))}
                            {/* Navigation and Pagination */}
                            <div className="swiper-navigation">
                                <div className="swiper-button-prev"></div>
                                <div className="swiper-pagination"></div>
                                <div className="swiper-button-next"></div>
                            </div>
                        </Swiper>
                    </div>

                    {/* Text Testimonials Slider */}
                    <div className="feedback-stories">
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            loop
                            spaceBetween={5}
                            slidesPerView={2}
                            autoplay={{ delay: 40000 }}
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 1 },
                                1024: { slidesPerView: 2 }
                            }}
                            // onSlideChange={(swiper) => {
                            //     document.querySelectorAll('.feedback-stories .swiper-slide').forEach((slide, index) => {
                            //         slide.style.height = index === swiper.activeIndex ? 'auto' : '150px';
                            //     });
                            // }}
                            navigation={{
                                nextEl: '.swiper-button-prev',
                                prevEl: '.swiper-button-next',
                            }}
                            pagination={{
                                clickable: true,
                                el: '.swiper-pagination',
                            }}
                        >
                            {textTestimonials.map((story) => (
                                <SwiperSlide key={story.id}>
                                    <div className="feed-content">
                                        <div className="img-rating">
                                            <img
                                                src={story.profile_img
                                                    ? `https://localhost/slraheja/sl-raheja/public${story.profile_img.replace('.', '')}`
                                                    : feed}
                                                alt={story.name || "Patient"}
                                            />
                                            <div className="desg">
                                                <h5>{story.name || "Anonymous"}</h5>
                                                <p>{story.designation || "Patient"}</p>
                                            </div>
                                        </div>
                                        <h5>{story.heading || "Patient Story"}</h5>
                                        <p>{story.review || "No review provided."}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                            {/* Navigation and Pagination */}
                            <div className="swiper-navigation">
                                <div className="swiper-button-prev"></div>
                                <div className="swiper-pagination"></div>
                                <div className="swiper-button-next"></div>
                            </div>
                        </Swiper>
                    </div>
                </div>
            </section>

            {/* Video Popup Modal */}
            {selectedVideo && (
                <div className="video-popup" onClick={() => setSelectedVideo(null)}>
                    <div className="video-popup-content">
                        <iframe
                            width="800"
                            height="450"
                            src={selectedVideo}
                            title="Patient Story Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                        <button className="close-btn" onClick={() => setSelectedVideo(null)}>
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default PatientStory;
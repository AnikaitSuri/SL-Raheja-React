import React, { useState, useEffect } from 'react';
import { upcomingEvents, infoHealth } from '../Adapter/HomePageAdapter';
import BlogImg from '../assets/images/blog1.png';

const InformationEvents = () => {

    const [infoPosts, setInfoPosts] = useState([]);      // For Better Information, Better Health
    const [events, setEvents] = useState([]);           // For Upcoming Events
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("CME");
    const [error, setError] = useState(null);

    // Fetch both APIs when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [infoResponse, eventsResponse] = await Promise.all([
                    infoHealth(),
                    upcomingEvents()
                ]);

                if (infoResponse && infoResponse.data) {
                    setInfoPosts(infoResponse.data);
                } else {
                    setError("Failed to load health information.");
                }

                if (eventsResponse && eventsResponse.data) {
                    setEvents(eventsResponse.data);
                    setFilteredEvents(
                        eventsResponse.data.filter((event) => event.event_type === "CME")
                    ); // Default to CME events
                } else {
                    setError("Failed to load upcoming events.");
                }
            } catch (err) {
                setError("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle Tab Click
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        const filtered = events.filter((event) => event.event_type === tab);
        setFilteredEvents(filtered);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <section className="blog-events">
                <div className="cust-container">
                    <h2 className="section-title">Better <span>Information</span>, Better Health</h2>

                    <div className="blog-section">
                        <div className="row">
                            {/* Mapping Better Info Health Data */}
                            {infoPosts.map((post) => (
                                <div key={post.id} className="col-md-4">
                                    <div className="blog-card">
                                        <img src={BlogImg} alt={post.title} />
                                        <div className="blog-card-content">
                                            <h3>{new Date(post.date).toLocaleDateString()}</h3>
                                            <h4>{post.heading}</h4>
                                            <p>{post.decription}</p>
                                            <a href="#" className="btn">Read Post</a>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Upcoming Events Section */}
                            <div className="col-md-4">
                                <div className="blog-card events-section">
                                    <h2>Upcoming Events</h2>

                                    {/* <div className="blogtabs tabs">
                                        <a href="#" className="active btn with-clor">CME</a>
                                        <a href="#" className="btn without-color">Camps</a>
                                        <a href="#" className="btn without-color">Others</a>
                                    </div> */}
                                    {/* Tabs for CME, Camps, and Others */}
                                    <div className="blogtabs tabs">
                                        <a
                                            href="#"
                                            className={`btn ${activeTab === "CME" ? "with-clor active" : "without-color"}`}
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent scrolling to the top
                                                handleTabClick("CME");
                                            }}
                                        >
                                            CME
                                        </a>
                                        <a
                                            href="#"
                                            className={`btn ${activeTab === "Camps" ? "with-clor active" : "without-color"}`}
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent scrolling to the top
                                                handleTabClick("Camps");
                                            }}
                                        >
                                            Camps
                                        </a>
                                        <a
                                            href="#"
                                            className={`btn ${activeTab === "Others" ? "with-clor active" : "without-color"}`}
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent scrolling to the top
                                                handleTabClick("Others");
                                            }}
                                        >
                                            Others
                                        </a>
                                    </div>

                                    <div className="my-evnt">
                                        {/* Mapping Upcoming Events */}
                                        {/* {events.map((event) => (
                                            <div key={event.id} className="event">
                                                <div className="event-date">
                                                    <h3>{new Date(event.event_date).getDate()}</h3>
                                                    <p>{new Date(event.event_date).toLocaleString('default', { month: 'short' })}</p>
                                                </div>
                                                <div className="event-info">
                                                    <h4>{event.heading}</h4>
                                                    <p>{event.description}</p>
                                                    <p><strong>Location:</strong> {event.location}</p>
                                                    <a href="#" className="btn">View Details</a>
                                                </div>
                                            </div>
                                        ))} */}
                                        {filteredEvents.length > 0 ? (
                                            filteredEvents.map((event) => (
                                                <div key={event.id} className="event">
                                                    <div className="event-date">
                                                        <h3>{new Date(event.event_date).getDate()}</h3>
                                                        <p>
                                                            {new Date(event.event_date).toLocaleString("default", {
                                                                month: "short",
                                                            })}
                                                        </p>
                                                    </div>
                                                    <div className="event-info">
                                                        <h4>{event.heading}</h4>
                                                        <p>{event.description}</p>
                                                        <p>
                                                            <strong>Location:</strong> {event.location}
                                                        </p>
                                                        <a href="#" className="btn">
                                                            View Details
                                                        </a>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No events available for {activeTab}.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default InformationEvents;
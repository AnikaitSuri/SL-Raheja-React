import React, { useState } from 'react';
import { addContact } from '../Adapter/HomePageAdapter';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import ContactBan from '../assets/images/cont-ban.png';
import ContaIc1 from '../assets/images/cont-ic1.png';
import ContaIc2 from '../assets/images/cont-ic2.png';
import ContaIc3 from '../assets/images/cont-ic3.png';
import WhiteArr from '../assets/images/white-arr.png';

// toast.configure();

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await addContact(formData);

            // if (response && response.success && response.ok && response.success === 200) {
                toast.success(response.message || "Message sent successfully!");
                setFormData({ name: '', email: '', phone: '', message: '' });
            // } else {
                // toast.error(response.error || "Failed to send message. Please try again.");
            // }
        } 
        catch (err) {
            toast.error(err.message || "Error occurred. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section class="banner-spac">
                <div class="container">
                    <div class="banner-box">
                        <picture>
                            <source media="(min-width:650px)" srcset={ContactBan} />
                            <img src={ContactBan} alt="Flowers" style={{ width: 'auto' }} />
                        </picture>
                        <div class="ban-con">
                            <h1>Contact Us</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section class="section cont-form">
                <div class="container">
                    <div class="contact-touch">
                        <div class="left-touch">
                            <h3>Mahim Mumbai</h3>
                            <div class="dt-fom">
                                <img src={ContaIc1} alt="" />
                                <p> S.L. Raheja Hospital - A Fortis Associate (Diabetic Association
                                    of India), Raheja Rugnalaya Marg, Mahim West,
                                    Mumbai, Maharashtra, India - 400016</p>
                            </div>
                            <div class="dt-fom">
                                <img src={ContaIc2} alt="" />
                                <p> info@rahejahospital.com</p>
                            </div>
                            <div class="dt-fom">
                                <img src={ContaIc3} alt="" />
                                <p>Boardline No: 022-69871211 / 9167676790</p>
                            </div>
                            <div class="dt-fom">
                                <img src={ContaIc3} alt="" />
                                <p>Emergency No: 022-66529979</p>
                            </div>
                        </div>
                        <div className="right-touch">
                            <h3>Get In Touch</h3>
                            <p>Your email address will not be published. Required fields are marked *</p>

                            <form onSubmit={handleSubmit} className="cot-frm">
                                <div className="form-holder">
                                    <label htmlFor="name">Name*</label>
                                    <input type="text" id="name" name="name" placeholder="Please enter name" required value={formData.name} onChange={handleChange} />
                                </div>

                                <div className="form-holder">
                                    <label htmlFor="email">Email*</label>
                                    <input type="email" id="email" name="email" placeholder="Please enter your email address" required value={formData.email} onChange={handleChange} />
                                </div>

                                <div className="form-holder">
                                    <label htmlFor="phone">Phone (Optional)</label>
                                    <input type="text" id="phone" name="phone" placeholder="Please enter your phone number" value={formData.phone} onChange={handleChange} />
                                </div>

                                <div className="form-holder">
                                    <label htmlFor="message">Your Message*</label>
                                    <textarea id="message" name="message" placeholder="Please write your message here" rows="5" required value={formData.message} onChange={handleChange}></textarea>
                                </div>

                                <div className="check-box">
                                    <input type="checkbox" id="terms" name="terms" required />
                                    <label htmlFor="terms">I agree with the terms.</label>
                                </div>

                                <button type="submit" className="btn with-color with-arr" disabled={loading}>
                                    {loading ? "Sending..." : <>
                                        <img src={WhiteArr} alt="" /> Send Message Now
                                    </>}
                                </button>
                                <ToastContainer />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ContactUs;

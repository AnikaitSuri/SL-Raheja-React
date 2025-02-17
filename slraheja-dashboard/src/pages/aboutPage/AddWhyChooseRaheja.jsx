import React, { useState } from "react";
import "./addAboutPage.css";
import { addWhyChooseRaheja } from "../../Adapters/ApiAdapter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddWhyChooseRaheja = () => {
    const [heading, setHeading] = useState("");
    const [subHeading, setSubHeading] = useState("");
    const [content, setContent] = useState("");
    const [totalPatientsReview, setTotalPatientsReview] = useState("");
    const [achievements, setAchievements] = useState([{ achievement_name: "", achievement_icon: null }]);
    const [accreditationsType, setAccreditationsType] = useState("");
    const [mainImg, setMainImg] = useState(null);
    const [accreditationsImg, setAccreditationsImg] = useState(null);

    // Add new achievement row
    const handleAddAchievement = () => {
        setAchievements([...achievements, { achievement_name: "", achievement_icon: null }]);
    };

    // Update achievement field
    const handleAchievementChange = (index, field, value) => {
        const updatedAchievements = [...achievements];
        updatedAchievements[index][field] = value;
        setAchievements(updatedAchievements);
    };

    // Remove achievement row
    const handleRemoveAchievement = (index) => {
        const updatedAchievements = achievements.filter((_, i) => i !== index);
        setAchievements(updatedAchievements);
    };

    // Submit form data
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("heading", heading);
        formData.append("sub_heading", subHeading);
        formData.append("content", content);
        formData.append("total_patients_review", totalPatientsReview);
        formData.append("accreditations_type", accreditationsType);

        // Append main and accreditation images
        if (mainImg) formData.append("main_img", mainImg);
        if (accreditationsImg) formData.append("accreditations_img", accreditationsImg);

        // Append achievements
        achievements.forEach((achievement, index) => {
            formData.append(`achievements[${index}][achievement_name]`, achievement.achievement_name);
            if (achievement.achievement_icon) {
                formData.append(`achievements[${index}][achievement_icon]`, achievement.achievement_icon);
            }
        });

        try {
            const response = await addWhyChooseRaheja(formData);
            if (response.message) {
                toast.success(response.message);
            } else {
                toast.error("Failed to add Why Choose Raheja");
            }
        } catch (error) {
            toast.error("An error occurred while adding Why Choose Raheja.");
        }
    };

    return (
        <div className="add-why-choose-raheja">
            <ToastContainer />
            <h3>Add Why Choose Raheja</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Heading:</label>
                    <input
                        type="text"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Sub-Heading:</label>
                    <input
                        type="text"
                        value={subHeading}
                        onChange={(e) => setSubHeading(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Total Patients Review:</label>
                    <input
                        type="number"
                        value={totalPatientsReview}
                        onChange={(e) => setTotalPatientsReview(e.target.value)}
                        required
                    />
                </div>

                {/* Hospital Achievements Section */}
                <div>
                    <label>Hospital Achievements:</label>
                    {achievements.map((achievement, index) => (
                        <div key={index} className="achievement-item">
                            <input
                                type="text"
                                placeholder="Achievement Name"
                                value={achievement.achievement_name}
                                onChange={(e) =>
                                    handleAchievementChange(index, "achievement_name", e.target.value)
                                }
                                required
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleAchievementChange(index, "achievement_icon", e.target.files[0])
                                }
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveAchievement(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddAchievement}>
                        Add Achievement
                    </button>
                </div>

                <div>
                    <label>Accreditations Type:</label>
                    <textarea
                        value={accreditationsType}
                        onChange={(e) => setAccreditationsType(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Main Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setMainImg(e.target.files[0])}
                    />
                </div>
                <div>
                    <label>Accreditations Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAccreditationsImg(e.target.files[0])}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddWhyChooseRaheja;

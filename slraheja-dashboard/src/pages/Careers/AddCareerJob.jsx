import React, { useState } from "react";
import { addJob } from "../../Adapters/ApiAdapter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddCareerJob = () => {
    const [formData, setFormData] = useState({
        title: "",
        department: "",
        designation: "",
        details: "",
        description: "",
        exp_required: "",
        skills: "",
        education: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const jobData = new FormData();
            Object.keys(formData).forEach((key) => jobData.append(key, formData[key]));

            const response = await addJob(jobData);
            if (response?.message) {
                toast.success(response.message);
                navigate("/career-jobs"); // Redirect back to the Career Jobs list
            } else {
                toast.error("Failed to add job.");
            }
        } catch (error) {
            toast.error("An error occurred while adding the job.");
        }
    };

    return (
        <div className="add-career-job">
            <ToastContainer />
            <h3>Add Career Job</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Designation:</label>
                    <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Details:</label>
                    <textarea
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Experience Required:</label>
                    <input
                        type="number"
                        name="exp_required"
                        value={formData.exp_required}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Skills:</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Education:</label>
                    <input
                        type="text"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddCareerJob;
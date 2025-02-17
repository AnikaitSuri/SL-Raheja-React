import React, { useState } from "react";
import { Box, Button, TextField, Typography, CircularProgress, Alert } from "@mui/material";
import { addHealthCheckup } from "../../Adapters/ApiAdapter";

const AddHealthCheckup = () => {
    const [formData, setFormData] = useState({
        heading: "",
        doctor_id: "",
        speciality_id: "",
        health_checkup_package_id: "",
        checkup_title: "",
        checkup_fees: "",
        email: "",
        phone: "",
        contact_person: "",
        source_page: "",
        checkup_image: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, checkup_image: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const data = new FormData();
        Object.keys(formData).forEach((key) => data.append(key, formData[key]));

        try {
            const response = await addHealthCheckup(data);
            if (response?.message) {
                alert("Health Checkup added successfully!");
            } else {
                setError("Failed to add health checkup.");
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred while adding health checkup.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box m="20px">
            <Typography variant="h4">Add Health Checkup</Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <TextField
                    fullWidth
                    label="Heading"
                    margin="normal"
                    name="heading"
                    value={formData.heading}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Doctor ID"
                    margin="normal"
                    name="doctor_id"
                    value={formData.doctor_id}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Speciality ID"
                    margin="normal"
                    name="speciality_id"
                    value={formData.speciality_id}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Package ID"
                    margin="normal"
                    name="health_checkup_package_id"
                    value={formData.health_checkup_package_id}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Title"
                    margin="normal"
                    name="checkup_title"
                    value={formData.checkup_title}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Fees"
                    margin="normal"
                    name="checkup_fees"
                    value={formData.checkup_fees}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Phone"
                    margin="normal"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    label="Contact Person"
                    margin="normal"
                    name="contact_person"
                    value={formData.contact_person}
                    onChange={handleChange}
                />
                <Button variant="contained" component="label">
                    Upload Image
                    <input type="file" hidden onChange={handleFileChange} />
                </Button>
                <Button type="submit" variant="contained" color="primary" disabled={loading} style={{ marginTop: "16px" }}>
                    {loading ? <CircularProgress size={24} /> : "Submit"}
                </Button>
            </form>
        </Box>
    );
};

export default AddHealthCheckup;

import React, { useState } from "react";
import { addAwardsAccolades } from "../../Adapters/ApiAdapter";
import { Button, TextField, Box, Typography, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const AddAwardsAccolades = ({ onAddSuccess }) => {
    const [formData, setFormData] = useState({
        heading: "",
        sub_heading: "",
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = new FormData();
        requestData.append("heading", formData.heading);
        requestData.append("sub_heading", formData.sub_heading);
        if (image) {
            requestData.append("Img_path", image);
        }

        setLoading(true);

        try {
            const response = await addAwardsAccolades(requestData);
            toast.success(response.message);
            onAddSuccess(); // Refresh the list or close the dialog
        } catch (error) {
            toast.error(error.message || "Failed to add awards and accolades.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} p={3}>
            <Typography variant="h5" gutterBottom>
                Add Awards and Accolades
            </Typography>

            <TextField
                fullWidth
                margin="normal"
                label="Heading"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                required
            />

            <TextField
                fullWidth
                margin="normal"
                label="Sub Heading"
                name="sub_heading"
                value={formData.sub_heading}
                onChange={handleChange}
                required
            />

            <Button
                variant="contained"
                component="label"
                style={{ marginTop: "16px", marginBottom: "16px" }}
            >
                Upload Image
                <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
            {image && <Typography>{image.name}</Typography>}
            <br />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
        </Box>
    );
};

export default AddAwardsAccolades;
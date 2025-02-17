import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    CircularProgress,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addBannerCMS } from "../../Adapters/ApiAdapter";

const AddBannerCMS = () => {
    const [formData, setFormData] = useState({
        name: "",
        banner_heading: "",
        banner_sub_heading: "",
        banner_content: "",
        img_path: null,
        source_page: "",
    });

    const [loading, setLoading] = useState(false);

    const sourcePages = [
        "Home",
        "About Us",
        "Contact Us",
        "Specialities",
        "Academics",
        "Careers",
    ]; // Static dropdown options

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, img_path: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const bannerData = new FormData();
        for (let key in formData) {
            bannerData.append(key, formData[key]);
        }

        try {
            const response = await addBannerCMS(bannerData);
            if (response?.message) {
                toast.success("Banner added successfully!");
                setFormData({
                    name: "",
                    banner_heading: "",
                    banner_sub_heading: "",
                    banner_content: "",
                    img_path: null,
                    source_page: "",
                });
            } else {
                toast.error("Failed to add banner.");
            }
        } catch (error) {
            toast.error("An error occurred while adding the banner.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box m="20px">
            <ToastContainer />
            <Typography variant="h4" gutterBottom>
                Add Banner
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Banner Heading"
                    name="banner_heading"
                    value={formData.banner_heading}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Banner Sub Heading"
                    name="banner_sub_heading"
                    value={formData.banner_sub_heading}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Banner Content"
                    name="banner_content"
                    multiline
                    rows={3}
                    value={formData.banner_content}
                    onChange={handleInputChange}
                    required
                />
                <FormControl fullWidth margin="normal" required>
                    <InputLabel>Source Page</InputLabel>
                    <Select
                        name="source_page"
                        value={formData.source_page}
                        onChange={handleInputChange}
                    >
                        {sourcePages.map((page, index) => (
                            <MenuItem key={index} value={page}>
                                {page}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    component="label"
                    style={{ marginTop: "20px" }}
                >
                    Upload Image
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                {formData.img_path && (
                    <Typography mt={1}>{formData.img_path.name}</Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    style={{ marginTop: "20px" }}
                >
                    {loading ? <CircularProgress size={24} /> : "Add Banner"}
                </Button>
            </form>
        </Box>
    );
};

export default AddBannerCMS;

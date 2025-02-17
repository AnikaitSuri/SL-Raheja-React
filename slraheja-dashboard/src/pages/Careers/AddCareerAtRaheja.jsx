import React, { useState } from "react";
import { Box, Button, TextField, CircularProgress, Typography } from "@mui/material";
import { addCareerAtRaheja } from "../../Adapters/ApiAdapter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCareerAtRaheja = () => {
  const [formData, setFormData] = useState({
    title: "",
    heading: "",
    sub_heading: "",
    content: "",
    img: null,
  });

  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      img: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = new FormData();
    requestData.append("title", formData.title);
    requestData.append("heading", formData.heading);
    requestData.append("sub_heading", formData.sub_heading);
    requestData.append("content", formData.content);
    if (formData.img) requestData.append("img", formData.img);

    try {
      const response = await addCareerAtRaheja(requestData);
      if (response?.message) {
        toast.success("Career at Raheja added successfully!");
        // Reset the form after successful submission
        setFormData({
          title: "",
          heading: "",
          sub_heading: "",
          content: "",
          img: null,
        });
      } else {
        toast.error("Failed to add Career at Raheja. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while adding Career at Raheja.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Add Career at Raheja
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Box mb={2}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Heading"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Sub Heading"
            name="sub_heading"
            value={formData.sub_heading}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Content"
            name="content"
            multiline
            rows={4}
            value={formData.content}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <Button variant="contained" component="label">
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {formData.img && (
            <Typography mt={1}>{formData.img.name}</Typography>
          )}
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </form>
    </Box>
  );
};

export default AddCareerAtRaheja;
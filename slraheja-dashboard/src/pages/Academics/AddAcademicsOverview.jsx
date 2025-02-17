import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addAcademicsOverview } from "../../Adapters/ApiAdapter";

const AddAcademicsOverview = () => {
  const [formData, setFormData] = useState({
    heading: "",
    content: "",
    side_img: null,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, side_img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const academicsData = new FormData();
    academicsData.append("heading", formData.heading);
    academicsData.append("content", formData.content);
    if (formData.side_img) academicsData.append("side_img", formData.side_img);

    try {
      const response = await addAcademicsOverview(academicsData);
      if (response?.message) {
        toast.success("Academics Overview added successfully!");
        setFormData({ heading: "", content: "", side_img: null });
      } else {
        toast.error("Failed to add Academics Overview.");
      }
    } catch (error) {
      toast.error("An error occurred while adding Academics Overview.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Add Academics Overview
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Heading"
          name="heading"
          value={formData.heading}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Content"
          name="content"
          multiline
          rows={4}
          value={formData.content}
          onChange={handleInputChange}
          required
        />
        <Button
          variant="contained"
          component="label"
          style={{ marginTop: "20px" }}
        >
          Upload Side Image
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: "20px" }}
        >
          {loading ? <CircularProgress size={24} /> : "Add Overview"}
        </Button>
      </form>
    </Box>
  );
};

export default AddAcademicsOverview;
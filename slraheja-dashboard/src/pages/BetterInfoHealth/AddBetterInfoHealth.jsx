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
import { addBetterInfoHealth } from "../../Adapters/ApiAdapter";

const AddBetterInfoHealth = () => {
  const [formData, setFormData] = useState({
    title: "",
    heading: "",
    decription: "",
    content: "",
    date: "",
    source_page: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const infoData = new FormData();
    for (let key in formData) {
      infoData.append(key, formData[key]);
    }

    try {
      const response = await addBetterInfoHealth(infoData);
      if (response && response.message) {
        toast.success("Better Info Health added successfully!");
        setFormData({
          title: "",
          heading: "",
          decription: "",
          content: "",
          date: "",
          source_page: "",
          status: "",
        });
      } else {
        toast.error("Failed to add Better Info Health.");
      }
    } catch (error) {
      toast.error("An error occurred while adding Better Info Health.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Add Better Info Better Health
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
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
          label="Description"
          name="decription"
          multiline
          rows={3}
          value={formData.decription}
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
        <TextField
          fullWidth
          margin="normal"
          label="Date"
          name="date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.date}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Source Page"
          name="source_page"
          value={formData.source_page}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: "20px" }}
        >
          {loading ? <CircularProgress size={24} /> : "Add Info"}
        </Button>
      </form>
    </Box>
  );
};

export default AddBetterInfoHealth;
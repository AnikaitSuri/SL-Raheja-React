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
import { addSpecialty } from "../../Adapters/ApiAdapter";

const AddSpecialties = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    extra: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const specialtyData = new FormData();
    for (let key in formData) {
      specialtyData.append(key, formData[key]);
    }

    try {
      const response = await addSpecialty(specialtyData);
      if (response && response.message) {
        toast.success("Specialty added successfully!");
        setFormData({
          name: "",
          description: "",
          extra: "",
        });
      } else {
        toast.error("Failed to add specialty.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the specialty.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Add Specialty
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
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Extra"
          name="extra"
          value={formData.extra}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: "20px" }}
        >
          {loading ? <CircularProgress size={24} /> : "Add Specialty"}
        </Button>
      </form>
    </Box>
  );
};

export default AddSpecialties;

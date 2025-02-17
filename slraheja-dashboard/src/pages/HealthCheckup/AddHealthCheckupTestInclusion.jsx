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
import { addHealthCheckupTestInclusion } from "../../Adapters/ApiAdapter";

const AddHealthCheckupTestInclusion = () => {
  const [formData, setFormData] = useState({
    inclusion_name: "",
    test_id: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await addHealthCheckupTestInclusion(formData);
      if (response?.message) {
        toast.success("Test Inclusion added successfully!");
        setFormData({
          inclusion_name: "",
          test_id: "",
        });
      } else {
        toast.error("Failed to add Test Inclusion.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the Test Inclusion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Add Health Checkup Test Inclusion
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Inclusion Name"
          name="inclusion_name"
          value={formData.inclusion_name}
          onChange={handleInputChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Test ID"
          name="test_id"
          type="number"
          value={formData.test_id}
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
          {loading ? <CircularProgress size={24} /> : "Add Test Inclusion"}
        </Button>
      </form>
    </Box>
  );
};

export default AddHealthCheckupTestInclusion;
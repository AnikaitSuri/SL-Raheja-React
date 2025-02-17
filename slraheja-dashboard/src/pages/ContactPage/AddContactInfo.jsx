import React, { useState } from "react";
import { Box, Button, TextField, CircularProgress, Typography } from "@mui/material";
import { addContactInfo } from "../../Adapters/ApiAdapter";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddContactInfo = () => {
  const [formData, setFormData] = useState({
    full_address: "",
    phone: "",
    emergency_phone: "",
    tel: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = new FormData();
    requestData.append("full_address", formData.full_address);
    requestData.append("phone", formData.phone);
    requestData.append("emergency_phone", formData.emergency_phone);
    requestData.append("tel", formData.tel);
    requestData.append("email", formData.email);

    try {
      const response = await addContactInfo(requestData);
      if (response?.message) {
        toast.success("Contact info added successfully!");
        setFormData({
          full_address: "",
          phone: "",
          emergency_phone: "",
          tel: "",
          email: "",
        });
      } else {
        toast.error("Failed to add contact info. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while adding contact info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Add Contact Info
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Full Address"
            name="full_address"
            value={formData.full_address}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Emergency Phone"
            name="emergency_phone"
            value={formData.emergency_phone}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
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

export default AddContactInfo;
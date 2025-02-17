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
import { addHealthCheckupPackage } from "../../Adapters/ApiAdapter";

const AddHealthCheckupPackage = () => {
  const [formData, setFormData] = useState({
    checkup_name: "",
    package_img: null,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, package_img: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const packageData = new FormData();
    packageData.append("checkup_name", formData.checkup_name);
    if (formData.package_img) {
      packageData.append("package_img", formData.package_img);
    }

    try {
      const response = await addHealthCheckupPackage(packageData);
      if (response && response.message) {
        toast.success("Health Checkup Package added successfully!");
        setFormData({
          checkup_name: "",
          package_img: null,
        });
      } else {
        toast.error("Failed to add Health Checkup Package.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the package.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Add Health Checkup Package
      </Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          fullWidth
          margin="normal"
          label="Checkup Name"
          name="checkup_name"
          value={formData.checkup_name}
          onChange={handleInputChange}
          required
        />
        <Box mt={2}>
          <Typography variant="body1">Upload Package Image:</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: "20px" }}
        >
          {loading ? <CircularProgress size={24} /> : "Add Package"}
        </Button>
      </form>
    </Box>
  );
};

export default AddHealthCheckupPackage;
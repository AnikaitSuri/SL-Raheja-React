import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { addTechPatient } from "../../Adapters/ApiAdapter";
import { useNavigate } from "react-router-dom";

const AddTechPatient = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !content) {
      setError("Name and Content are required.");
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);
    if (blogImage) {
      formData.append("blog_img", blogImage);
    }

    try {
      const response = await addTechPatient(formData);
      console.log("Add response:", response);
      setSuccess("Tech Patient added successfully!");
      setTimeout(() => navigate("/tech-patients"), 2000); // Redirect after success
    } catch (err) {
      console.error("Error adding tech patient:", err);
      setError("Failed to add tech patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        Add Tech Patient
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      <Box display="flex" flexDirection="column" gap="16px" maxWidth="600px" mt="20px">
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Content"
          variant="outlined"
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          required
        />
        <Button variant="contained" component="label">
          Upload Blog Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setBlogImage(e.target.files[0])}
          />
        </Button>
        {blogImage && (
          <Typography variant="body2">Selected Image: {blogImage.name}</Typography>
        )}
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add Tech Patient"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddTechPatient;
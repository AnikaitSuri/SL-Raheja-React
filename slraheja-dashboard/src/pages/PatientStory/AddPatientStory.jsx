import React, { useState } from "react";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addPatientStory } from "../../Adapters/ApiAdapter";
import { useNavigate } from "react-router-dom";

const AddPatientStory = () => {
  const [name, setName] = useState("");
  const [heading, setHeading] = useState("");
  const [review, setReview] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !heading || !review) {
      toast.error("Name, Heading, and Review are required!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("heading", heading);
    formData.append("review", review);
    formData.append("video_link", videoLink);

    try {
      const response = await addPatientStory(formData);
      console.log("Add response:", response);
      toast.success("Patient story added successfully!");
      setTimeout(() => navigate("/patient-stories"), 2000); // Redirect after success
    } catch (err) {
      console.error("Error adding patient story:", err);
      toast.error("Failed to add patient story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Add Patient Story
      </Typography>
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
          label="Heading"
          variant="outlined"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Review"
          variant="outlined"
          multiline
          rows={4}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Video Link"
          variant="outlined"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          fullWidth
        />
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add Patient Story"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddPatientStory;
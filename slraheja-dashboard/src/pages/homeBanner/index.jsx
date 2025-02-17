import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { addBanner } from "../../Adapters/ApiAdapter.js";

const AddBanner = () => {
  const [name, setName] = useState("");
  const [bannerHeading, setBannerHeading] = useState("");
  const [bannerSubHeading, setBannerSubHeading] = useState("");
  const [bannerContent, setBannerContent] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFileChange = (e) => {
    setImgFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !bannerHeading || !bannerContent || !bannerSubHeading || !imgFile) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("banner_heading", bannerHeading);
    formData.append("banner_sub_heading", bannerSubHeading);
    formData.append("banner_content", bannerContent);
    formData.append("Img_path", imgFile);

    const response = await addBanner(formData);

    if (response.success) {
      setSuccess("Banner added successfully!");
      setError(null);
      // Reset form
      setName("");
      setBannerHeading("");
      setBannerSubHeading("");
      setBannerContent("");
      setImgFile(null);
    } else {
      setError(response.error || "Failed to add banner. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding={3}
    >
      <Typography variant="h4" gutterBottom>
        Add Banner
      </Typography>
      {error && <Alert severity="error" style={{ marginBottom: "16px" }}>{error}</Alert>}
      {success && <Alert severity="success" style={{ marginBottom: "16px" }}>{success}</Alert>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        width="400px"
        gap={2}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Banner Heading"
          variant="outlined"
          value={bannerHeading}
          onChange={(e) => setBannerHeading(e.target.value)}
        />
        <TextField
          label="Banner Sub-Heading"
          variant="outlined"
          value={bannerSubHeading}
          onChange={(e) => setBannerSubHeading(e.target.value)}
        />
        <TextField
          label="Banner Content"
          variant="outlined"
          multiline
          rows={4}
          value={bannerContent}
          onChange={(e) => setBannerContent(e.target.value)}
        />
        <Button
          variant="contained"
          component="label"
        >
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
        {imgFile && <Typography variant="body2">{imgFile.name}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Add Banner
        </Button>
      </Box>
    </Box>
  );
};

export default AddBanner;
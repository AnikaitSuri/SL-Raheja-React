import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDoctor, fetchSpecialtiesList } from "../../Adapters/ApiAdapter";

const AddDoctors = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    speciality_id: "",
    link: "",
  });
  const [specialities, setSpecialities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSpecialities, setLoadingSpecialities] = useState(true);

  // Fetch specialities on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSpecialtiesList();
        if (response && response.specialities) {
          setSpecialities(response.specialities);
        } else {
          toast.error("Failed to load specialities.");
        }
      } catch (error) {
        toast.error("Error fetching specialities.");
      } finally {
        setLoadingSpecialities(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const doctorData = new FormData();
    for (let key in formData) {
      doctorData.append(key, formData[key]);
    }

    try {
      const response = await addDoctor(doctorData);
      if (response && response.message) {
        toast.success("Doctor added successfully!");
        setFormData({
          name: "",
          description: "",
          speciality_id: "",
          link: "",
        });
      } else {
        toast.error("Failed to add doctor.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the doctor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box m="20px">
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Add Doctor
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
          required
        />
        {loadingSpecialities ? (
          <CircularProgress size={24} />
        ) : (
          <FormControl fullWidth margin="normal">
            <InputLabel id="speciality-label">Speciality</InputLabel>
            <Select
              labelId="speciality-label"
              name="speciality_id"
              value={formData.speciality_id}
              onChange={handleInputChange}
              required
            >
              {specialities.map((speciality) => (
                <MenuItem key={speciality.id} value={speciality.id}>
                  {speciality.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <TextField
          fullWidth
          margin="normal"
          label="Profile Image Link"
          name="link"
          value={formData.link}
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
          {loading ? <CircularProgress size={24} /> : "Add Doctor"}
        </Button>
      </form>
    </Box>
  );
};

export default AddDoctors;

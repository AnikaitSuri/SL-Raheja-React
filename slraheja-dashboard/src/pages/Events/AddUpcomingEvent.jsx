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
import { addUpcomingEvent } from "../../Adapters/ApiAdapter";

const AddUpcomingEvent = () => {
    const [formData, setFormData] = useState({
        name: "",
        event_type: "",
        event_date: "",
        heading: "",
        description: "",
        location: "",
    });
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const eventData = new FormData();
        eventData.append("name", formData.name);
        eventData.append("event_type", formData.event_type);
        eventData.append("event_date", formData.event_date);
        eventData.append("heading", formData.heading);
        eventData.append("description", formData.description);
        eventData.append("location", formData.location);

        try {
            const response = await addUpcomingEvent(eventData);
            if (response && response.message) {
                toast.success("Event added successfully!");
                setFormData({
                    name: "",
                    event_type: "",
                    event_date: "",
                    heading: "",
                    description: "",
                    location: "",
                });
            } else {
                toast.error("Failed to add event.");
            }
        } catch (error) {
            toast.error("An error occurred while adding the event.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box m="20px">
            <ToastContainer />
            <Typography variant="h4" gutterBottom>
                Add Upcoming Event
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
                    label="Event Type"
                    name="event_type"
                    value={formData.event_type}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Event Date"
                    name="event_date"
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={formData.event_date}
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
                    name="description"
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Location"
                    name="location"
                    value={formData.location}
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
                    {loading ? <CircularProgress size={24} /> : "Add Event"}
                </Button>
            </form>
        </Box>
    );
};

export default AddUpcomingEvent;
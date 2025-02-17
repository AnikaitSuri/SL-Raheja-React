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
import { addAcademicsProgramDetails } from "../../Adapters/ApiAdapter";

const AddAcademicsProgramDetails = () => {
    const [formData, setFormData] = useState({
        program_name: "",
        academic_program_category_id: "",
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const programData = new FormData();
        programData.append("program_name", formData.program_name);
        programData.append(
            "academic_program_category_id",
            formData.academic_program_category_id
        );

        try {
            const response = await addAcademicsProgramDetails(programData);
            if (response?.message) {
                toast.success("Program Details added successfully!");
                setFormData({ program_name: "", academic_program_category_id: "" });
            } else {
                toast.error("Failed to add Program Details.");
            }
        } catch (error) {
            toast.error("An error occurred while adding Program Details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box m="20px">
            <ToastContainer />
            <Typography variant="h4" gutterBottom>
                Add Academics Program Details
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Program Name"
                    name="program_name"
                    value={formData.program_name}
                    onChange={handleInputChange}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Academic Program Category ID"
                    name="academic_program_category_id"
                    value={formData.academic_program_category_id}
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
                    {loading ? <CircularProgress size={24} /> : "Add Program"}
                </Button>
            </form>
        </Box>
    );
};

export default AddAcademicsProgramDetails;
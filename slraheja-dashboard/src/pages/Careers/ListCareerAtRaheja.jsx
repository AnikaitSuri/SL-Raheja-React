import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress,
    Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
    fetchCareerAtRahejaList,
    editCareerAtRaheja,
    updateCareerAtRaheja,
    trashCareerAtRaheja,
} from "../../Adapters/ApiAdapter";

const ListCareerAtRaheja = () => {
    const [careerData, setCareerData] = useState([]); // List of career data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editData, setEditData] = useState(null); // State for the item being edited
    const [saving, setSaving] = useState(false); // State for saving edits
    const [deleteDataId, setDeleteDataId] = useState(null); // State for deleting an item
    const [newImage, setNewImage] = useState(null); // State for new image upload

    // Fetch Career Data List
    useEffect(() => {
        const loadCareerData = async () => {
            try {
                const response = await fetchCareerAtRahejaList();
                if (response?.data) {
                    setCareerData(response.data); // Set the fetched data
                } else {
                    setError("Failed to fetch Career at Raheja data.");
                }
            } catch (err) {
                setError("An error occurred while fetching Career at Raheja data.");
            } finally {
                setLoading(false);
            }
        };

        loadCareerData();
    }, []);

    // Handle Edit Click
    const handleEdit = async (id) => {
        try {
            const response = await editCareerAtRaheja(id);
            if (response?.data) {
                // Set the fetched data to the editData state
                setEditData({
                    id: response.data.id,
                    title: response.data.title,
                    heading: response.data.heading,
                    sub_heading: response.data.sub_heading,
                    content: response.data.content,
                    img: response.data.img, // Existing image path
                });
                setNewImage(null); // Reset the new image state
            } else {
                setError("Failed to fetch data for editing.");
            }
        } catch (err) {
            console.error("Error loading edit data:", err);
            setError("An error occurred while fetching edit data.");
        }
    };

    // Handle Save Edit
    const handleSaveEdit = async () => {
        setSaving(true);

        const formData = new FormData();
        formData.append("title", editData.title);
        formData.append("heading", editData.heading);
        formData.append("sub_heading", editData.sub_heading);
        formData.append("content", editData.content);
        if (newImage) formData.append("img", newImage);

        try {
            const response = await updateCareerAtRaheja(editData.id, formData);
            if (response?.message) {
                // Replace the updated data in the list
                setCareerData((prevData) =>
                    prevData.map((item) =>
                        item.id === editData.id ? { ...item, ...editData } : item
                    )
                );
                setEditData(null); // Close the dialog
                setError(null); // Reset error
            } else {
                setError("Failed to save changes.");
            }
        } catch (err) {
            console.error("Error saving edit:", err);
            setError("An error occurred while saving changes.");
        } finally {
            setSaving(false);
        }
    };

    // Handle Delete
    const handleDelete = async (id) => {
        try {
            await trashCareerAtRaheja(id);
            // Remove the deleted item from the list
            setCareerData((prevData) => prevData.filter((item) => item.id !== id));
            setDeleteDataId(null);
        } catch (err) {
            console.error("Error deleting Career at Raheja data:", err);
        }
    };

    // DataGrid Columns
    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "title", headerName: "Title", width: 200 },
        { field: "heading", headerName: "Heading", width: 200 },
        { field: "sub_heading", headerName: "Sub Heading", width: 200 },
        { field: "content", headerName: "Content", width: 300 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(params.row.id)} // Open the edit dialog
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => setDeleteDataId(params.row.id)} // Open delete confirmation
                        style={{ marginLeft: "8px" }}
                    >
                        Trash
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Typography variant="h4" gutterBottom>
                Career at Raheja List
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <DataGrid rows={careerData} columns={columns} autoHeight />
            )}

            {/* Edit Dialog */}
            {editData && (
                <Dialog open onClose={() => setEditData(null)}>
                    <DialogTitle>Edit Career at Raheja</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Title"
                            value={editData.title || ""}
                            onChange={(e) =>
                                setEditData({ ...editData, title: e.target.value })
                            }
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Heading"
                            value={editData.heading || ""}
                            onChange={(e) =>
                                setEditData({ ...editData, heading: e.target.value })
                            }
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Sub Heading"
                            value={editData.sub_heading || ""}
                            onChange={(e) =>
                                setEditData({ ...editData, sub_heading: e.target.value })
                            }
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Content"
                            multiline
                            rows={4}
                            value={editData.content || ""}
                            onChange={(e) =>
                                setEditData({ ...editData, content: e.target.value })
                            }
                        />
                        <Button variant="contained" component="label">
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => setNewImage(e.target.files[0])}
                            />
                        </Button>
                        {newImage && <Typography mt={1}>{newImage.name}</Typography>}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditData(null)}>Cancel</Button>
                        <Button
                            variant="contained"
                            onClick={handleSaveEdit}
                            disabled={saving}
                        >
                            {saving ? <CircularProgress size={24} /> : "Save"}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Delete Confirmation */}
            {deleteDataId && (
                <Dialog open onClose={() => setDeleteDataId(null)}>
                    <DialogTitle>Delete Confirmation</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this entry?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteDataId(null)}>Cancel</Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(deleteDataId)}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default ListCareerAtRaheja;
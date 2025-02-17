import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    CircularProgress,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    fetchSpecialtiesList,
    editSpecialty,
    updateSpecialty,
    trashSpecialty,
} from "../../Adapters/ApiAdapter";

const ListSpecialties = () => {
    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editSpecialtyItem, setEditSpecialtyItem] = useState(null);
    const [deleteSpecialtyId, setDeleteSpecialtyId] = useState(null);
    const [loadingAction, setLoadingAction] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSpecialtiesList();
                console.log("Fetched specialties:", data); // Debugging fetched data
                setSpecialties(data.specialities);
            } catch (error) {
                toast.error("Failed to fetch specialties.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = async (id) => {
        try {
            const response = await editSpecialty(id);
            setEditSpecialtyItem(response);
        } catch (error) {
            toast.error("Failed to fetch specialty for editing.");
        }
    };

    const handleSaveEdit = async () => {
        setLoadingAction(true);
        const formData = new FormData();
        for (let key in editSpecialtyItem) {
            formData.append(key, editSpecialtyItem[key]);
        }

        try {
            await updateSpecialty(editSpecialtyItem.id, formData);
            toast.success("Specialty updated successfully!");
            setSpecialties((prev) =>
                prev.map((item) =>
                    item.id === editSpecialtyItem.id
                        ? { ...item, ...editSpecialtyItem }
                        : item
                )
            );
            setEditSpecialtyItem(null);
        } catch (error) {
            toast.error("Failed to save specialty.");
        } finally {
            setLoadingAction(false);
        }
    };

    const handleDelete = async (id) => {
        setLoadingAction(true);
        try {
            await trashSpecialty(id);
            toast.success("Specialty deleted successfully!");
            setSpecialties((prev) => prev.filter((item) => item.id !== id));
            setDeleteSpecialtyId(null);
        } catch (error) {
            toast.error("Failed to delete specialty.");
        } finally {
            setLoadingAction(false);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Name", width: 200 },
        {
            field: "description",
            headerName: "Description",
            width: 250,
            valueGetter: (params) => params.row.description || "N/A", // Handle null descriptions
        },
        { field: "status", headerName: "Status", width: 150 },
        { field: "extra", headerName: "Extra", width: 150 },
        {
            field: "link",
            headerName: "Profile Link",
            width: 250,
            renderCell: (params) =>
                params.row.link ? (
                    <a href={params.row.link} target="_blank" rel="noopener noreferrer">
                        View Link
                    </a>
                ) : (
                    "No Link"
                ),
        },
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
                        onClick={() => handleEdit(params.row.id)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => setDeleteSpecialtyId(params.row.id)}
                        style={{ marginLeft: "8px" }}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <Box m="20px">
            <ToastContainer />
            <Typography variant="h4" gutterBottom>
                Specialties List
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <DataGrid rows={specialties} columns={columns} autoHeight />
            )}
            {editSpecialtyItem && (
                <Dialog open onClose={() => setEditSpecialtyItem(null)}>
                    <DialogTitle>Edit Specialty</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Name"
                            value={editSpecialtyItem.name}
                            onChange={(e) =>
                                setEditSpecialtyItem({
                                    ...editSpecialtyItem,
                                    name: e.target.value,
                                })
                            }
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Description"
                            value={editSpecialtyItem.description}
                            onChange={(e) =>
                                setEditSpecialtyItem({
                                    ...editSpecialtyItem,
                                    description: e.target.value,
                                })
                            }
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Extra"
                            value={editSpecialtyItem.extra}
                            onChange={(e) =>
                                setEditSpecialtyItem({
                                    ...editSpecialtyItem,
                                    extra: e.target.value,
                                })
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditSpecialtyItem(null)}>Cancel</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSaveEdit}
                            disabled={loadingAction}
                        >
                            {loadingAction ? <CircularProgress size={24} /> : "Save"}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            {deleteSpecialtyId && (
                <Dialog open onClose={() => setDeleteSpecialtyId(null)}>
                    <DialogTitle>Delete Confirmation</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this specialty?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteSpecialtyId(null)}>Cancel</Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(deleteSpecialtyId)}
                            disabled={loadingAction}
                        >
                            {loadingAction ? <CircularProgress size={24} /> : "Confirm"}
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default ListSpecialties;

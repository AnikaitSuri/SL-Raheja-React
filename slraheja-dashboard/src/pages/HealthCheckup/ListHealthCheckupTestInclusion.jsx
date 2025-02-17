import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    fetchHealthCheckupTestInclusions,
    editHealthCheckupTestInclusion,
    updateHealthCheckupTestInclusion,
    trashHealthCheckupTestInclusion,
} from "../../Adapters/ApiAdapter";

const ListHealthCheckupTestInclusion = () => {
    const [testInclusions, setTestInclusions] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAction, setLoadingAction] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchHealthCheckupTestInclusions();
                setTestInclusions(response.data || []);
            } catch (err) {
                toast.error("Failed to fetch Test Inclusions.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = async (id) => {
        try {
            const response = await editHealthCheckupTestInclusion(id);
            setEditItem(response.data);
        } catch (err) {
            toast.error("Failed to load data for editing.");
        }
    };

    const handleSaveEdit = async () => {
        setLoadingAction(true);

        try {
            const response = await updateHealthCheckupTestInclusion(editItem.id, editItem);
            toast.success("Test Inclusion updated successfully!");
            setTestInclusions((prev) =>
                prev.map((item) =>
                    item.id === editItem.id ? { ...item, ...response.data } : item
                )
            );
            setEditItem(null);
        } catch (err) {
            toast.error("Failed to save changes.");
        } finally {
            setLoadingAction(false);
        }
    };

    const handleDelete = async (id) => {
        setLoadingAction(true);
        try {
            await trashHealthCheckupTestInclusion(id);
            toast.success("Test Inclusion deleted successfully!");
            setTestInclusions((prev) => prev.filter((item) => item.id !== id));
            setDeleteItemId(null);
        } catch (err) {
            toast.error("Failed to delete Test Inclusion.");
        } finally {
            setLoadingAction(false);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "inclusion_name", headerName: "Inclusion Name", width: 300 },
        { field: "test_name", headerName: "Test Name", width: 200 },
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
                        onClick={() => setDeleteItemId(params.row.id)}
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
                Health Checkup Test Inclusions List
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : (
                <DataGrid
                    rows={testInclusions.map((item) => ({ ...item, id: item.id }))}
                    columns={columns}
                    autoHeight
                />
            )}

            {/* Edit Dialog */}
            {editItem && (
                <Dialog open onClose={() => setEditItem(null)}>
                    <DialogTitle>Edit Test Inclusion</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Inclusion Name"
                            value={editItem.inclusion_name}
                            onChange={(e) =>
                                setEditItem({ ...editItem, inclusion_name: e.target.value })
                            }
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Test ID"
                            value={editItem.test_id}
                            onChange={(e) =>
                                setEditItem({ ...editItem, test_id: e.target.value })
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditItem(null)}>Cancel</Button>
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

            {/* Delete Confirmation Dialog */}
            {deleteItemId && (
                <Dialog open onClose={() => setDeleteItemId(null)}>
                    <DialogTitle>Delete Confirmation</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this Test Inclusion?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteItemId(null)}>Cancel</Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(deleteItemId)}
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

export default ListHealthCheckupTestInclusion;
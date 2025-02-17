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
    fetchAcademicsProgramDetails,
    editAcademicsProgramDetails,
    updateAcademicsProgramDetails,
    trashAcademicsProgramDetails,
} from "../../Adapters/ApiAdapter";

const ListAcademicsProgramDetails = () => {
    const [programs, setPrograms] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingAction, setLoadingAction] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAcademicsProgramDetails();
                setPrograms(response.data || []);
            } catch (err) {
                toast.error("Failed to fetch Academics Program Details.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = async (id) => {
        try {
            const response = await editAcademicsProgramDetails(id);
            setEditItem(response.data);
        } catch (err) {
            toast.error("Failed to load data for editing.");
        }
    };

    const handleSaveEdit = async () => {
        setLoadingAction(true);

        const formData = new FormData();
        formData.append("program_name", editItem.program_name);
        formData.append(
            "academic_program_category_id",
            editItem.academic_program_category_id
        );

        try {
            const response = await updateAcademicsProgramDetails(editItem.id, formData);
            toast.success("Program Details updated successfully!");
            setPrograms((prev) =>
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
            await trashAcademicsProgramDetails(id);
            toast.success("Program Details deleted successfully!");
            setPrograms((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            toast.error("Failed to delete Program Details.");
        } finally {
            setLoadingAction(false);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "program_name", headerName: "Program Name", width: 300 },
        { field: "academic_program_category_id", headerName: "Category ID", width: 200 },
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
                        onClick={() => handleDelete(params.row.id)}
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
                Academics Program Details List
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : (
                <DataGrid
                    rows={programs.map((item) => ({ ...item, id: item.id }))}
                    columns={columns}
                    autoHeight
                />
            )}

            {/* Edit Dialog */}
            {editItem && (
                <Dialog open onClose={() => setEditItem(null)}>
                    <DialogTitle>Edit Program Details</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Program Name"
                            value={editItem.program_name}
                            onChange={(e) =>
                                setEditItem({ ...editItem, program_name: e.target.value })
                            }
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Category ID"
                            value={editItem.academic_program_category_id}
                            onChange={(e) =>
                                setEditItem({
                                    ...editItem,
                                    academic_program_category_id: e.target.value,
                                })
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
        </Box>
    );
};

export default ListAcademicsProgramDetails;

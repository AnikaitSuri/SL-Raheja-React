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
  fetchAcademicsOverview,
  editAcademicsOverview,
  updateAcademicsOverview,
  trashAcademicsOverview,
} from "../../Adapters/ApiAdapter";

const ListAcademicsOverview = () => {
  const [overview, setOverview] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAcademicsOverview();
        setOverview([response.data]);
      } catch (err) {
        toast.error("Failed to fetch Academics Overview.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await editAcademicsOverview(id);
      setEditItem(response.data);
    } catch (err) {
      toast.error("Failed to load data for editing.");
    }
  };

  const handleSaveEdit = async () => {
    setLoadingAction(true);

    const formData = new FormData();
    formData.append("heading", editItem.heading);
    formData.append("content", editItem.content);

    try {
      const response = await updateAcademicsOverview(editItem.id, formData);
      toast.success("Academics Overview updated successfully!");
      setOverview((prev) =>
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
      await trashAcademicsOverview(id);
      toast.success("Academics Overview deleted successfully!");
      setOverview([]);
    } catch (err) {
      toast.error("Failed to delete Academics Overview.");
    } finally {
      setLoadingAction(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "heading", headerName: "Heading", width: 200 },
    { field: "content", headerName: "Content", width: 400 },
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
        Academics Overview List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid rows={overview.map((item) => ({ ...item, id: item.id }))} columns={columns} autoHeight />
      )}

      {/* Edit Dialog */}
      {editItem && (
        <Dialog open onClose={() => setEditItem(null)}>
          <DialogTitle>Edit Academics Overview</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Heading"
              value={editItem.heading}
              onChange={(e) =>
                setEditItem({ ...editItem, heading: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Content"
              multiline
              rows={4}
              value={editItem.content}
              onChange={(e) =>
                setEditItem({ ...editItem, content: e.target.value })
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

export default ListAcademicsOverview;
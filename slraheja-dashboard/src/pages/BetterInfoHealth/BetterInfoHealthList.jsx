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
  fetchBetterInfoHealthList,
  editBetterInfoHealth,
  updateBetterInfoHealth,
  trashBetterInfoHealth,
} from "../../Adapters/ApiAdapter";

const BetterInfoHealthList = () => {
  const [infoHealth, setInfoHealth] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBetterInfoHealthList();
        setInfoHealth(response.data || []);
      } catch (err) {
        toast.error("Failed to fetch Better Info Better Health list.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await editBetterInfoHealth(id);
      setEditItem(response.data);
    } catch (err) {
      toast.error("Failed to load item data for editing.");
    }
  };

  const handleSaveEdit = async () => {
    setLoadingAction(true);

    const formData = new FormData();
    formData.append("title", editItem.title);
    formData.append("heading", editItem.heading);
    formData.append("decription", editItem.decription);
    formData.append("content", editItem.content);
    formData.append("date", editItem.date);
    formData.append("source_page", editItem.source_page);
    formData.append("status", editItem.status);

    try {
      const response = await updateBetterInfoHealth(editItem.id, formData);
      toast.success("Info Health updated successfully!");
      setInfoHealth((prev) =>
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
      await trashBetterInfoHealth(id);
      toast.success("Item deleted successfully!");
      setInfoHealth((prev) => prev.filter((item) => item.id !== id));
      setDeleteItemId(null);
    } catch (err) {
      toast.error("Failed to delete item.");
    } finally {
      setLoadingAction(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "heading", headerName: "Heading", width: 200 },
    { field: "decription", headerName: "Description", width: 300 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "source_page", headerName: "Source Page", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
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
        Better Info Better Health List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid rows={infoHealth} columns={columns} autoHeight />
      )}

      {/* Edit Dialog */}
      {editItem && (
        <Dialog open onClose={() => setEditItem(null)}>
          <DialogTitle>Edit Better Info Health</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              value={editItem.title}
              onChange={(e) =>
                setEditItem({ ...editItem, title: e.target.value })
              }
            />
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
              label="Description"
              multiline
              rows={3}
              value={editItem.decription}
              onChange={(e) =>
                setEditItem({ ...editItem, decription: e.target.value })
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
            <TextField
              fullWidth
              margin="normal"
              label="Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={editItem.date}
              onChange={(e) =>
                setEditItem({ ...editItem, date: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Source Page"
              value={editItem.source_page}
              onChange={(e) =>
                setEditItem({ ...editItem, source_page: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Status"
              value={editItem.status}
              onChange={(e) =>
                setEditItem({ ...editItem, status: e.target.value })
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
            Are you sure you want to delete this item?
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

export default BetterInfoHealthList;
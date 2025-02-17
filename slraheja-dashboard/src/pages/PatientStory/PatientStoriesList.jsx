import React, { useEffect, useState } from "react";
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
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  fetchPatientStories,
  editPatientStory,
  updatePatientStory,
  trashPatientStory,
} from "../../Adapters/ApiAdapter";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientStoriesList = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editStory, setEditStory] = useState(null); // Story to edit
  const [deleteStoryId, setDeleteStoryId] = useState(null); // Story to delete
  const [loadingAction, setLoadingAction] = useState(false); // Loading state for actions

  // Fetch stories on component mount
  useEffect(() => {
    const loadStories = async () => {
      try {
        const response = await fetchPatientStories();
        if (response?.data) {
          setStories(response.data);
        } else {
          setError("Failed to fetch patient stories.");
        }
      } catch (err) {
        setError("An error occurred while fetching patient stories.");
      } finally {
        setLoading(false);
      }
    };

    loadStories();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await editPatientStory(id);
      setEditStory(response.data);
    } catch (err) {
      console.error("Error loading edit data:", err);
      toast.error("Failed to load story for editing.");
    }
  };

  const handleSaveEdit = async () => {
    const formData = new FormData();
    formData.append("name", editStory.name);
    formData.append("heading", editStory.heading);
    formData.append("review", editStory.review);
    formData.append("video_link", editStory.video_link);

    setLoadingAction(true);

    try {
      const response = await updatePatientStory(editStory.id, formData);
      console.log("Edit response:", response);
      toast.success("Patient story updated successfully!");
      setEditStory(null); // Close dialog
      setStories((prev) =>
        prev.map((story) => (story.id === editStory.id ? response.data : story))
      );
    } catch (err) {
      console.error("Error saving edit:", err);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async (id) => {
    setLoadingAction(true);

    try {
      const response = await trashPatientStory(id);
      console.log("Delete response:", response);
      toast.success("Patient story deleted successfully!");
      setStories((prev) => prev.filter((story) => story.id !== id));
      setDeleteStoryId(null); // Close dialog
    } catch (err) {
      console.error("Error deleting story:", err);
      toast.error("Failed to delete story. Please try again.");
    } finally {
      setLoadingAction(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "heading", headerName: "Heading", width: 250 },
    { field: "review", headerName: "Review", width: 300 },
    { field: "video_link", headerName: "Video Link", width: 300 },
    {
      field: "created_at",
      headerName: "Created At",
      width: 200,
      valueFormatter: (params) =>
        dayjs(params.value).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
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
            onClick={() => setDeleteStoryId(params.row.id)}
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
        Patient Stories List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <DataGrid rows={stories} columns={columns} autoHeight />
      )}

      {/* Edit Dialog */}
      {editStory && (
        <Dialog open onClose={() => setEditStory(null)}>
          <DialogTitle>Edit Patient Story</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              value={editStory.name}
              onChange={(e) =>
                setEditStory({ ...editStory, name: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Heading"
              value={editStory.heading}
              onChange={(e) =>
                setEditStory({ ...editStory, heading: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Review"
              multiline
              rows={4}
              value={editStory.review}
              onChange={(e) =>
                setEditStory({ ...editStory, review: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Video Link"
              value={editStory.video_link}
              onChange={(e) =>
                setEditStory({ ...editStory, video_link: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditStory(null)}>Cancel</Button>
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
      {deleteStoryId && (
        <Dialog open onClose={() => setDeleteStoryId(null)}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this patient story?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteStoryId(null)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(deleteStoryId)}
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

export default PatientStoriesList;
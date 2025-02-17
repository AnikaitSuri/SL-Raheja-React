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
  fetchTechPatients,
  editTechPatient,
  updateTechPatient,
  trashTechPatient,
} from "../../Adapters/ApiAdapter";
import dayjs from "dayjs";

const TechPatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPatient, setEditPatient] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [deletePatientId, setDeletePatientId] = useState(null);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const response = await fetchTechPatients();
        if (response?.data) {
          setPatients(response.data);
        } else {
          setError("Failed to fetch tech patients.");
        }
      } catch (err) {
        setError("An error occurred while fetching tech patients.");
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await editTechPatient(id);
      setEditPatient(response.data);
      setNewImage(null); // Reset new image
    } catch (err) {
      console.error("Error loading edit data:", err);
    }
  };

  const handleSaveEdit = async () => {
    const formData = new FormData();
    formData.append("name", editPatient.name);
    formData.append("content", editPatient.content);
    if (newImage) formData.append("blog_img", newImage);

    try {
      const response = await updateTechPatient(editPatient.id, formData);
      console.log("Edit response:", response);
      setEditPatient(null);
    } catch (err) {
      console.error("Error saving edit:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await trashTechPatient(id);
      console.log("Delete response:", response);
      setDeletePatientId(null);
    } catch (err) {
      console.error("Error deleting tech patient:", err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "source_page", headerName: "Source Page", width: 150 },
    { field: "content", headerName: "Content", width: 300 },
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
            onClick={() => setDeletePatientId(params.row.id)}
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
        Tech Patients List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <DataGrid rows={patients} columns={columns} autoHeight />
      )}

      {/* Edit Dialog */}
      {editPatient && (
        <Dialog open onClose={() => setEditPatient(null)}>
          <DialogTitle>Edit Patient</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              value={editPatient.name}
              onChange={(e) =>
                setEditPatient({ ...editPatient, name: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Content"
              multiline
              rows={4}
              value={editPatient.content}
              onChange={(e) =>
                setEditPatient({ ...editPatient, content: e.target.value })
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
            <Button onClick={() => setEditPatient(null)}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveEdit}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation */}
      {deletePatientId && (
        <Dialog open onClose={() => setDeletePatientId(null)}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this tech patient?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeletePatientId(null)}>Cancel</Button>
            <Button variant="contained" color="error" onClick={() => handleDelete(deletePatientId)}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default TechPatientsList;

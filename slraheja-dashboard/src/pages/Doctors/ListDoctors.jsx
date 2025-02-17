import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchDoctorsList, trashDoctor, editDoctor } from "../../Adapters/ApiAdapter";

const ListDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editDoctorItem, setEditDoctorItem] = useState(null);
  const [deleteDoctorId, setDeleteDoctorId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);

  // Fetch doctors list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDoctorsList();
        setDoctors(response.data || []);
      } catch (err) {
        toast.error("Failed to fetch doctors list.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle edit button click
  const handleEdit = async (id) => {
    try {
      const response = await editDoctor(id); // Fetch doctor details for editing
      setEditDoctorItem(response.data);
    } catch (err) {
      toast.error("Failed to load doctor data for editing.");
    }
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    setLoadingAction(true);

    const formData = new FormData();
    formData.append("name", editDoctorItem.name);
    formData.append("description", editDoctorItem.description);
    formData.append("speciality_id", editDoctorItem.speciality_id);
    formData.append("link", editDoctorItem.link);

    try {
      await editDoctor(editDoctorItem.id, formData); // Use the same editDoctor API to update
      toast.success("Doctor updated successfully!");
      setDoctors((prev) =>
        prev.map((item) =>
          item.id === editDoctorItem.id ? { ...item, ...editDoctorItem } : item
        )
      );
      setEditDoctorItem(null);
    } catch (err) {
      toast.error("Failed to save doctor changes.");
    } finally {
      setLoadingAction(false);
    }
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    setLoadingAction(true);
    try {
      await trashDoctor(id);
      toast.success("Doctor deleted successfully!");
      setDoctors((prev) => prev.filter((item) => item.id !== id));
      setDeleteDoctorId(null);
    } catch (err) {
      toast.error("Failed to delete doctor.");
    } finally {
      setLoadingAction(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "speciality",
      headerName: "Speciality",
      width: 200,
      renderCell: (params) => params.value.join(", "),
    },
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
            onClick={() => setDeleteDoctorId(params.row.id)}
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
        Doctors List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid rows={doctors} columns={columns} autoHeight />
      )}

      {/* Edit Dialog */}
      {editDoctorItem && (
        <Dialog open onClose={() => setEditDoctorItem(null)}>
          <DialogTitle>Edit Doctor</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              value={editDoctorItem.name}
              onChange={(e) =>
                setEditDoctorItem({ ...editDoctorItem, name: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              value={editDoctorItem.description}
              onChange={(e) =>
                setEditDoctorItem({
                  ...editDoctorItem,
                  description: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Speciality ID"
              type="number"
              value={editDoctorItem.speciality_id}
              onChange={(e) =>
                setEditDoctorItem({
                  ...editDoctorItem,
                  speciality_id: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Profile Image Link"
              value={editDoctorItem.link}
              onChange={(e) =>
                setEditDoctorItem({ ...editDoctorItem, link: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDoctorItem(null)}>Cancel</Button>
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
      {deleteDoctorId && (
        <Dialog open onClose={() => setDeleteDoctorId(null)}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this doctor?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDoctorId(null)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(deleteDoctorId)}
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

export default ListDoctors;
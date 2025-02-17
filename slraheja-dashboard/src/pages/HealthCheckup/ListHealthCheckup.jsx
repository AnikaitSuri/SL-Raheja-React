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
  fetchHealthCheckupList,
  editHealthCheckup,
  updateHealthCheckup,
  trashHealthCheckup,
} from "../../Adapters/ApiAdapter";

const ListHealthCheckup = () => {
  const [healthCheckups, setHealthCheckups] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  // Fetch the list of health checkups
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchHealthCheckupList();
        setHealthCheckups(response.data || []);
      } catch (err) {
        toast.error("Failed to fetch health checkups.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle edit click
  const handleEdit = async (id) => {
    try {
      const response = await editHealthCheckup(id);
      setEditItem(response.data[0]); // Load the data of the selected health checkup
    } catch (err) {
      toast.error("Failed to load data for editing.");
    }
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    setLoadingAction(true);

    const formData = new FormData();
    formData.append("heading", editItem.heading);
    formData.append("checkup_fees", editItem.checkup_fees);
    formData.append("checkup_title", editItem.checkup_title);
    formData.append("email", editItem.email);
    formData.append("phone", editItem.phone);
    formData.append("contact_person", editItem.contact_person);

    try {
      const response = await updateHealthCheckup(editItem.checkup_id, formData);
      toast.success("Health Checkup updated successfully!");
      setHealthCheckups((prev) =>
        prev.map((item) =>
          item.checkup_id === editItem.checkup_id ? { ...item, ...response.data } : item
        )
      );
      setEditItem(null); // Close the edit dialog
    } catch (err) {
      toast.error("Failed to save changes.");
    } finally {
      setLoadingAction(false);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    setLoadingAction(true);
    try {
      await trashHealthCheckup(id);
      toast.success("Health Checkup deleted successfully!");
      setHealthCheckups((prev) => prev.filter((item) => item.checkup_id !== id));
      setDeleteItemId(null); // Close the delete confirmation dialog
    } catch (err) {
      toast.error("Failed to delete health checkup.");
    } finally {
      setLoadingAction(false);
    }
  };

  const columns = [
    { field: "checkup_id", headerName: "ID", width: 100 },
    { field: "heading", headerName: "Heading", width: 200 },
    { field: "checkup_fees", headerName: "Fees", width: 150 },
    { field: "checkup_title", headerName: "Title", width: 200 },
    { field: "contact_person", headerName: "Contact Person", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
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
            onClick={() => handleEdit(params.row.checkup_id)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => setDeleteItemId(params.row.checkup_id)}
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
        Health Checkup List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={healthCheckups}
          columns={columns}
          autoHeight
          getRowId={(row) => row.checkup_id} // Map `checkup_id` as the unique row ID
        />
      )}

      {/* Edit Dialog */}
      {editItem && (
        <Dialog open onClose={() => setEditItem(null)}>
          <DialogTitle>Edit Health Checkup</DialogTitle>
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
              label="Title"
              value={editItem.checkup_title}
              onChange={(e) =>
                setEditItem({ ...editItem, checkup_title: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Fees"
              value={editItem.checkup_fees}
              onChange={(e) =>
                setEditItem({ ...editItem, checkup_fees: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={editItem.email}
              onChange={(e) =>
                setEditItem({ ...editItem, email: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              value={editItem.phone}
              onChange={(e) =>
                setEditItem({ ...editItem, phone: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Contact Person"
              value={editItem.contact_person}
              onChange={(e) =>
                setEditItem({ ...editItem, contact_person: e.target.value })
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
            Are you sure you want to delete this health checkup?
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

export default ListHealthCheckup;

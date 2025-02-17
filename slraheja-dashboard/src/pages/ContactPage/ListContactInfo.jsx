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
  fetchContactInfoList,
  editContactInfo,
  updateContactInfo,
  trashContactInfo,
} from "../../Adapters/ApiAdapter";

const ListContactInfo = () => {
  const [contactInfo, setContactInfo] = useState([]); // List of contact info
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editInfo, setEditInfo] = useState(null); // State for the item being edited
  const [saving, setSaving] = useState(false); // State for saving edits
  const [deleteInfoId, setDeleteInfoId] = useState(null); // State for deleting an item

  // Fetch Contact Info List
  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const response = await fetchContactInfoList();
        if (response?.data) {
          setContactInfo([response.data]); // Wrap single object in an array for DataGrid
        } else {
          setError("Failed to fetch contact information.");
        }
      } catch (err) {
        setError("An error occurred while fetching contact information.");
      } finally {
        setLoading(false);
      }
    };

    loadContactInfo();
  }, []);

  // Handle Edit Click
  const handleEdit = async (id) => {
    try {
      const response = await editContactInfo(id);
      if (response?.data) {
        setEditInfo(response.data); // Pre-fill the edit dialog with fetched data
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
    formData.append("full_address", editInfo.full_address);
    formData.append("phone", editInfo.phone);
    formData.append("emergency_phone", editInfo.emergency_phone);
    formData.append("tel", editInfo.tel);
    formData.append("email", editInfo.email);

    try {
      const response = await updateContactInfo(editInfo.id, formData);
      if (response?.message) {
        // Replace the updated data in the list
        setContactInfo((prevInfo) =>
          prevInfo.map((info) =>
            info.id === editInfo.id ? { ...info, ...editInfo } : info
          )
        );
        setEditInfo(null); // Close the dialog
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
      await trashContactInfo(id);
      setContactInfo([]); // Remove the deleted entry
      setDeleteInfoId(null);
    } catch (err) {
      console.error("Error deleting contact info:", err);
    }
  };

  // DataGrid Columns
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "full_address", headerName: "Full Address", width: 300 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "emergency_phone", headerName: "Emergency Phone", width: 150 },
    { field: "tel", headerName: "Tel", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
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
            onClick={() => setDeleteInfoId(params.row.id)} // Open delete confirmation
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
        Contact Info List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <DataGrid
          rows={contactInfo}
          columns={columns}
          autoHeight
          getRowId={(row) => row.id}
        />
      )}

      {/* Edit Dialog */}
      {editInfo && (
        <Dialog open onClose={() => setEditInfo(null)}>
          <DialogTitle>Edit Contact Info</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Full Address"
              value={editInfo.full_address || ""}
              onChange={(e) =>
                setEditInfo({ ...editInfo, full_address: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              value={editInfo.phone || ""}
              onChange={(e) =>
                setEditInfo({ ...editInfo, phone: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Emergency Phone"
              value={editInfo.emergency_phone || ""}
              onChange={(e) =>
                setEditInfo({ ...editInfo, emergency_phone: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Tel"
              value={editInfo.tel || ""}
              onChange={(e) =>
                setEditInfo({ ...editInfo, tel: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={editInfo.email || ""}
              onChange={(e) =>
                setEditInfo({ ...editInfo, email: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditInfo(null)}>Cancel</Button>
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
      {deleteInfoId && (
        <Dialog open onClose={() => setDeleteInfoId(null)}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this contact info?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteInfoId(null)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(deleteInfoId)}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ListContactInfo;

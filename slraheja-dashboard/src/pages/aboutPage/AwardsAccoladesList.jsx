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
  fetchAwardsAccoladesList,
  editAwardsAccolade,
  updateAwardsAccolade,
  trashAwardsAccolade,
} from "../../Adapters/ApiAdapter";

const AwardsAccoladesList = () => {
  const [awards, setAwards] = useState([]); // List of awards and accolades
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editAward, setEditAward] = useState(null); // State for the item being edited
  const [newImage, setNewImage] = useState(null); // State for new image upload
  const [deleteAwardId, setDeleteAwardId] = useState(null); // State for deleting an item
  const [saving, setSaving] = useState(false); // State for saving edits

  // Fetch Awards and Accolades List
  useEffect(() => {
    const loadAwards = async () => {
      try {
        const response = await fetchAwardsAccoladesList();
        if (response?.data) {
          setAwards(response.data);
        } else {
          setError("Failed to fetch awards and accolades.");
        }
      } catch (err) {
        setError("An error occurred while fetching awards and accolades.");
      } finally {
        setLoading(false);
      }
    };

    loadAwards();
  }, []);

  // Handle Edit Click
  const handleEdit = async (id) => {
    try {
      const response = await editAwardsAccolade(id);
      if (response?.data.length > 0) {
        setEditAward(response.data[0]); // Pre-fill the edit dialog with the fetched data
        setNewImage(null); // Reset new image
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
    formData.append("heading", editAward.heading);
    formData.append("sub_heading", editAward.sub_heading);
    if (newImage) formData.append("img", newImage);

    try {
      const response = await updateAwardsAccolade(editAward.id, formData);
      if (response?.data) {
        // Update the awards list with the new data
        setAwards((prevAwards) =>
          prevAwards.map((award) =>
            award.id === editAward.id ? response.data : award
          )
        );
        setEditAward(null); // Close the dialog
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
      await trashAwardsAccolade(id);
      // Remove the deleted item from the awards list
      setAwards((prevAwards) => prevAwards.filter((award) => award.id !== id));
      setDeleteAwardId(null);
    } catch (err) {
      console.error("Error deleting award or accolade:", err);
    }
  };

  // DataGrid Columns
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "heading", headerName: "Heading", width: 200 },
    { field: "sub_heading", headerName: "Sub Heading", width: 200 },
    { field: "source_page", headerName: "Source Page", width: 150 },
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
            onClick={() => handleEdit(params.row.id)} // Open the edit dialog
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => setDeleteAwardId(params.row.id)} // Open delete confirmation
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
        Awards and Accolades List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <DataGrid rows={awards} columns={columns} autoHeight />
      )}

      {/* Edit Dialog */}
      {editAward && (
        <Dialog open onClose={() => setEditAward(null)}>
          <DialogTitle>Edit Award or Accolade</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Heading"
              value={editAward.heading || ""}
              onChange={(e) =>
                setEditAward({ ...editAward, heading: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Sub Heading"
              value={editAward.sub_heading || ""}
              onChange={(e) =>
                setEditAward({ ...editAward, sub_heading: e.target.value })
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
            <Button onClick={() => setEditAward(null)}>Cancel</Button>
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
      {deleteAwardId && (
        <Dialog open onClose={() => setDeleteAwardId(null)}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this award or accolade?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteAwardId(null)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(deleteAwardId)}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default AwardsAccoladesList;
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
  fetchWhyChooseRahejaList,
  editWhyChooseRaheja,
  updateWhyChooseRaheja,
  deleteWhyChooseRaheja,
} from "../../Adapters/ApiAdapter";

const WhyChooseRahejaList = () => {
  const [rahejaList, setRahejaList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchWhyChooseRahejaList();
        setRahejaList(response.data || []);
      } catch (err) {
        toast.error("Failed to fetch the list.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await editWhyChooseRaheja(id);
      setEditItem(response.data);
    } catch (err) {
      toast.error("Failed to load item data for editing.");
    }
  };

  const handleSaveEdit = async () => {
    setLoadingAction(true);

    const formData = new FormData();
    formData.append("heading", editItem.heading);
    formData.append("sub_heading", editItem.sub_heading);
    formData.append("content", editItem.content);
    formData.append("hospital_achievements", editItem.hospital_achievements);
    formData.append("total_patients_review", editItem.total_patients_review);
    formData.append("accreditations_type", editItem.accreditations_type);
    formData.append("main_img", editItem.main_img);
    formData.append("accreditations_img", editItem.accreditations_img);

    try {
      const response = await updateWhyChooseRaheja(editItem.id, formData);
      toast.success("Updated successfully!");
      setRahejaList((prev) =>
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
      await deleteWhyChooseRaheja(id);
      toast.success("Item deleted successfully!");
      setRahejaList((prev) => prev.filter((item) => item.id !== id));
      setDeleteItemId(null);
    } catch (err) {
      toast.error("Failed to delete item.");
    } finally {
      setLoadingAction(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "heading", headerName: "Heading", width: 250 },
    { field: "sub_heading", headerName: "Sub Heading", width: 200 },
    { field: "content", headerName: "Content", width: 300 },
    {
      field: "hospital_achievements",
      headerName: "Hospital Achievements",
      width: 250,
    },
    {
      field: "total_patients_review",
      headerName: "Total Patient Reviews",
      width: 180,
    },
    {
      field: "accreditations_type",
      headerName: "Accreditations Type",
      width: 300,
    },
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
        Why Choose S.L. Raheja List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={rahejaList}
          columns={columns}
          autoHeight
          getRowId={(row) => row.id}
        />
      )}

      {/* Edit Dialog */}
      {editItem && (
        <Dialog open onClose={() => setEditItem(null)}>
          <DialogTitle>Edit Why Choose Raheja</DialogTitle>
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
              label="Sub Heading"
              value={editItem.sub_heading}
              onChange={(e) =>
                setEditItem({ ...editItem, sub_heading: e.target.value })
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
              label="Hospital Achievements"
              multiline
              rows={2}
              value={editItem.hospital_achievements}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  hospital_achievements: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Total Patients Review"
              value={editItem.total_patients_review}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  total_patients_review: e.target.value,
                })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Accreditations Type"
              multiline
              rows={2}
              value={editItem.accreditations_type}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  accreditations_type: e.target.value,
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

export default WhyChooseRahejaList;
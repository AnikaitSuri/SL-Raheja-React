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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchBannersCMS,
  editBanner,
  updateBanner,
  trashBanner,
} from "../../Adapters/ApiAdapter";

const ListBanners = () => {
  const [banners, setBanners] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  const sourcePages = [
    "Home",
    "About Us",
    "Contact Us",
    "Specialities",
    "Academics",
    "Careers",
  ]; // Static dropdown options

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBannersCMS();
        if (response?.data) {
          setBanners(response.data);
        } else {
          toast.error("Failed to fetch banners.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching banners.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await editBanner(id);
      if (response?.data) {
        setEditItem(response.data);
      } else {
        toast.error("Failed to load banner data for editing.");
      }
    } catch (error) {
      toast.error("An error occurred while loading banner data.");
    }
  };

  const handleSaveEdit = async () => {
    setLoadingAction(true);

    const formData = new FormData();
    formData.append("name", editItem.name);
    formData.append("banner_heading", editItem.banner_heading);
    formData.append("banner_sub_heading", editItem.banner_sub_heading);
    formData.append("banner_content", editItem.banner_content);
    formData.append("source_page", editItem.source_page);
    if (editItem.img_path) formData.append("img_path", editItem.img_path);

    try {
      const response = await updateBanner(editItem.id, formData);
      if (response?.data) {
        setBanners((prev) =>
          prev.map((item) =>
            item.id === editItem.id ? { ...item, ...response.data } : item
          )
        );
        setEditItem(null);
        toast.success("Banner updated successfully!");
      } else {
        toast.error("Failed to save changes.");
      }
    } catch (error) {
      toast.error("An error occurred while saving changes.");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async (id) => {
    setLoadingAction(true);
    try {
      await trashBanner(id);
      setBanners((prev) => prev.filter((item) => item.id !== id));
      toast.success("Banner deleted successfully!");
      setDeleteItemId(null);
    } catch (error) {
      toast.error("Failed to delete banner.");
    } finally {
      setLoadingAction(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "banner_heading", headerName: "Banner Heading", width: 200 },
    { field: "source_page", headerName: "Source Page", width: 150 },
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
        List Banners
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid rows={banners} columns={columns} autoHeight />
      )}

      {/* Edit Dialog */}
      {editItem && (
        <Dialog open onClose={() => setEditItem(null)}>
          <DialogTitle>Edit Banner</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              value={editItem.name}
              onChange={(e) =>
                setEditItem({ ...editItem, name: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Banner Heading"
              value={editItem.banner_heading}
              onChange={(e) =>
                setEditItem({ ...editItem, banner_heading: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Banner Sub Heading"
              value={editItem.banner_sub_heading}
              onChange={(e) =>
                setEditItem({ ...editItem, banner_sub_heading: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Banner Content"
              multiline
              rows={3}
              value={editItem.banner_content}
              onChange={(e) =>
                setEditItem({ ...editItem, banner_content: e.target.value })
              }
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Source Page</InputLabel>
              <Select
                value={editItem.source_page}
                onChange={(e) =>
                  setEditItem({ ...editItem, source_page: e.target.value })
                }
              >
                {sourcePages.map((page, index) => (
                  <MenuItem key={index} value={page}>
                    {page}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  setEditItem({ ...editItem, img_path: e.target.files[0] })
                }
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditItem(null)}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveEdit}
              disabled={loadingAction}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Delete Confirmation */}
      {deleteItemId && (
        <Dialog open onClose={() => setDeleteItemId(null)}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this banner?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteItemId(null)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(deleteItemId)}
              disabled={loadingAction}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ListBanners;

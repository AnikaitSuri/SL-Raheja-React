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
import {
  fetchHealthCheckupPackageList,
  editHealthCheckupPackage,
  updateHealthCheckupPackage,
  trashHealthCheckupPackage,
} from "../../Adapters/ApiAdapter";

const ListHealthCheckupPackage = () => {
  const [packages, setPackages] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchHealthCheckupPackageList();
        setPackages(response.data || []);
      } catch (err) {
        toast.error("Failed to fetch health checkup packages.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await editHealthCheckupPackage(id);
      setEditItem(response.data);
    } catch (err) {
      toast.error("Failed to load package data for editing.");
    }
  };

  const handleSaveEdit = async () => {
    setLoadingAction(true);

    const formData = new FormData();
    formData.append("checkup_name", editItem.checkup_name);
    if (editItem.package_img instanceof File) {
      formData.append("package_img", editItem.package_img);
    }

    try {
      const response = await updateHealthCheckupPackage(editItem.id, formData);
      toast.success("Health Checkup Package updated successfully!");
      setPackages((prev) =>
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
      await trashHealthCheckupPackage(id);
      toast.success("Package deleted successfully!");
      setPackages((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      toast.error("Failed to delete package.");
    } finally {
      setLoadingAction(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "checkup_name", headerName: "Package Name", width: 300 },
    { field: "package_img", headerName: "Image", width: 150 },
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
        Health Checkup Package List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={packages}
          columns={columns}
          autoHeight
          getRowId={(row) => row.id}
        />
      )}

      {/* Edit Dialog */}
      {editItem && (
        <Dialog open onClose={() => setEditItem(null)}>
          <DialogTitle>Edit Health Checkup Package</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Checkup Name"
              value={editItem.checkup_name}
              onChange={(e) =>
                setEditItem({ ...editItem, checkup_name: e.target.value })
              }
            />
            <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  setEditItem({ ...editItem, package_img: e.target.files[0] })
                }
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditItem(null)}>Cancel</Button>
            <Button
              variant="contained"
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

export default ListHealthCheckupPackage;
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
  fetchJobList,
  updateJob,
  trashJob,
  editJob
} from "../../Adapters/ApiAdapter";

const CareerJobs = () => {
  const [jobs, setJobs] = useState([]); // List of jobs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editJobData, setEditJobData] = useState(null); // State for the job being edited
  const [deleteJobId, setDeleteJobId] = useState(null); // State for deleting a job
  const [saving, setSaving] = useState(false); // State for saving edits

  // Fetch Career Jobs List
  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await fetchJobList();
        if (response?.data) {
          setJobs(response.data);
        } else {
          setError("Failed to fetch job listings.");
        }
      } catch (err) {
        setError("An error occurred while fetching job listings.");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  // Handle Edit Click
  const handleEdit = async (id) => {
    try {
      const response = await editJob(id);
      if (response?.data) {
        setEditJobData(response.data); // Pre-fill the edit dialog with the fetched data
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
    formData.append("title", editJobData.title);
    formData.append("department", editJobData.department);
    formData.append("designation", editJobData.designation);
    formData.append("details", editJobData.details);
    formData.append("description", editJobData.description);
    formData.append("exp_required", editJobData.exp_required);
    formData.append("skills", editJobData.skills);
    formData.append("education", editJobData.education);

    try {
      const response = await updateJob(editJobData.id, formData);
      if (response?.data) {
        // Update the jobs list with the new data
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === editJobData.id ? response.data : job
          )
        );
        setEditJobData(null); // Close the dialog
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
      await trashJob(id);
      // Remove the deleted item from the jobs list
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      setDeleteJobId(null);
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  // DataGrid Columns
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "department", headerName: "Department", width: 200 },
    { field: "designation", headerName: "Designation", width: 200 },
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
            onClick={() => setDeleteJobId(params.row.id)} // Open delete confirmation
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
        Career Jobs List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <DataGrid rows={jobs} columns={columns} autoHeight />
      )}

      {/* Edit Dialog */}
      {editJobData && (
        <Dialog open onClose={() => setEditJobData(null)}>
          <DialogTitle>Edit Job</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              value={editJobData.title || ""}
              onChange={(e) =>
                setEditJobData({ ...editJobData, title: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Department"
              value={editJobData.department || ""}
              onChange={(e) =>
                setEditJobData({ ...editJobData, department: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Designation"
              value={editJobData.designation || ""}
              onChange={(e) =>
                setEditJobData({ ...editJobData, designation: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Details"
              multiline
              rows={3}
              value={editJobData.details || ""}
              onChange={(e) =>
                setEditJobData({ ...editJobData, details: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              multiline
              rows={3}
              value={editJobData.description || ""}
              onChange={(e) =>
                setEditJobData({ ...editJobData, description: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Experience Required"
              type="number"
              value={editJobData.exp_required || ""}
              onChange={(e) =>
                setEditJobData({ ...editJobData, exp_required: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Skills"
              value={editJobData.skills || ""}
              onChange={(e) =>
                setEditJobData({ ...editJobData, skills: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Education"
              value={editJobData.education || ""}
              onChange={(e) =>
                setEditJobData({ ...editJobData, education: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditJobData(null)}>Cancel</Button>
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
      {deleteJobId && (
        <Dialog open onClose={() => setDeleteJobId(null)}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this job?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteJobId(null)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(deleteJobId)}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default CareerJobs;
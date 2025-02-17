import React, { useEffect, useState } from "react";
import {
  fetchUpcomingEvents,
  editUpcomingEvent,
  updateUpcomingEvent,
  trashUpcomingEvent,
} from "../../Adapters/ApiAdapter";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpcomingEventsList = () => {
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const [deleteEventId, setDeleteEventId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetchUpcomingEvents();
        setEvents(response.data || []);
      } catch (err) {
        toast.error("Failed to fetch upcoming events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = async (id) => {
    try {
      const response = await editUpcomingEvent(id);
      setEditEvent(response.data);
    } catch (err) {
      toast.error("Failed to load event data for editing.");
    }
  };

  const handleSaveEdit = async () => {
    setLoadingAction(true);
    const formData = new FormData();
    formData.append("name", editEvent.name);
    formData.append("event_type", editEvent.event_type);
    formData.append("event_date", editEvent.event_date);
    formData.append("heading", editEvent.heading);
    formData.append("description", editEvent.description);
    formData.append("location", editEvent.location);

    try {
      const response = await updateUpcomingEvent(editEvent.id, formData);
      toast.success("Event updated successfully!");
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editEvent.id ? { ...event, ...response.data } : event
        )
      );
      setEditEvent(null);
    } catch (err) {
      toast.error("Failed to save changes.");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async (id) => {
    setLoadingAction(true);
    try {
      await trashUpcomingEvent(id);
      toast.success("Event deleted successfully!");
      setEvents((prev) => prev.filter((event) => event.id !== id));
      setDeleteEventId(null);
    } catch (err) {
      toast.error("Failed to delete event.");
    } finally {
      setLoadingAction(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "event_type", headerName: "Event Type", width: 150 },
    { field: "event_date", headerName: "Event Date", width: 150 },
    { field: "heading", headerName: "Heading", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "location", headerName: "Location", width: 150 },
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
            onClick={() => setDeleteEventId(params.row.id)}
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
        Upcoming Events
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid rows={events} columns={columns} autoHeight />
      )}

      {/* Edit Dialog */}
      {editEvent && (
        <Dialog open onClose={() => setEditEvent(null)}>
          <DialogTitle>Edit Upcoming Event</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              value={editEvent.name}
              onChange={(e) =>
                setEditEvent({ ...editEvent, name: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Event Type"
              value={editEvent.event_type}
              onChange={(e) =>
                setEditEvent({ ...editEvent, event_type: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Event Date"
              type="date"
              value={editEvent.event_date}
              onChange={(e) =>
                setEditEvent({ ...editEvent, event_date: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Heading"
              value={editEvent.heading}
              onChange={(e) =>
                setEditEvent({ ...editEvent, heading: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              multiline
              rows={4}
              value={editEvent.description}
              onChange={(e) =>
                setEditEvent({ ...editEvent, description: e.target.value })
              }
            />
            <TextField
              fullWidth
              margin="normal"
              label="Location"
              value={editEvent.location}
              onChange={(e) =>
                setEditEvent({ ...editEvent, location: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditEvent(null)}>Cancel</Button>
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
      {deleteEventId && (
        <Dialog open onClose={() => setDeleteEventId(null)}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this event?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteEventId(null)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(deleteEventId)}
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

export default UpcomingEventsList;
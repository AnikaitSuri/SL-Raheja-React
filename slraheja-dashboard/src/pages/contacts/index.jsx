import React, { useEffect, useState } from "react";
import { Box, useTheme, CircularProgress, Alert } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { contactList } from "../../Adapters/ApiAdapter.js";
import Header from "../../components/Header";
import dayjs from "dayjs";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State to hold API data and loading/error states
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch contact data on component mount
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await contactList();

        if (response?.data) {
          // Map API response to match DataGrid rows format
          const mappedData = response.data.map((contact) => ({
            id: contact.id,
            name: contact.name,
            email: contact.email,
            message: contact.message,
            createdAt: dayjs(contact.created_at).format("YYYY-MM-DD HH:mm:ss"), // Format the date
          }));
          setRows(mappedData);
        } else {
          setError("Failed to fetch contact data.");
        }
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError("An error occurred while fetching contacts.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "message", headerName: "Message", width: 300 },
    { field: "createdAt", headerName: "Created At", width: 200 },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="CONTACTS" subtitle="Welcome to your contacts" />
      </Box>
      <Box
        m="8px 0 0 0"
        width="100%"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[500],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[500],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Contacts;
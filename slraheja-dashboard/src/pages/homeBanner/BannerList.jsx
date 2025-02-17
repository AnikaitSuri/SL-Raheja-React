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
import { fetchBanners } from "../../Adapters/ApiAdapter";
import dayjs from "dayjs";

const BannerList = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editBanner, setEditBanner] = useState(null); // For edit dialog
    const [deleteBannerId, setDeleteBannerId] = useState(null); // For delete confirmation
    const [newImage, setNewImage] = useState(null);

    // Fetch banners on component mount
    useEffect(() => {
        const loadBanners = async () => {
            try {
                const response = await fetchBanners();
                if (response?.data) {
                    setBanners(response.data);
                } else {
                    setError("Failed to fetch banners.");
                }
            } catch (err) {
                setError("An error occurred while fetching banners.");
            } finally {
                setLoading(false);
            }
        };

        loadBanners();
    }, []);

    const handleEdit = (banner) => {
        setEditBanner(banner);
    };

    const handleDelete = (id) => {
        setDeleteBannerId(id);
    };

    const closeEditDialog = () => {
        setEditBanner(null);
    };

    const closeDeleteDialog = () => {
        setDeleteBannerId(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "source_page", headerName: "Source Page", width: 150 },
        { field: "banner_heading", headerName: "Heading", width: 250 },
        { field: "banner_sub_heading", headerName: "Sub Heading", width: 250 },
        {
            field: "img_path",
            headerName: "Image",
            width: 100,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt="banner"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
            ),
        },
        {
            field: "created_at",
            headerName: "Created At",
            width: 200,
            valueFormatter: (params) =>
                dayjs(params.value).format("YYYY-MM-DD HH:mm:ss"),
        },
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
                        onClick={() => handleEdit(params.row)}
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
                        Trash
                    </Button>
                </Box>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Typography variant="h4" gutterBottom>
                Banner List
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <DataGrid
                    rows={banners}
                    columns={columns}
                    autoHeight
                    disableSelectionOnClick
                />
            )}

            {/* Edit Dialog */}
            {editBanner && (
                <Dialog open={Boolean(editBanner)} onClose={closeEditDialog}>
                    <DialogTitle>Edit Banner</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Heading"
                            value={editBanner.banner_heading}
                            onChange={(e) =>
                                setEditBanner({ ...editBanner, banner_heading: e.target.value })
                            }
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Sub Heading"
                            value={editBanner.banner_sub_heading}
                            onChange={(e) =>
                                setEditBanner({
                                    ...editBanner,
                                    banner_sub_heading: e.target.value,
                                })
                            }
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Content"
                            multiline
                            rows={4}
                            value={editBanner.banner_content}
                            onChange={(e) =>
                                setEditBanner({ ...editBanner, banner_content: e.target.value })
                            }
                        />
                        <Box mt={2}>
                            <Typography variant="body1" gutterBottom>
                                Current Image:
                            </Typography>
                            <img
                                src={editBanner.img_path}
                                alt="banner"
                                style={{ width: "100%", height: "auto", marginBottom: "8px" }}
                            />
                            <Button variant="contained" component="label">
                                Upload New Image
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </Button>
                            {newImage && (
                                <Typography variant="body2" mt={1}>
                                    New Image: {newImage.name}
                                </Typography>
                            )}
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeEditDialog}>Cancel</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                console.log("Edit Banner:", editBanner);
                                closeEditDialog();
                            }}
                        >
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Delete Confirmation Dialog */}
            {deleteBannerId && (
                <Dialog open={Boolean(deleteBannerId)} onClose={closeDeleteDialog}>
                    <DialogTitle>Delete Confirmation</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this banner?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeDeleteDialog}>Cancel</Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                                console.log("Delete Banner ID:", deleteBannerId);
                                closeDeleteDialog();
                            }}
                        >
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default BannerList;
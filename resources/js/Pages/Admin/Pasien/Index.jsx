import React, { useState, useEffect } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid } from "@mui/x-data-grid";
import { usePage, router, Head } from "@inertiajs/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    DialogContentText,
    CircularProgress,
    Alert,
    Snackbar,
} from "@mui/material";

export default function Index() {
    const { flash } = usePage().props;
    const [message, setMessage] = useState(flash.success || null);
    const [errorMessage, setErrorMessage] = useState(flash.error || null);
    const { doctors } = usePage().props;

    // State untuk delete confirmation
    const [deleteDialog, setDeleteDialog] = useState({
        open: false,
        doctorId: null,
        doctorName: null,
        loading: false,
    });

    // State untuk snackbar notification
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success", // success, error, warning, info
    });

    useEffect(() => {
        if (message) {
            setSnackbar({
                open: true,
                message: message,
                severity: "success",
            });
            setMessage(null);
        }
    }, [message]);

    useEffect(() => {
        if (errorMessage) {
            setSnackbar({
                open: true,
                message: errorMessage,
                severity: "error",
            });
            setErrorMessage(null);
        }
    }, [errorMessage]);

    const handleEdit = (row) => {
        router.visit(route("doctor.edit", row.id));
    };

    const handleShow = (row) => {
        router.visit(route("doctor.show", row.id));
    };

    // Open delete confirmation dialog
    const handleDeleteClick = (row) => {
        setDeleteDialog({
            open: true,
            doctorId: row.id,
            doctorName: row.fullName,
            loading: false,
        });
    };

    // Close delete dialog
    const handleDeleteCancel = () => {
        if (!deleteDialog.loading) {
            setDeleteDialog({
                open: false,
                doctorId: null,
                doctorName: null,
                loading: false,
            });
        }
    };

    // Confirm delete
    const handleDeleteConfirm = () => {
        setDeleteDialog((prev) => ({ ...prev, loading: true }));
        router.post(
            route("doctor.destroy", deleteDialog.doctorId),
            {
                _method: "DELETE",
            },
            {
                onSuccess: () => {
                    setDeleteDialog({
                        open: false,
                        doctorId: null,
                        doctorName: null,
                        loading: false,
                    });
                    setSnackbar({
                        open: true,
                        message: "Data dokter berhasil dihapus",
                        severity: "success",
                    });
                },
                onError: (errors) => {
                    setDeleteDialog((prev) => ({ ...prev, loading: false }));
                    setSnackbar({
                        open: true,
                        message: "Gagal menghapus data dokter",
                        severity: "error",
                    });
                },
                onFinish: () => {
                    setDeleteDialog((prev) => ({ ...prev, loading: false }));
                },
            },
        );
    };

    // Close snackbar
    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const columns = [
        { field: "no", headerName: "NO", flex: 1 },
        { field: "noStr", headerName: "NO. STR", flex: 1 },
        {
            field: "fullName",
            headerName: "Nama Lengkap",
            flex: 1,
        },
        {
            field: "address",
            headerName: "Alamat",
            flex: 1,
        },
        {
            field: "spesialis",
            headerName: "Jabatan",
            flex: 1,
            align: "left",
            headerAlign: "left",
        },
        {
            field: "Aksi",
            headerName: "Aksi",
            flex: 1,
            sortable: false,
            renderCell: (params) => (
                <div className="space-x-2">
                    <button
                        onClick={() => handleEdit(params.row)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded text-sm transition-colors"
                        title="Edit"
                    >
                        <EditIcon />
                    </button>
                    <button
                        onClick={() => handleShow(params.row)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-sm transition-colors"
                        title="Lihat Detail"
                    >
                        <VisibilityIcon />
                    </button>
                    <button
                        onClick={() => handleDeleteClick(params.row)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm transition-colors"
                        title="Hapus"
                    >
                        <DeleteForeverIcon />
                    </button>
                </div>
            ),
        },
    ];

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    // const rows = doctors.map((doctor, index) => ({
    //     id: doctor.id,
    //     no: index + 1,
    //     fullName: doctor.nama,
    //     noStr: doctor.str,
    //     address: doctor.alamat,
    //     spesialis: doctor.spesialis,
    // }));

    return (
        <DashboardLayout>
            <Head title="Data Dokter" />
            <Box className="max-w-full mx-auto px-4 py-6">
                <div className="font-bold text-2xl mb-4">Data Pasien</div>

                <div className="mb-4 flex justify-between items-center">
                    <button
                        onClick={() => router.visit(route("patient.create"))}
                        className="bg-green-500 hover:bg-green-700 hover:scale-105 transition-transform duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
                    >
                        Tambah Data Pasien <AddIcon />
                    </button>
                    <input
                        type="text"
                        placeholder="Cari pasien..."
                        className="border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                {/* <Paper sx={{ width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[5, 10]}
                        autoHeight
                        sx={{ border: 0 }}
                    />
                </Paper> */}

                {/* Delete Confirmation Dialog */}
                {/* <Dialog
                    open={deleteDialog.open}
                    onClose={handleDeleteCancel}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>Konfirmasi Hapus Data</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Apakah Anda yakin ingin menghapus data dokter{" "}
                            <strong>{deleteDialog.doctorName}</strong>?
                            <br />
                            <span className="text-red-600">
                                Aksi ini tidak dapat dibatalkan.
                            </span>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleDeleteCancel}
                            disabled={deleteDialog.loading}
                            color="inherit"
                        >
                            Batal
                        </Button>
                        <Button
                            onClick={handleDeleteConfirm}
                            disabled={deleteDialog.loading}
                            color="error"
                            variant="contained"
                            startIcon={
                                deleteDialog.loading ? (
                                    <CircularProgress size={20} />
                                ) : null
                            }
                        >
                            {deleteDialog.loading ? "Menghapus..." : "Hapus"}
                        </Button>
                    </DialogActions>
                </Dialog> */}

                {/* Snackbar for notifications */}
                {/* <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{ width: "100%" }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar> */}
            </Box>
        </DashboardLayout>
    );
}

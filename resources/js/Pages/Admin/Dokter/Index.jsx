import React, { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { usePage, router, Head } from "@inertiajs/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";

export default function Index() {
    const { flash } = usePage().props;

    const { doctors } = usePage().props;

    const handleEdit = (row) => {
        router.visit(route("doctor.edit", row.id));
    };
    const handleShow = (row) => {
        router.visit(route("doctor.show", row.id));
    };

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus data ini?")) {
            router.delete(route("doctor.destroy", id));
        }
    };

    const columns = [
        { field: "id", headerName: "NO", flex: 1 },
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
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded text-sm"
                    >
                        <EditIcon />
                    </button>
                    <button
                        onClick={() => handleShow(params.row)}
                        className="bg-blue-500 hover:bg-Blue-600 text-white py-1 px-2 rounded text-sm"
                    >
                        <VisibilityIcon />
                    </button>
                    <button
                        onClick={() => handleDelete(params.row.id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm"
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

    const rows = doctors.map((doctor, index) => ({
        id: index + 1,
        fullName: doctor.nama,
        noStr: doctor.str,
        address: doctor.alamat,
        spesialis: doctor.spesialis,
    }));

    return (
        <DashboardLayout>
            <Head title="Data Dokter" />
            <Box className="max-w-full mx-auto px-4 py-6">
                <div className="font-bold text-2xl mb-4">Data Dokter</div>

                <div className="mb-4 flex justify-between items-center">
                    <button
                        onClick={() => router.visit(route("doctor.create"))}
                        className="bg-green-500 hover:bg-green-700 hover:scale-105 transition-transform duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
                    >
                        Tambah Data Dokter <AddIcon />
                    </button>
                    <input
                        type="text"
                        placeholder="Cari dokter..."
                        className="border border-gray-300 rounded-md px-4 py-2"
                    />{" "}
                </div>
                {flash?.success && (
                    <div className="bg-green-100 text-green-700 p-3 w-full rounded mb-4">
                        {flash.success}
                    </div>
                )}

                <Paper sx={{ width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[5, 10]}
                        autoHeight
                        sx={{ border: 0 }}
                    />
                </Paper>
            </Box>
        </DashboardLayout>
    );
}

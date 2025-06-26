import React, { useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";
import { usePage, router, Head } from "@inertiajs/react";

export default function Index() {
    const { flash } = usePage().props;

    const handleEdit = (row) => {
        router.visit(route("doctor.edit", row.id));
    };

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus data ini?")) {
            router.delete(route("doctor.destroy", id));
        }
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "firstName", headerName: "First name", flex: 1 },
        { field: "lastName", headerName: "Last name", flex: 1 },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            flex: 1,
            align: "left",
            headerAlign: "left",
        },
        {
            field: "fullName",
            headerName: "Full name",
            description: "Auto-computed from first and last name",
            sortable: false,
            flex: 1,
            valueGetter: (value, row) =>
                `${row.firstName || ""} ${row.lastName || ""}`,
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
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(params.row.id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm"
                    >
                        Hapus
                    </button>
                </div>
            ),
        },
    ];

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const rows = [
        { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
        { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
        { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
        { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
        { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 40 },
        { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
        { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
        { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
        { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
    ];

    return (
        <DashboardLayout>
            <Head title="Data Dokter" />
            <Box className="max-w-full mx-auto px-4 py-6">
                <div className="font-bold text-2xl mb-4">Data Dokter</div>

                <div className="mb-4">
                    <button
                        onClick={() => router.visit(route("doctor.create"))}
                        className="bg-green-500 hover:bg-green-700 hover:scale-105 transition-transform duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
                    >
                        Tambah Data Dokter <AddIcon />
                    </button>
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

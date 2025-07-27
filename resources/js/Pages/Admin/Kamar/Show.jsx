import { React, useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

export default function Show() {
    const { room, patientList } = usePage().props;
    const handleShow = (row) => {
        router.visit(
            route("patient.show", row.id) + "?from=room&roomId=" + room.id,
        );
    };
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });
    const columns = [
        { field: "no", headerName: "NO", flex: 1 },
        { field: "nik", headerName: "NIK", flex: 1 },
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
            field: "doctorName",
            headerName: "Dokter",
            flex: 1,
            align: "left",
            headerAlign: "left",
        },
        {
            field: "roomName",
            headerName: "Kamar",
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
                        onClick={() => handleShow(params.row)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-sm transition-colors"
                        title="Lihat Detail"
                    >
                        Detail Pasien
                    </button>
                </div>
            ),
        },
    ];

    const rows = patientList.map((patient, index) => ({
        id: patient.id,
        no: index + 1,
        fullName: patient.nama,
        nik: patient.nik,
        address: patient.alamat,
        doctorName: patient.doctor?.nama || "-",
        roomName: room.name || "-",
    }));

    return (
        <div>
            <DashboardLayout>
                <Head title="Daftar Pasien" />
                <Box className=" max-w-full mx-auto px-4 py-6">
                    <div className="font-bold text-2xl mb-4">
                        Daftar Pasien untuk kamar {room.name}
                    </div>
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
                    <div className="my-5 flex justify-end">
                        <div className="hover:scale-105 transition ease-in duration-300">
                            <Button
                                onClick={() =>
                                    router.visit(route("room.index"))
                                }
                                variant="contained"
                            >
                                Kembali
                            </Button>
                        </div>
                    </div>
                </Box>
            </DashboardLayout>
        </div>
    );
}

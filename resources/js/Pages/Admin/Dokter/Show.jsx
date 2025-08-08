import { React, useState } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";

export default function Show() {
    const { doctor, patient } = usePage().props;

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
    ];

    const rows = patient.map((patient, index) => ({
        id: patient.id,
        no: index + 1,
        fullName: patient.nama,
        nik: patient.nik,
        address: patient.alamat,
        doctorName: patient.doctor?.nama || "-",
        roomName: patient.room?.name || "-",
    }));

    return (
        <div>
            <DashboardLayout>
                <Head title="Detail Dokter" />
                <Box className=" max-w-full mx-auto px-4 py-6">
                    <div className="font-bold text-2xl mb-4">Detail Dokter</div>
                    <div className="my-8 col-span-2 px-7 py-5 border border-gray-200 rounded-2xl">
                        <div className="mx-auto font-bold text-lg">
                            Data Pribadi
                        </div>
                        <div className="flex items-center justify-between my-7">
                            <div className="text-slate-400">
                                No. STR <br />{" "}
                                <span className="text-black">
                                    {" "}
                                    {doctor.str}
                                </span>
                            </div>
                            <div className="text-slate-400">
                                Nama Lengkap <br />{" "}
                                <span className="text-black">
                                    {" "}
                                    {doctor.nama}
                                </span>
                            </div>
                            <div className="text-slate-400">
                                No. Telephone <br />{" "}
                                <span className="text-black">
                                    {" "}
                                    {doctor.phone}
                                </span>
                            </div>
                            <div className="text-slate-400">
                                Alamat <br />{" "}
                                <span className="text-black">
                                    {" "}
                                    {doctor.alamat}
                                </span>
                            </div>
                            <div className="text-slate-400">
                                Jenis Kelamin <br />{" "}
                                <span className="text-black">
                                    {" "}
                                    {doctor.jenis_kelamin}{" "}
                                </span>
                            </div>
                            <div className="text-slate-400">
                                Jabatan <br />{" "}
                                <span className="text-black">
                                    {" "}
                                    {doctor.spesialis}{" "}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Box className=" max-w-full mx-auto px-4 py-6">
                        <div className="font-bold text-xl mb-4">
                            Daftar Pasien untuk Dokter {doctor.nama}
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
                    </Box>
                    <div className="flex justify-end">
                        <div className="hover:scale-105 transition ease-in duration-300">
                            <Button
                                onClick={() =>
                                    router.visit(route("doctor.index"))
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

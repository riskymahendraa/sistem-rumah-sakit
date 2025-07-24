import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { Box, Button } from "@mui/material";

export default function Show() {
    const { patient, doctor, room } = usePage().props;

    return (
        <div>
            <DashboardLayout>
                <Head title="Detail Dokter" />
                <Box className=" max-w-full mx-auto px-4 py-6">
                    <div className="font-bold text-2xl mb-4">Detail Pasien</div>
                    <div className="my-8 col-span-2 px-7 py-5 border border-gray-200 rounded-2xl">
                        <div className="mx-auto font-bold text-lg">
                            Data Pribadi
                        </div>
                        <div className="flex items-center justify-between my-7">
                            <div className="text-slate-400">
                                NIK <br />{" "}
                                <span className="text-black">
                                    {" "}
                                    {patient.nik}
                                </span>
                            </div>
                            <div className="text-slate-400">
                                Nama Lengkap <br />{" "}
                                <span className="text-black">
                                    {" "}
                                    {patient.nama}
                                </span>
                            </div>
                            <div className="text-slate-400">
                                Dokter <br />{" "}
                                <span className="text-black">
                                    {" "}
                                    {doctor.nama}
                                </span>
                            </div>
                            <div className="text-slate-400">
                                Kamar <br />{" "}
                                <span className="text-black"> {room.name}</span>
                            </div>
                            <div className="text-slate-400">
                                No. Telephone <br />{" "}
                                <span className="text-black">
                                    {" "}
                                    {patient.phone}
                                </span>
                            </div>
                            <div className="text-slate-400">
                                Alamat <br />{" "}
                                <span className="text-black">
                                    {" "}
                                    {patient.alamat}
                                </span>
                            </div>
                            <div className="text-slate-400">
                                Jenis Kelamin <br />{" "}
                                <span className="text-black">
                                    {" "}
                                    {patient.jenis_kelamin}{" "}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <div className="hover:scale-105 transition ease-in duration-300">
                            <Button
                                onClick={() =>
                                    router.visit(route("patient.index"))
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

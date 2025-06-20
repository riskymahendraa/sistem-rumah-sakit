import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function index() {
    return (
        <DashboardLayout>
            <Head title="Data Dokter" />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Box p={2}>
                        <div className="font-bold text-2xl">Data Dokter</div>
                        <div className="my-3">
                            <button
                                onClick={() => router.visit("/create-doctor")}
                                className="bg-green-500 hover:bg-green-700 hover:scale-105 transition-transform duration-300 ease-in-out text-white font-bold py-2 px-4 rounded"
                            >
                                Tambah Data Dokter
                            </button>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}

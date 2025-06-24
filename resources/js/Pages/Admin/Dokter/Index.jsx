import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { usePage, router, Head } from "@inertiajs/react";

export default function Index() {
    const { flash } = usePage().props;
    return (
        <DashboardLayout>
            <Head title="Data Dokter" />
            <Grid container>
                <Grid item xs={12} sm={6} md={4}>
                    <Box p={2}>
                        <div className="font-bold text-2xl">Data Dokter</div>
                        <div className="my-3">
                            <button
                                onClick={() =>
                                    router.visit(route("doctor.create"))
                                }
                                className="bg-green-500 hover:bg-green-700 hover:scale-105 transition-transform duration-300 ease-in-out text-white font-bold py-2 px-2 rounded"
                            >
                                Tambah Data Dokter <AddIcon />
                            </button>
                        </div>
                        {flash?.success && (
                            <div className="bg-green-100 text-green-700 p-3 w-full rounded">
                                {flash.success}
                            </div>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}

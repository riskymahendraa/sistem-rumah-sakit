import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Head } from "@inertiajs/react";

export default function index() {
    return (
        <DashboardLayout>
            <Head title="Data Kamar" />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Box p={2}>
                        <div className="font-bold text-2xl">Data Kamar</div>
                    </Box>
                </Grid>
            </Grid>
        </DashboardLayout>
    );
}

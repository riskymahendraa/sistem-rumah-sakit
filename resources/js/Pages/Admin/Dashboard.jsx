import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TotalDoctorsWidget from "@/Components/TotalDoctorsWidget";
import TotalPatientWidget from "@/Components/TotalPatientWidget";
import Box from "@mui/material/Box";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { totalDoctors, totalPatients } = usePage().props;

    return (
        <DashboardLayout>
            <Head title="Dashboard" />
            <Box className="max-w-full mx-auto px-4 py-6">
                <div className="font-bold text-2xl mb-4">Dashboard</div>
                <div className="grid grid-cols-3 my-5 gap-5 w-full">
                    <div className="p-4">
                        <TotalDoctorsWidget total={totalDoctors} />
                    </div>
                    <div className="p-4">
                        <TotalPatientWidget total={totalPatients} />
                    </div>
                </div>
            </Box>
        </DashboardLayout>
    );
}

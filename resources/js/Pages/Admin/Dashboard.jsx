import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TotalDoctorsWidget from "@/Components/TotalDoctorsWidget";
import Box from "@mui/material/Box";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { totalDoctors } = usePage().props;

    return (
        <DashboardLayout>
            <Head title="Dashboard" />
            <Box className="max-w-full mx-auto px-4 py-6">
                <div className="font-bold text-2xl mb-4">Dashboard</div>
                <div className="grid grid-cols-4 gap-4 w-full">
                    <div className="text-white p-4 rounded-lg h-32">
                        <TotalDoctorsWidget total={totalDoctors} />
                    </div>
                </div>
            </Box>
        </DashboardLayout>
    );
}

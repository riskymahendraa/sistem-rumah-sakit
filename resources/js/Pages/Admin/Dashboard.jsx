import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TotalDoctorsWidget from "@/Components/TotalDoctorsWidget";
import TotalPatientWidget from "@/Components/TotalPatientWidget";
import QuickActionWidget from "@/Components/QuickActionWidget";
import ChartGenderPatient from "@/Components/ChartGenderPatient";
import Box from "@mui/material/Box";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { totalDoctors, totalPatients } = usePage().props;

    return (
        <DashboardLayout>
            <Head title="Dashboard" />
            <Box className="max-w-full mx-auto px-4 py-6">
                <div className="font-bold text-2xl mb-4">Dashboard</div>
                <div className="grid grid-cols-3 grid-flow-row-dense gap-3 w-full">
                    {/* Card Dokter */}
                    <div className="p-4 row-span-2">
                        <QuickActionWidget />
                    </div>

                    {/* Card Pasien */}
                    <div className="p-4">
                        <div>
                            <TotalDoctorsWidget total={totalDoctors} />
                        </div>
                        <div className="mt-6">
                            <TotalPatientWidget total={totalPatients} />
                        </div>
                    </div>

                    {/* Quick Actions, panjang 2 baris */}
                    <div className="p-4 row-span-2">
                        <ChartGenderPatient />
                    </div>

                    {/* Card Pasien 2 */}
                </div>
            </Box>
        </DashboardLayout>
    );
}

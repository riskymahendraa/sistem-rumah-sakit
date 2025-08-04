import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import TotalDoctorsWidget from "@/Components/TotalDoctorsWidget";
import TotalPatientWidget from "@/Components/TotalPatientWidget";
import QuickActionWidget from "@/Components/QuickActionWidget";
import ChartGenderPatient from "@/Components/ChartGenderPatient";
import RoomWidget from "@/Components/RoomWidget";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EmergencyIcon from "@mui/icons-material/Emergency";
import HealingIcon from "@mui/icons-material/Healing";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Head, router, usePage } from "@inertiajs/react";

const iconMap = {
    VIP: <StarIcon />,
    A: <FavoriteIcon />,
    B: <LocalHospitalIcon />,
    C: <EmergencyIcon />,
    D: <HealingIcon />,
};

const colorMap = {
    VIP: "success",
    A: "error",
    B: "info",
    C: "warning",
    D: "primary",
};

export default function Dashboard() {
    const { totalDoctors, totalPatients, genderStats, rooms } = usePage().props;
    const defaultClasses = ["VIP", "A", "B", "C", "D"];

    const data = defaultClasses.map((cls) => {
        const groupedRooms = (rooms || []).filter(
            (r) => (r.class || "").trim().toUpperCase() === cls,
        );

        const occupied = groupedRooms.reduce((sum, r) => sum + r.bed_count, 0);
        const total = groupedRooms.reduce(
            (sum, r) => sum + r.available_beds,
            0,
        );

        return {
            class: cls,
            occupied,
            total,
            icon: iconMap[cls] || iconMap.default,
            color: colorMap[cls] || colorMap.default,
        };
    });
    return (
        <DashboardLayout>
            <Head title="Dashboard" />
            <Box className="max-w-full mx-auto px-4 py-6">
                <div className="font-bold text-2xl mb-4">Dashboard</div>
                <div className="grid grid-cols-3 grid-flow-row-dense gap-3 w-full">
                    <div className="p-4 row-span-2">
                        <QuickActionWidget />
                    </div>
                    <div className="p-4">
                        <div>
                            <TotalDoctorsWidget total={totalDoctors} />
                        </div>
                        <div className="mt-6">
                            <TotalPatientWidget total={totalPatients} />
                        </div>
                    </div>
                    <div className="p-4 row-span-2">
                        <ChartGenderPatient genderStats={genderStats} />
                    </div>
                </div>
                <div className="bg-white m-3 shadow-xl p-5 rounded-xl">
                    <Typography
                        variant="subtitle1"
                        color="text.primary"
                        fontWeight="bold"
                    >
                        Data Kamar Rumah Sakit
                    </Typography>

                    <div className="mt-4 grid grid-cols-4 gap-7">
                        {data.map((data, index) => (
                            <RoomWidget
                                key={index}
                                name={data.class}
                                occupied={data.occupied}
                                total={data.total}
                                icon={data.icon}
                                color={data.color}
                                onClick={() => router.visit("/room")}
                            />
                        ))}
                    </div>
                </div>
            </Box>
        </DashboardLayout>
    );
}

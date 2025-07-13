import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { Head } from "@inertiajs/react";
import { Box, Button } from "@mui/material";

export default function Show() {
    return (
        <div>
            <DashboardLayout>
                <Head title="Daftar Pasien" />
                <Box className=" max-w-full mx-auto px-4 py-6">
                    <div className="font-bold text-2xl mb-4">Daftar Pasien</div>
                    <div className="flex justify-end">
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

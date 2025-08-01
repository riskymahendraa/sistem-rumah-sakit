import { Card, CardContent, Typography, Box } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccessibleIcon from "@mui/icons-material/Accessible";
import HotelIcon from "@mui/icons-material/Hotel";
import { router } from "@inertiajs/react";

const QuickActionWidget = () => {
    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 3,
                position: "relative",
                overflow: "visible",
            }}
        >
            <CardContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        <Box>
                            <Typography
                                variant="subtitle1"
                                color="text.primary"
                                fontWeight={"bold"}
                            >
                                Akses Cepat
                            </Typography>
                        </Box>
                    </Box>
                    <div
                        className="border-2 text-center justify-center items-center hover:bg-blue-300 border-blue-300 p-4 rounded-xl hover:cursor-pointer hover:scale-105 transition-all duration-200"
                        onClick={() => router.visit("/doctor/create")}
                    >
                        <PersonAddIcon className="text-blue-600 mx-2 justify-center items-center mb-1" />
                        Tambah Data Dokter
                    </div>
                    <div
                        className="border-2 text-center justify-center items-center hover:bg-blue-300 border-blue-300 p-4 rounded-xl hover:cursor-pointer hover:scale-105 transition-all duration-200"
                        onClick={() => router.visit("/patient/create")}
                    >
                        <AccessibleIcon className="text-blue-600 mx-2 justify-center items-center mb-1" />
                        Tambah Data Pasien
                    </div>
                    <div
                        className="border-2 text-center justify-center items-center hover:bg-blue-300 border-blue-300 p-4 rounded-xl hover:cursor-pointer hover:scale-105 transition-all duration-200"
                        onClick={() => router.visit("/room/create")}
                    >
                        <HotelIcon className="text-blue-600 mx-2 justify-center items-center mb-1" />
                        Tambah Data Kamar
                    </div>
                </Box>
            </CardContent>
        </Card>
    );
};

export default QuickActionWidget;

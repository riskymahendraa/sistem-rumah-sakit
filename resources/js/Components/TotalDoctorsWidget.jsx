import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    IconButton,
    Tooltip,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { router } from "@inertiajs/react";

const TotalDoctorsWidget = ({ total }) => {
    return (
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    {/* Baris atas: Avatar + Text kanan */}
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        {/* Kiri: Icon */}
                        <Avatar
                            sx={{
                                bgcolor: "primary.main",
                                width: 40,
                                height: 40,
                            }}
                        >
                            <LocalHospitalIcon />
                        </Avatar>

                        {/* Kanan: Text */}
                        <Box textAlign="right">
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                Jumlah Dokter
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {total}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Baris bawah: tombol panah rata kanan */}
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton
                            onClick={() => router.visit("/doctor")}
                            size="small"
                            sx={{
                                border: "1px solid #e5e7eb",
                                borderRadius: "999px",
                                width: "fit-content",
                                transition: "transform 0.2s ease-in-out",
                                "&:hover": {
                                    transform: "scale(1.1)",
                                },
                            }}
                        >
                            <Tooltip title="Lihat Data Dokter">
                                <CallMadeIcon
                                    fontSize="small"
                                    sx={{ color: "#6b7280" }}
                                />
                            </Tooltip>
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TotalDoctorsWidget;

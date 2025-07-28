import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    IconButton,
    Tooltip,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { router } from "@inertiajs/react";

const TotalDoctorsWidget = ({ total }) => {
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
                <Box
                    sx={{
                        position: "absolute",
                        top: -20,
                        left: 20,
                        backgroundColor: "primary.main",
                        borderRadius: 4,
                        padding: 2,
                    }}
                >
                    <PeopleIcon sx={{ color: "#fff", fontSize: 50 }} />
                </Box>

                <Box display="flex" flexDirection="column" gap={2}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        <Box></Box> {/* Kosong karena icon sudah absolute */}
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

                    <Box display="flex" justifyContent="flex-end">
                        <Tooltip title="Lihat Data Dokter">
                            <IconButton
                                onClick={() => router.visit("/doctor")}
                                size="small"
                                sx={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "999px",
                                    transition: "transform 0.2s ease-in-out",
                                    "&:hover": {
                                        transform: "scale(1.1)",
                                    },
                                }}
                            >
                                <CallMadeIcon
                                    fontSize="small"
                                    sx={{ color: "#6b7280" }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TotalDoctorsWidget;

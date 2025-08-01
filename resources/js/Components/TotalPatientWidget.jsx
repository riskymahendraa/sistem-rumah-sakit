import {
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
    Tooltip,
} from "@mui/material";
import AccessibleIcon from "@mui/icons-material/Accessible";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { router } from "@inertiajs/react";

const TotalPatientWidget = ({ total }) => {
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
                        top: -10,
                        left: 20,
                        backgroundColor: "primary.main",
                        borderRadius: 4,
                        padding: 2,
                    }}
                >
                    <AccessibleIcon sx={{ color: "#fff", fontSize: 50 }} />
                </Box>

                <Box display="flex" flexDirection="column" gap={2}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >
                        <Box></Box>
                        <Box textAlign="right">
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                Jumlah Pasien
                            </Typography>
                            <Typography variant="h6" fontWeight="bold">
                                {total}
                            </Typography>
                        </Box>
                    </Box>

                    <Box display="flex" justifyContent="flex-end">
                        <Tooltip title="Lihat Data Pasien">
                            <IconButton
                                onClick={() => router.visit("/patient")}
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

export default TotalPatientWidget;

import {
    Box,
    Typography,
    LinearProgress,
    IconButton,
    Card,
    CardContent,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const RoomItemCard = ({
    name,
    occupied,
    total,
    icon,
    color = "primary",
    onClick,
}) => {
    const percentage = (total / occupied) * 100;

    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 2,
                position: "relative",
                overflow: "visible",
                transition: "transform 0.3s ease",
                "&:hover": {
                    transform: "scale(1.05)", // 1.5 terlalu besar untuk UI normal
                },
            }}
        >
            <CardContent>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                    Ruangan terisi
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                    <Box
                        sx={{
                            bgcolor: `${color}.100`,
                            color: `${color}.main`,
                            p: 1.5,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {icon}
                    </Box>

                    <Box flexGrow={1}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography fontWeight={600}>{name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>
                                    {total}/{occupied}
                                </strong>{" "}
                                terisi
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1}>
                            <LinearProgress
                                variant="determinate"
                                value={percentage}
                                sx={{
                                    height: 9,
                                    borderRadius: 4,
                                    flexGrow: 1,
                                    bgcolor: "grey.300",
                                    [`& .MuiLinearProgress-bar`]: {
                                        backgroundColor: `${color}.main`,
                                    },
                                }}
                            />

                            {onClick && (
                                <IconButton
                                    onClick={onClick}
                                    size="small"
                                    sx={{ ml: 1 }}
                                >
                                    <OpenInNewIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RoomItemCard;

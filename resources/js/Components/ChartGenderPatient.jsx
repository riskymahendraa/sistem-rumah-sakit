import { PieChart } from "react-minimal-pie-chart";
import { Card, CardContent, Typography, Box, Tooltip } from "@mui/material";
import { useState } from "react";

const ChartGenderPatient = () => {
    const data = [
        { title: "Laki-laki", value: 70, color: "#3B82F6" },
        { title: "Perempuan", value: 30, color: "#EC4899" },
    ];

    const [hovered, setHovered] = useState(undefined);

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
                    <Typography
                        variant="subtitle1"
                        color="text.primary"
                        fontWeight="bold"
                    >
                        Statistik Jenis Kelamin Pasien
                    </Typography>

                    <div
                        className="w-full rounded-xl hover:cursor-pointer hover:scale-105 transition-all duration-200"
                        style={{
                            height: "250px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                        }}
                    >
                        <PieChart
                            className=""
                            data={data}
                            radius={45}
                            label={({ dataEntry }) =>
                                `${dataEntry.title} ${Math.round(dataEntry.percentage)}%`
                            }
                            labelStyle={{
                                fontSize: "5px",
                                fill: "#fff",
                                pointerEvents: "none",
                            }}
                            labelPosition={60}
                            animate
                            segmentsStyle={(index) => ({
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                                transform:
                                    hovered === index
                                        ? "scale(1.05)"
                                        : "scale(1)",
                            })}
                            onMouseOver={(_, index) => setHovered(index)}
                            onMouseOut={() => setHovered(undefined)}
                        />

                        {hovered !== undefined && (
                            <Tooltip
                                title={`${data[hovered].title}: ${data[hovered].value}%`}
                                placement="top"
                                open
                                arrow
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "10px",
                                        zIndex: 10,
                                        width: "1px",
                                        height: "1px",
                                    }}
                                />
                            </Tooltip>
                        )}
                    </div>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ChartGenderPatient;

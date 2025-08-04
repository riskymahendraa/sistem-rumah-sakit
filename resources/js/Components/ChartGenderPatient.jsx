import { PieChart } from "react-minimal-pie-chart";
import { Card, CardContent, Typography, Box, Tooltip } from "@mui/material";
import { useState } from "react";

const ChartGenderPatient = ({ genderStats }) => {
    const total = genderStats.maleCount + genderStats.femaleCount;
    const data = [
        {
            title: "Laki-laki",
            value: genderStats.maleCount,
            color: "#3B82F6",
        },
        {
            title: "Perempuan",
            value: genderStats.femaleCount,
            color: "#EC4899",
        },
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
                            height: "225px",
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
                            startAngle={90}
                            label={({ dataEntry }) =>
                                `${dataEntry.title} ${Math.round(dataEntry.percentage)}%`
                            }
                            labelStyle={{
                                fontSize: "5px",
                                fill: "#fff",
                                pointerEvents: "none",
                            }}
                            labelPosition={50}
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
                                title={`${data[hovered].title}: ${Math.round((data[hovered].value / total) * 100)}%`}
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

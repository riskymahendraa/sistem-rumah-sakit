import React from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { router } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";
import { useState } from "react";
import { Head } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        type: "",
        bed_count: "",
        class: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("room.store"));
    };

    const lastSelectedType = useRef(null);
    const [openedType, setOpenedType] = useState(false);

    return (
        <DashboardLayout>
            <Head title="Tambah Data Kamar" />
            <Grid className="border-b-2 border-blue-200" container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Box p={2}>
                        <div className="font-bold text-2xl">
                            Tambah Data Kamar
                        </div>
                    </Box>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
                <div className="max-w-4xl px-4 my-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Kolom 1 - Nama Kamar */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                                Nama Kamar
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder="Masukkan Nama Kamar"
                                className={`block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                                    errors.nama
                                        ? "border-red-500"
                                        : "border-gray-200"
                                }`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Kolom 2 - Kapasitas Kamar */}
                        <div>
                            <label
                                htmlFor="bed_count"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                                Kapasitas Kamar
                            </label>
                            <input
                                id="bed_count"
                                name="bed_count"
                                type="text"
                                value={data.bed_count}
                                onChange={(e) =>
                                    setData("bed_count", e.target.value)
                                }
                                placeholder="Masukkan Kapasitas Kamar"
                                className={`block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${
                                    errors.bed_count
                                        ? "border-red-500"
                                        : "border-gray-200"
                                }`}
                            />
                            {errors.bed_count && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.bed_count}
                                </p>
                            )}
                        </div>

                        {/* Kolom 3 - Tipe Kamar */}
                        <FormControl
                            component={"fieldset"}
                            error={Boolean(errors.class)}
                            className="w-full p-4"
                        >
                            <FormLabel>Tipe Kamar</FormLabel>
                            <RadioGroup
                                row
                                name="class"
                                value={data.class}
                                onChange={(e) =>
                                    setData("class", e.target.value)
                                }
                            >
                                <FormControlLabel
                                    value="VIP"
                                    control={<Radio />}
                                    label="VIP"
                                />
                                <FormControlLabel
                                    value="A"
                                    control={<Radio />}
                                    label="A"
                                />
                                <FormControlLabel
                                    value="B"
                                    control={<Radio />}
                                    label="B"
                                />
                                <FormControlLabel
                                    value="C"
                                    control={<Radio />}
                                    label="C"
                                />
                                <FormControlLabel
                                    value="D"
                                    control={<Radio />}
                                    label="D"
                                />
                            </RadioGroup>
                            {errors.class && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.class}
                                </p>
                            )}
                        </FormControl>

                        {/* Kolom 4 - Jenis Kamar */}
                        <div>
                            <FormControl fullWidth>
                                <Select
                                    name="type"
                                    value={data.type || ""}
                                    onChange={(e) => {
                                        const selected = e.target.value;
                                        lastSelectedType.current = selected;
                                        setData("type", selected);
                                        setOpenedType(false);
                                    }}
                                    onOpen={() => {
                                        setOpenedType(true);
                                        lastSelectedType.current = null; // reset setiap kali dibuka
                                    }}
                                    onClose={() => {
                                        if (
                                            openedType &&
                                            lastSelectedType.current === null
                                        ) {
                                            setData("type", ""); // reset hanya jika tidak ada yang dipilih
                                        }
                                        setOpenedType(false);
                                    }}
                                    displayEmpty
                                    renderValue={(selected) => {
                                        if (!selected) {
                                            return (
                                                <span className="text-gray-400">
                                                    Jenis Kamar
                                                </span>
                                            );
                                        }
                                        return selected;
                                    }}
                                >
                                    <MenuItem value="ICU">ICU</MenuItem>
                                    <MenuItem value="Rawat Inap">
                                        Rawat Inap
                                    </MenuItem>
                                    <MenuItem value="UGD">UGD</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    {/* Tombol Submit */}
                    <div className="flex items-center space-x-2 justify-end mt-4">
                        <div className="hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-blue-600 hover:rounded">
                            <Button
                                onClick={() =>
                                    router.visit(route("room.index"))
                                }
                                variant="contained"
                            >
                                Kembali
                            </Button>
                        </div>
                        <div className="hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-blue-600 hover:rounded">
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={processing}
                            >
                                {processing ? "Mengirim..." : "Submit"}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </DashboardLayout>
    );
}

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
import { Head } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama: "",
        nik: "",
        alamat: "",
        phone: "",
        jenis_kelamin: "",
        spesialis: "",
        doctors_id: null,
        rooms_id: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("patient.store"));
    };

    const handleChange = (e) => {
        const value = e.target.value;
        if (value.length <= 16) {
            setData((prev) => ({ ...prev, nik: value }));
        }
    };

    return (
        <DashboardLayout>
            <Head title="Tambah Data Pasien" />
            <Grid className="border-b-2 border-blue-200" container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Box p={2}>
                        <div className="font-bold text-2xl">
                            Tambah Data Pasien
                        </div>
                    </Box>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
                <div className="max-w-4xl px-4 my-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="nik"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                                NIK
                            </label>
                            <input
                                id="nik"
                                name="nik"
                                type="text"
                                value={data.nik}
                                onChange={handleChange}
                                placeholder="Masukkan NIK 16 Digit"
                                className={`block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${errors.nik ? "border-red-500" : "border-gray-200"}`}
                            />
                            <span className={"text-gray-500 text-xs"}>
                                {data.nik.length} / 16
                            </span>
                            {errors.nik && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.nik}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="nama"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                                Nama Lengkap
                            </label>
                            <input
                                id="nama"
                                name="nama"
                                type="text"
                                value={data.nama}
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                                placeholder="Nama Lengkap"
                                className={`block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${errors.nama ? "border-red-500" : "border-gray-200"}`}
                            />
                            {errors.nama && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.nama}
                                </p>
                            )}
                        </div>
                        <div className="md:col-span-2">
                            <label
                                htmlFor="alamat"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                                Alamat
                            </label>
                            <input
                                id="alamat"
                                name="alamat"
                                type="text"
                                value={data.alamat}
                                onChange={(e) =>
                                    setData("alamat", e.target.value)
                                }
                                placeholder="Masukkan Alamat"
                                className={`block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${errors.alamat ? "border-red-500" : "border-gray-200"}`}
                            />
                            {errors.alamat && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.alamat}
                                </p>
                            )}
                        </div>
                        <div>
                            <FormControl className="w-full">
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
                                                    Pilih Dokter
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
                        <div>
                            <FormControl className="w-full">
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
                                                    Pilih Kamar
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
                        <div className="w-full">
                            <label
                                htmlFor="phone"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                                NO. Telepon
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                placeholder="Masukkan No. Telepon"
                                className={`block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${errors.phone ? "border-red-500" : "border-gray-200"}`}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.phone}
                                </p>
                            )}
                        </div>
                        <div>
                            <FormControl
                                component="fieldset"
                                error={Boolean(errors.jenis_kelamin)}
                            >
                                <FormLabel
                                    id="demo-row-radio-buttons-group-label"
                                    sx={{
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        color: "grey.900",
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        mb: 1,
                                        fontFamily: "Figtree, sans-serif",
                                    }}
                                >
                                    JENIS KELAMIN
                                </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="jenis_kelamin"
                                    value={data.jenis_kelamin}
                                    onChange={(e) =>
                                        setData("jenis_kelamin", e.target.value)
                                    }
                                >
                                    <FormControlLabel
                                        value="Laki-laki"
                                        control={<Radio />}
                                        label="Laki-laki"
                                    />
                                    <FormControlLabel
                                        value="Perempuan"
                                        control={<Radio />}
                                        label="Perempuan"
                                    />
                                </RadioGroup>
                                {errors.jenis_kelamin && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.jenis_kelamin}
                                    </p>
                                )}
                            </FormControl>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 justify-end mt-4">
                        <div className="hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-blue-600 hover:rounded">
                            <Button
                                onClick={() =>
                                    router.visit(route("patient.index"))
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

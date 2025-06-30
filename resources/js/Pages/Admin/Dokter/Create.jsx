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
import { router } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        str: "",
        nama: "",
        jenis_kelamin: "",
        phone: "",
        alamat: "",
        spesialis: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("doctor.store"));
    };

    return (
        <DashboardLayout>
            <Head title="Tambah Data Dokter" />
            <Grid className="border-b-2 border-blue-200" container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Box p={2}>
                        <div className="font-bold text-2xl">
                            Tambah Data Dokter
                        </div>
                    </Box>
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
                <div className="max-w-4xl px-4 my-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="str"
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            >
                                NO. STR
                            </label>
                            <input
                                id="str"
                                name="str"
                                type="text"
                                value={data.str}
                                onChange={(e) => setData("str", e.target.value)}
                                placeholder="Masukkan STR 16 Digit"
                                className={`block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${errors.str ? "border-red-500" : "border-gray-200"}`}
                            />
                            {errors.str && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.str}
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
                            <div>
                                {" "}
                                <label
                                    htmlFor="spesialis"
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                >
                                    Spesialis
                                </label>
                                <input
                                    id="spesialis"
                                    name="spesialis"
                                    type="text"
                                    value={data.spesialis}
                                    onChange={(e) =>
                                        setData("spesialis", e.target.value)
                                    }
                                    placeholder="Masukkan Spesialis Dokter"
                                    className={`block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white ${errors.spesialis ? "border-red-500" : "border-gray-200"}`}
                                />
                                {errors.spesialis && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.spesialis}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <div>
                                {" "}
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
                        </div>
                        <div className="md:col-span-2">
                            <FormControl
                                component={"fieldset"}
                                error={Boolean(errors.jenis_kelamin)}
                            >
                                <FormLabel id="demo-row-radio-buttons-group-label">
                                    Jenis Kelamin
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
                                    router.visit(route("doctor.index"))
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

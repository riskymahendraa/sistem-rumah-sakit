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
import { useForm } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

export default function create() {
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
        post(route("/create-doctor"));
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
            <form action="/create-doctor" method="POST">
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
                                className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                            />
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
                                className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
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
                                className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            />
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
                                    className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                />
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
                                    className="block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <FormControl>
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
                                        value="pria"
                                        control={<Radio />}
                                        label="Pria"
                                    />
                                    <FormControlLabel
                                        value="perempuan"
                                        control={<Radio />}
                                        label="Wanita"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <div className="hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-blue-600 hover:rounded">
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
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

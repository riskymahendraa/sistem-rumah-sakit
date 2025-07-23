import React from "react";
import { useState, useRef, useEffect } from "react";
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
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";

export default function Edit({ patient, doctors, rooms }) {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        nama: patient.nama,
        nik: patient.nik,
        alamat: patient.alamat,
        phone: patient.phone,
        jenis_kelamin: patient.jenis_kelamin,
        doctors_id: patient.doctors_id,
        rooms_id: patient.rooms_id,
        _method: "PUT",
    });

    // Set selected doctor based on patient data
    useEffect(() => {
        if (patient?.doctors_id && doctors.length > 0) {
            const found = doctors.find((doc) => doc.id === patient.doctors_id);
            if (found) {
                setSelectedDoctor(found);
            }
        }
    }, [patient, doctors]);

    // Set selected room based on patient data
    useEffect(() => {
        if (patient?.rooms_id && rooms.length > 0) {
            const found = rooms.find((r) => r.id === patient.rooms_id);
            if (found) {
                setSelectedRoom(found);
            }
        }
    }, [patient, rooms]);

    const [openModal, setOpenModal] = useState(false);
    const [openRoomModal, setOpenRoomModal] = useState(false);
    const inputRef = useRef(null);
    setTimeout(() => {
        inputRef.current?.blur();
    }, 50);

    const handleSelectDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setData("doctors_id", doctor.id);
        setOpenModal(false);
    };
    const handleSelectRoom = (room) => {
        setSelectedRoom(room);
        setData((prev) => ({
            ...prev,
            rooms_id: room.id,
        }));
        setOpenRoomModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/patient/${patient.id}`);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        if (value.length <= 16) {
            setData((prev) => ({ ...prev, nik: value }));
        }
    };

    return (
        <DashboardLayout>
            <Head title="Edit Data Pasien" />
            <Grid className="border-b-2 border-blue-200" container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <Box p={2}>
                        <div className="font-bold text-2xl">
                            Edit Data Pasien
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
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    label="Pilih Dokter"
                                    value={
                                        selectedDoctor
                                            ? selectedDoctor.nama
                                            : ""
                                    }
                                    onClick={() => setOpenModal(true)}
                                    fullWidth
                                    inputRef={inputRef}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Box>
                            <Dialog
                                open={openModal}
                                onClose={() => setOpenModal(false)}
                                fullWidth
                                maxWidth="sm"
                            >
                                <DialogTitle>Daftar Dokter</DialogTitle>
                                <DialogContent dividers>
                                    <List>
                                        {doctors.map((doctor) => (
                                            <ListItem
                                                key={doctor.id}
                                                divider
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <ListItemText
                                                    primary={
                                                        <strong>
                                                            {doctor.nama}
                                                        </strong>
                                                    }
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                            >
                                                                <strong>
                                                                    Spesialis:
                                                                </strong>{" "}
                                                                {
                                                                    doctor.spesialis
                                                                }
                                                            </Typography>
                                                            <br />
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                            >
                                                                <strong>
                                                                    No HP:
                                                                </strong>{" "}
                                                                {doctor.no_hp}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                                <Button
                                                    variant="contained"
                                                    onClick={() =>
                                                        handleSelectDoctor(
                                                            doctor,
                                                        )
                                                    }
                                                >
                                                    Pilih
                                                </Button>
                                            </ListItem>
                                        ))}
                                    </List>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={() => setOpenModal(false)}
                                        variant="outlined"
                                    >
                                        Tutup
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <div>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    label="Pilih Kamar"
                                    value={
                                        selectedRoom ? selectedRoom.name : ""
                                    }
                                    onClick={() => setOpenRoomModal(true)}
                                    fullWidth
                                    inputRef={inputRef}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Box>
                            <Dialog
                                open={openRoomModal}
                                onClose={() => setOpenRoomModal(false)}
                                fullWidth
                                maxWidth="sm"
                            >
                                <DialogTitle>Daftar Kamar</DialogTitle>
                                <DialogContent dividers>
                                    <List>
                                        {rooms.map((room) => (
                                            <ListItem
                                                key={room.id}
                                                divider
                                                sx={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                }}
                                            >
                                                <ListItemText
                                                    primary={
                                                        <strong>
                                                            {room.name}
                                                        </strong>
                                                    }
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                            >
                                                                <strong>
                                                                    Tipe Kamar:
                                                                </strong>{" "}
                                                                {room.class}
                                                            </Typography>
                                                            <br />
                                                            <Typography
                                                                component="span"
                                                                variant="body2"
                                                            >
                                                                <strong>
                                                                    Kapsitas
                                                                    Tersedia:
                                                                </strong>{" "}
                                                                {
                                                                    room.available_beds
                                                                }{" "}
                                                                /{" "}
                                                                {room.bed_count}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                                <Button
                                                    variant="contained"
                                                    onClick={() =>
                                                        handleSelectRoom(room)
                                                    }
                                                >
                                                    Pilih
                                                </Button>
                                            </ListItem>
                                        ))}
                                    </List>
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={() => setOpenRoomModal(false)}
                                        variant="outlined"
                                    >
                                        Tutup
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>{" "}
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

import * as React from "react";
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccessibleIcon from "@mui/icons-material/Accessible";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { router, usePage } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

const NAVIGATION = [
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        path: "/",
    },
    {
        title: "Data Dokter",
        icon: <PeopleIcon />,
        path: "/doctor",
    },
    {
        title: "Data Pasien",
        icon: <AccessibleIcon />,
        path: "/pasien",
    },
    {
        title: "Data Kamar",
        icon: <MeetingRoomIcon />,
        path: "/kamar",
    },
];

const theme = createTheme();

export default function DashboardLayout({ children }) {
    const currentPath = usePage().url; // ← ini penting
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                >
                    <Toolbar className="flex justify-between w-full">
                        <div className="flex items-center gap-2">
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={toggleDrawer}
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                variant="h6"
                                noWrap
                                component={Link}
                                href={"/"}
                            >
                                SIRS
                            </Typography>
                        </div>
                        <div className="flex items-center gap-5">
                            <div>Hello, Admin</div>
                            <button
                                onClick={() => router.post("/logout")}
                                className="bg-red-100 hover:bg-red-300 text-red-600 font-semibold px-2 py-1 text-sm rounded-full transition-all"
                            >
                                <LogoutIcon /> Logout
                            </button>
                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="persistent"
                    open={open}
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: "border-box",
                        },
                    }}
                >
                    <Toolbar />
                    <Divider />
                    <List>
                        {NAVIGATION.map((item) => {
                            const isActive = currentPath === item.path;

                            return (
                                <ListItem
                                    key={item.title}
                                    onClick={() => router.visit(item.path)}
                                    className={` 
                                                    w-full flex items-center gap-3 px-2 py-1 my-2 rounded-full cursor-pointer
                                                    transition-all duration-200 text-left
                                                    ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
                                    disablePadding
                                >
                                    <div>
                                        <Box className="flex items-center px-4 py-2 w-full">
                                            <ListItemIcon className="min-w-[32px] text-inherit">
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography>
                                                        {item.title}
                                                    </Typography>
                                                }
                                            />
                                        </Box>
                                    </div>
                                </ListItem>
                            );
                        })}
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
}

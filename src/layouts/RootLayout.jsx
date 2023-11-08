import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NotesIcon from "@mui/icons-material/Notes";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import moment from "moment/moment";
import { redirect } from "react-router-dom";

const drawerWidth = 240;
const menus = [
  { text: "My Notes", icon: <NotesIcon /> },
  { text: "Create Note", icon: <AddCircleOutlineIcon /> },
];

export default function RootLayout() {
  const theme = useTheme();
  const [selectedMenu, setSelectedMenu] = useState("My Notes");
  const navigate = useNavigate();

  const handleMenuClick = (text) => {
    setSelectedMenu(text);
    if (text === "Create Note") {
      navigate("/create");
    } else if (text === "My Notes") {
      navigate("/");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
        }}
        PaperProps={{ sx: { width: drawerWidth } }}
        variant="permanent"
        anchor="left"
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ p: 2, fontFamily: "Permanent Marker" }}
        >
          Ninja Notes
        </Typography>
        <List>
          {menus.map((menu) => (
            <ListItem key={menu.text} disablePadding>
              <ListItemButton
                selected={selectedMenu === menu.text}
                onClick={() => handleMenuClick(menu.text)}
              >
                <ListItemIcon sx={{ color: theme.palette.primary.main }}>
                  {menu.icon}
                </ListItemIcon>
                <ListItemText
                  primary={menu.text}
                  sx={{ fontWeight: "600" }}
                  primaryTypographyProps={{ fontWeight: "600" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <AppBar sx={{ width: `calc(100% - ${drawerWidth}px)` }} elevation={0}>
        <Toolbar>
          <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>
            Today is the {moment().format("Do MMMM YYYY")}
          </Typography>
          <Typography>Mario</Typography>
          <Avatar alt="Remy Sharp" src="/public/mario-av.png" sx={{ ml: 2 }} />
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          width: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar sx={{ height: "100px" }}></Toolbar>
        <Outlet />
      </Box>
    </Box>
  );
}

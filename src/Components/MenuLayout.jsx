import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  Typography,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const menuItems = [
  { text: "Dashboard", path: "dashboard", icon: <DashboardIcon /> },
  { text: "Customers", path: "customers", icon: <PeopleIcon /> },
  { text: "Items", path: "items", icon: <InventoryIcon /> },
  { text: "Orders", path: "orders", icon: <ShoppingCartIcon /> },
  { text: "Users", path: "users", icon: <GroupIcon /> },
];

export default function MenuLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: darkMode ? "dark" : "light",
        background: {
          default: darkMode ? "#0c0f1a" : "#ffffff",
          paper: darkMode ? "#1a1f2b" : "#ffffff",
        },
        primary: {
          main: "#0e0563",
        },
      },
    });
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        sx={{ height: "100vh", bgcolor: theme.palette.background.default }}
      >
        <Drawer
          variant="permanent"
          sx={{
            width: 80,
            transition: "width 0.3s ease",
            overflowX: "hidden",
            "&:hover": {
              width: 220,
            },
            "& .MuiDrawer-paper": {
              width: 80,
              transition: "width 0.3s ease",
              overflowX: "hidden",
              backgroundColor: darkMode ? "#090c14" : "#050249",
              color: "#fff",
              borderRight: "none",
              "&:hover": {
                width: 220,
              },
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              py: 2,
            },
          }}
        >
          <Box>
            <Box
              sx={{
                textAlign: "center",
                mb: 3,
                transition: "0.3s",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold", p: 1 }}>
                SALES
              </Typography>
            </Box>

            <Box textAlign="center" mb={3}>
              <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
                <IconButton
                  onClick={() => setDarkMode(!darkMode)}
                  sx={{ color: "#fff" }}
                >
                  {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Tooltip>
            </Box>

            <List>
              {menuItems.map((m) => {
                const isActive = location.pathname.includes(m.path);
``
                return (
                  <ListItemButton
                    key={m.text}
                    onClick={() => navigate(`/menu/${m.path}`)}
                    sx={{
                      mx: 1,
                      mb: 1.5,
                      py: 1.2,
                      borderRadius: 2,
                      transition: "0.3s",
                      bgcolor: isActive
                        ? "rgba(255,255,255,0.22)"
                        : "transparent",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.18)",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <Box sx={{ minWidth: 40, textAlign: "center" }}>
                      {m.icon}
                    </Box>

                    <Typography
                      sx={{
                        opacity: 0,
                        width: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        transition: "0.3s",
                        ml: -2,
                        ".MuiDrawer-root:hover &": {
                          opacity: 1,
                          width: "auto",
                          ml: 1,
                        },
                      }}
                    >
                      {m.text}
                    </Typography>
                  </ListItemButton>
                );
              })}
            </List>
          </Box>

          <ListItemButton
            onClick={() => navigate("/")}
            sx={{
              mx: 1,
              my: 1,
              py: 1.2,
              width: 1,
              borderRadius: 1,
              color: "#ff6b6b",
              fontWeight: "bold",
              "&:hover": {
                bgcolor: "rgba(255, 82, 82, 0.05)",
                transform: "scale(1.05)",
              },
            }}
          >
            <Box sx={{ minWidth: 40, textAlign: "center" }}>
              <ExitToAppIcon />
            </Box>

            <Typography
              sx={{
                opacity: 0,
                width: 1,
                transition: "0.3s",
                ".MuiDrawer-root:hover &": {
                  opacity: 1,
                  width: "1",
                  ml: 1,
                },
              }}
            >
              Sign Out
            </Typography>
          </ListItemButton>
        </Drawer>

        <Box
          flexGrow={2}
          p={5}
          sx={{
            bgcolor: theme.palette.background.default,
            color: theme.palette.text.primary,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

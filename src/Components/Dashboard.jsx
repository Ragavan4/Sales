import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Grid, CircularProgress } from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";

import { getAllCustomers } from "./CustomerListApi";
import { getAllItems } from "./ItemListApi";
const API_ORDER_URL = "http://localhost:5141/api/OrderList";

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;

    if (start === end) return;

    let duration = 600;
    let increment = end / (duration / 20);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        start = end;
      }
      setDisplayValue(Math.floor(start));
    }, 20);

    return () => clearInterval(timer);
  }, [value]);

  return <>{displayValue}</>;
};

export default function Dashboard() {
  const [count, setCount] = useState({ customers: 0, items: 0, orders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const customers = await getAllCustomers();
      const items = await getAllItems();
      const ordersResp = await fetch(API_ORDER_URL);
      const ordersData = await ordersResp.json();

      setCount({
        customers: customers.length,
        items: items.length,
        orders: ordersData.length,
      });
    } catch (error) {
      console.log("Dashboard load error:", error);
    } finally {
      setLoading(false);
    }
  };

  const card = (title, value, color, Icon) => (
    <Paper
      elevation={4}
      style={{
        padding: "18px",
        borderRadius: "10px",
        borderLeft: `4px solid ${color}`,
        height: "110px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="subtitle1" style={{ fontWeight: "600" }}>
          {title}
        </Typography>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold", marginTop: "5px", color }}
        >
          <AnimatedNumber value={value} />
        </Typography>
      </Box>

      <Icon style={{ fontSize: 45, color, opacity: 0.8 }} />
    </Paper>
  );

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
        <Typography mt={2}>Loading dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          {card("Total Customers", count.customers, "#1976d2", PeopleIcon)}
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          {card("Total Items", count.items, "#2e7d32", InventoryIcon)}
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          {card("Total Orders", count.orders, "#d32f2f", ShoppingCartIcon)}
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          {card("Total User", count.orders, "#000000ff", GroupIcon)}
        </Grid>
      </Grid>
    </Box>
  );
}

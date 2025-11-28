import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5141/api";

export default function Order() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/OrderList`);
      const data = await response.json();

      console.log("API Response:", data);

      setOrders(data);
    } catch (error) {
      console.log("Error loading orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAddOrder = () => {
    navigate("/menu/orders/create");
  };

  
  const handleDelete = async (docEntry) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/OrderList/${docEntry}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Order deleted successfully");
        fetchOrders();
      } else {
        alert("Failed to delete order");
      }
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

 
  return (
     <div style={{ padding: "25px" }}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h11" fontWeight="bold">
          Order List
        </Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddOrder}>
          ADD ORDER
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3} sx={{ width: "100%" }}>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead >
            <TableRow  sx={{
                backgroundColor: "#0e0563ff",
                height: "35px",
                "& th": {
                  padding: "4px 8px",
                  lineHeight: "2rem",
                },
              }}>
              <TableCell sx={{ color: "white", fontSize: "13px" }}>Doc Num</TableCell>
              <TableCell sx={{ color: "white", fontSize: "13px" }}>Customer Code</TableCell>
              <TableCell sx={{ color: "white", fontSize: "13px" }}>Customer Name</TableCell>
              <TableCell sx={{ color: "white", fontSize: "13px" }}>Doc Date</TableCell>
              <TableCell sx={{ color: "white", fontSize: "13px" }}>Status</TableCell>
              <TableCell sx={{ color: "white", fontSize: "13px" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.length === 0 ? (
              <TableRow >
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography color="gray">No Orders Found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              orders.map((o, index) => (
                <TableRow sx={{
                  height: "10px",
                  "& td": {
                    padding: "4px 8px",
                    fontSize: "13px",
                    lineHeight: "1.6rem",
                  },
                }}
                key={index}>
                  <TableCell>{o.header.docNum}</TableCell>
                  <TableCell>{o.header.customerCode}</TableCell>
                  <TableCell>{o.header.customerName}</TableCell>
                  <TableCell>
                    {new Date(o.header.docDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{o.header.status}</TableCell>

                  <TableCell>
                   
                    <IconButton
                      color="primary"
                      onClick={() =>
                        navigate(`/menu/orders/create/${o.header.docEntry}`)
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>

                    
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(o.header.docEntry)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

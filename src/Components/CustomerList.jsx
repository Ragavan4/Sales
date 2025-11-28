import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Alert,
  Box,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllCustomers, addCustomer, deleteCustomer } from "./CustomerListApi";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    customerCode: "",
    customerName: "",
    address: "",
  });

  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getAllCustomers();
      setCustomers(data);
    } catch (error) {
      showAlert("Failed to fetch customers", "error");
    }
  };

  const showAlert = (message, severity) => {
    setAlert({ open: true, message, severity });
  };

  const handleAddCustomer = async () => {
    if (!newCustomer.customerCode || !newCustomer.customerName || !newCustomer.address) {
      showAlert("Please fill all fields", "error");
      return;
    }

    try {
      const added = await addCustomer(newCustomer);
      setCustomers([...customers, added]);
      setNewCustomer({ customerCode: "", customerName: "", address: "" });
      showAlert("Customer added successfully", "success");
    } catch {
      showAlert("Failed to add customer", "error");
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await deleteCustomer(id);

      
      setCustomers(customers.filter((c) => c.customerId !== id));

      showAlert("Customer deleted", "info");
    } catch {
      showAlert("Failed to delete customer", "error");
    }
  };

  return (
     <div style={{ padding: "25px" }}>
      

      <Paper style={{ padding: 12, marginBottom: 20 }}>
        <Typography variant="h9">Add New Customer</Typography>
        
        <Box  display="flex" gap={2} flexWrap="wrap" marginTop={2}>
          <TextField
            label="Customer Code"
          InputProps={{
            style: {
            height: '50px',
            marginRight:'2rem'
    },
  }}
            value={newCustomer.customerCode}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, customerCode: e.target.value })
            }
          />
          <TextField
            label="Customer Name" 
            value={newCustomer.customerName}
            InputProps={{
            style: {
            height: '50px', 
            marginRight:'2rem'
            
    },
  }} 
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, customerName: e.target.value })
            }
          />
          <TextField
            label="Address"
            InputProps={{
            style: {
            height: '50px',
            marginRight:'2rem'
            
    },
  }}

            value={newCustomer.address}
            onChange={(e) =>
              setNewCustomer({ ...newCustomer, address: e.target.value })
            }
          />
          <Button variant="contained" onClick={handleAddCustomer} sx={{  height: 48 }} >
            ADD CUSTOMER
          </Button>
        </Box>
     
      </Paper>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow  sx={{
                backgroundColor: "#0e0563ff",
                height: "35px",
                "& th": {
                  padding: "4px 8px",
                  lineHeight: "2rem",
                },
              }}>
              <TableCell sx={{color:"white"}}>ID</TableCell>
              <TableCell sx={{color:"white"}}>Customer Code</TableCell>
              <TableCell sx={{color:"white"}}>Customer Name</TableCell>
              <TableCell sx={{color:"white"}}>Address</TableCell>
              <TableCell sx={{color:"white"}}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.map((cust) => (
              <TableRow sx={{
                  height: "30px",
                  "& td": {
                    padding: "4px 8px",
                    fontSize: "13px",
                    lineHeight: "1.6rem",
                  },
                }} key={cust.customerId}>
                <TableCell>{cust.customerId}</TableCell>
                <TableCell>{cust.customerCode}</TableCell>
                <TableCell>{cust.customerName}</TableCell>
                <TableCell>{cust.address}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteCustomer(cust.customerId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={alert.severity}>{alert.message}</Alert>
      </Snackbar>
    </div>
  );
}

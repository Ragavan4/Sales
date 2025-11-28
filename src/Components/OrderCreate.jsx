import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { getAllCustomers } from "./CustomerListApi";
import { getAllItems } from "./ItemListApi";

const API_URL = "http://localhost:5141/api/OrderList";

export default function OrderCreate() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);

  const [order, setOrder] = useState({
    customerCode: "",
    customerName: "",
    address: "",
    docDate: "",
    docNum: "",
    lines: [
      {
        itemCode: "",
        itemName: "",
        price: 0,
        qty: 1,
        lineTotal: 0,
      },
    ],
  });

  const [orderTotal, setOrderTotal] = useState(0);

  
  useEffect(() => {
    async function loadData() {
      setCustomers(await getAllCustomers());
      setItems(await getAllItems());
    }
    loadData();
  }, []);

 
  useEffect(() => {
    if (!id) return;

    async function loadOrder() {
      const resp = await fetch(`${API_URL}/${id}`);
      if (!resp.ok) return;
      const data = await resp.json();

      const header = data.header;

      setOrder({
        customerCode: header.customerCode,
        customerName: header.customerName,
        address: header.shipTo,
        docDate: header.docDate.split("T")[0],
        docNum: header.docNum,
        lines: data.lines.map((l) => ({
          itemCode: l.itemCode,
          itemName: l.itemName,
          price: l.price,
          qty: l.qty,
          lineTotal: l.lineTotal,
        })),
      });

      setOrderTotal(data.lines.reduce((s, l) => s + l.lineTotal, 0));
    }

    loadOrder();
  }, [id]);

  
  useEffect(() => {
    if (id) return; 

    async function loadNextDocNum() {
      const resp = await fetch(`${API_URL}/next-docnum`);
      const next = await resp.text();

      setOrder((prev) => ({ ...prev, docNum: next }));
    }

    loadNextDocNum();
  }, [id]);

  
  const handleCustomerChange = (e) => {
    const code = e.target.value;
    const selected = customers.find((c) => c.customerCode === code);

    setOrder((prev) => ({
      ...prev,
      customerCode: code,
      customerName: selected?.customerName || "",
      address: selected?.address || "",
    }));
  };

 
  const handleLineChange = (idx, field, value) => {
    const updated = [...order.lines];

    if (field === "itemCode") {
      const item = items.find((i) => i.itemCode === value);
      updated[idx].itemCode = value;
      updated[idx].itemName = item?.itemName || "";
      updated[idx].price = item?.price || 0;
    } else {
      updated[idx][field] = Number(value);
    }

    updated[idx].lineTotal = updated[idx].price * updated[idx].qty;

    setOrder((prev) => ({ ...prev, lines: updated }));
    setOrderTotal(updated.reduce((sum, l) => sum + l.lineTotal, 0));
  };

  const addLine = () => {
    setOrder((prev) => ({
      ...prev,
      lines: [
        ...prev.lines,
        { itemCode: "", itemName: "", price: 0, qty: 1, lineTotal: 0 },
      ],
    }));
  };

  const deleteLine = (i) => {
    const updated = order.lines.filter((_, index) => index !== i);

    setOrder((prev) => ({ ...prev, lines: updated }));
    setOrderTotal(updated.reduce((s, l) => s + l.lineTotal, 0));
  };

  
  const saveOrder = async () => {
    const payload = {
      header: {
        docEntry: id ? Number(id) : 0,
        docNum: order.docNum,
        customerCode: order.customerCode,
        customerName: order.customerName,
        docDate: order.docDate,
        status: "Open",
        shipTo: order.address,
        docTotal: orderTotal,
        totalQty: order.lines.reduce((s, l) => s + l.qty, 0),
      },
      lines: order.lines.map((l, index) => ({
        docEntry: id ? Number(id) : 0,
        line: index,
        itemCode: l.itemCode,
        itemName: l.itemName,
        price: l.price,
        qty: l.qty,
        lineTotal: l.lineTotal,
      })),
    };

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/${id}` : API_URL;

    const resp = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (resp.ok) {
      alert(id ? "Order Updated!" : "Order Created!");
      navigate("/menu/orders");
    } else {
      alert("Saving failed");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold">
        {id ? "Edit Order" : "Create Order"}
      </Typography>

      <Box mt={3} display="flex" gap={2} flexWrap="wrap">
        <TextField
          select
          label="Customer Code"
          value={order.customerCode}
           InputProps={{
            style: {
            height: '50px',
    },
  }}
          onChange={handleCustomerChange}
          sx={{ width: 182 }}
        >
          {customers.map((c) => (
            <MenuItem key={c.customerCode} value={c.customerCode}>
              {c.customerCode}
            </MenuItem>
          ))}
        </TextField>

        <TextField label="Customer Name" value={order.customerName} InputProps={{
            style: {
            height: '50px',
    },
  }} />
        <TextField label="Address" value={order.address}  InputProps={{
            style: {
            height: '50px',
    },
  }}/>

        
        <TextField
          label="Doc Number"
          value={order.docNum}
           InputProps={{
            style: {
            height: '50px',
    },
  }}
          sx={{ width: 150 }}
        />

        <TextField
          label="Doc Date"
          type="date"
          sx={{ width: 150 }}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            style: {
            height: '50px',
    },
  }}
          value={order.docDate}
          onChange={(e) => setOrder({ ...order, docDate: e.target.value })}
        />
      </Box>

     
      <Box mt={3}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Code</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {order.lines.map((line, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <TextField
                      select
                      value={line.itemCode}
                       InputProps={{
            style: {
            height: '50px',
    },
  }}
                      onChange={(e) => handleLineChange(idx, "itemCode", e.target.value)}
                      sx={{ width: 150 }}
                    >
                      {items.map((i) => (
                        <MenuItem key={i.itemCode} value={i.itemCode}>
                          {i.itemCode}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>

                  <TableCell>
                    <TextField value={line.itemName} InputProps={{
            style: {
            height: '50px',
    },
  }} />
                  </TableCell>

                  <TableCell>
                    <TextField
                      type="number"
                      value={line.price}
                       InputProps={{
            style: {
            height: '50px',
    },
  }}
                      onChange={(e) => handleLineChange(idx, "price", e.target.value)}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      type="number"
                      value={line.qty}
                       InputProps={{
            style: {
            height: '50px',
    },
  }}
                      onChange={(e) => handleLineChange(idx, "qty", e.target.value)}
                    />
                  </TableCell>

                  <TableCell>{line.lineTotal}</TableCell>

                  <TableCell>
                    <Button color="error" onClick={() => deleteLine(idx)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Button sx={{ mt: 2 }} variant="outlined" onClick={addLine}>
          + Add Line
        </Button>
      </Box>

      <Typography variant="h6" mt={2}>
        Order Total: {orderTotal}
      </Typography>

      <Box mt={3} display="flex" gap={2}>
        <Button variant="contained" onClick={saveOrder}>
          {id ? "Update" : "Save"}
        </Button>

        <Button variant="outlined" onClick={() => navigate("/menu/orders")}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

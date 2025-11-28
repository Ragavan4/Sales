import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Pagination,
  Stack,
  CircularProgress,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { getAllItems } from "./ItemListApi";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  width: "250px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllItems()
      .then((data) => {
        setItems(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  const filteredRows = items.filter((item) => {
    const s = search.toLowerCase();
    return (
      item.itemName.toLowerCase().includes(s) ||
      item.itemCode.toLowerCase().includes(s)
    );
  });

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={30}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ padding: "25px" }}>
      <Typography variant="h10" gutterBottom>
        Item List
      </Typography>


      <Box display="flex" justifyContent="flex-end" mb={1}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>

          <StyledInputBase
            placeholder="Search…"
            value={search}
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </Search>
      </Box>


      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#0e0563ff",
                height: "40px",
                "& th": {
                  padding: "4px 8px",
                  color: "white",
                  fontSize: "13px",
                },
              }}
            >
              <TableCell>Id</TableCell>
              <TableCell>Item Code</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedRows.map((item, index) => (
              <TableRow
                key={item.id}
                sx={{
                  height: "30px",
                  "& td": {
                    padding: "4px 8px",
                    fontSize: "13px",
                  },
                }}
              >
                <TableCell>{startIndex + index + 1}</TableCell>
                <TableCell>{item.itemCode}</TableCell>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>₹{item.price}</TableCell>
                <TableCell
                  sx={{
                    color: item.stock < 10 ? "red" : "black",
                    fontWeight: item.stock < 10 ? "bold" : "normal",
                  }}
                >
                  {item.stock}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      
      <Box mt={2} display="flex" justifyContent="center">
        <Stack spacing={3}>
          <Pagination
            count={Math.ceil(filteredRows.length / rowsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            size="small"
            shape="rounded"
          />
        </Stack>
      </Box>
    </div>
  );
}

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./Api";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YoutubeIcon from "@mui/icons-material/YouTube";


export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [snack, setSnack] = useState({ open: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, pass);
      localStorage.setItem("user", JSON.stringify(response.user));
      setSnack({ open: true, message: response.message, type: "success" });

      setTimeout(() => navigate("/menu/dashboard"), 1500);
    } catch (error) {
      setSnack({ open: true, message: error.message, type: "error" });
    }
  };

  return  (
    <div >
    <Box fullWidth
      sx={{
        p: 10,
        justifyContent: "flex-end",
        alignItems: "center",
        marginLeft: "800px",  
      }}
    >
      <Paper
        elevation={1}
        sx={{ 
          width: 300,
          padding: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
          Login
        </Typography>

        <TextField
          sx={{
            "& .MuiInputBase-input": { fontSize: 13 },
            "& .MuiInputLabel-root": { fontSize: 13 },
          }}
          label="Email"
          size="small"
          InputProps={{
            style: {
              height: "40px",
              width: 300,
            },
          }}
          fullWidth
          margin="dense"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          sx={{
            "& .MuiInputBase-input": { fontSize: 14 },
            "& .MuiInputLabel-root": { fontSize: 14 },
          }}
          label="Password"
          size="small"
          InputProps={{
            style: {
              height: "40px",
              width: "300px",
            },
          }}
          type="password"
          fullWidth
          margin="dense"
          onChange={(e) => setPass(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, width: 300 }}
          onClick={handleLogin}
        >
          Sign In
        </Button>

        <Typography sx={{ mt: 2, textAlign: "center", fontSize: "13px" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            Register
          </Link>
        </Typography>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography sx={{ fontSize: "13px", mb: 1 }}>Follow us</Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon sx={{ color: "#1877F2" }} />
            </a>

            <a
              href="https://www.instagram.com/sullan_ragav?igsh=MW9jd2pjb3Z2a3g1NA=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon sx={{ color: "#ca1e97ff" }} />
            </a>

            <a
              href="https://x.com/RagaVa_Official?t=U8ADIH-bIFmKgkjvRlhShw&s=09"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon sx={{ color: "#1DA1F2" }} />
            </a>

           
             <a
              href="https://youtube.com/@ragava?si=HvA_ICuHg1fmrzsa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YoutubeIcon sx={{ color: "#ff0000ff" }} />
            </a> 
          </Box>
        </Box>

        <Snackbar
          open={snack.open}
          autoHideDuration={2000}
          onClose={() => setSnack({ ...snack, open: false })}
        >
          <Alert severity={snack.type}>{snack.message}</Alert>
        </Snackbar>
      </Paper>
    </Box>
    </div>
  );
}
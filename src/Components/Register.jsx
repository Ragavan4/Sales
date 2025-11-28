import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./Api";

export default function Register() {
  const [snack, setSnack] = useState({ open: false, message: "", type: "" });
  const [gender, setGender] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    gender: "",
  });

  const steps = ["Personal Info", "Address Details", "Account Details"];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 1) navigate("/");
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!formData.name || !formData.phone || !gender) {
        setSnack({ open: true, message: "Fill all required fields", type: "error" });
        return;
      }
    } else if (activeStep === 1) {
      if (!formData.city || !formData.state || !formData.country) {
        setSnack({ open: true, message: "Enter address details", type: "error" });
        return;
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      setSnack({ open: true, message: "Passwords do not match", type: "error" });
      return;
    }

    try {
      const response = await registerUser({ ...formData, gender });
      setSnack({ open: true, message: response.message, type: "success" });
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setSnack({ open: true, message: error.message, type: "error" });
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Paper
          elevation={6}
          sx={{
            p: 3,
            width: { xs: "100%", sm: "70%", md: "55%" },
            borderRadius: 4,
            backgroundColor: "#ffffff",
          }}
        >
         
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            textColor="primary"
            indicatorColor="primary"
            sx={{ mb: 2 }}
          >
            <Tab label="Register" />
            <Tab label="Login" />
          </Tabs>

         
          <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Grid container spacing={2}>

            {activeStep === 0 && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    label="Name"
                    name="name"
                    fullWidth
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    type="date"
                    label="DOB"
                    name="dob"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    label="Phone"
                    name="phone"
                    fullWidth
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} >
                  <FormControl >
                    
                    <RadioGroup
                      row
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      sx={{ justifyContent: "center" }}
                     
                    >
                      <FormControlLabel value="male"  control={<Radio sx={{color: "skyblue","&.Mui-checked": {color: "blue",},}} />} label="Male" />
                      <FormControlLabel value="female" control={<Radio sx={{color: "pink","&.Mui-checked": {color: "deeppink",},}} />} label="Female" />
                      <FormControlLabel value="other" control={<Radio sx={{color: "gray","&.Mui-checked": {color: "gray",},}} />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </>
            )}

           
            {activeStep === 1 && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField size="small" label="City" name="city" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size="small" label="State" name="state" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size="small" label="Country" name="country" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField size="small" label="Zipcode" name="zipcode" fullWidth onChange={handleInputChange} />
                </Grid>
              </>
            )}

           
            {activeStep === 2 && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField size="small" label="Email" name="email" fullWidth onChange={handleInputChange} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    onChange={handleInputChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    fullWidth
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            )}

           
            <Grid item xs={12} mt={1} padding={5}>
              <Box display="flex" justifyContent="center" gap={3}>

                {activeStep > 0 && (
                  <Button variant="outlined" onClick={handleBack}>
                    Back
                  </Button>
                )}

                {activeStep < 2 && (
                  <Button variant="contained" onClick={handleNext}>
                    Next
                  </Button>
                )}

                {activeStep === 2 && (
                  <Button variant="contained" onClick={handleRegister} justifyContent ="center">
                    Submit
                  </Button>
                )}

              </Box>
            </Grid>
          </Grid>

        
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

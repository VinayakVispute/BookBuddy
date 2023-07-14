import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Alert from "../../../Componenets/Alert";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import axios from "axios";

const theme = createTheme();

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [errorField, setErrorField] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [error, setError] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorField(false);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const handleChangeEmail = (event) => {
    const inputValue = event.target.value;
    setEmail(inputValue);

    if (submitClicked) {
      if (inputValue === "") {
        setEmailError("Username/Email is required");
      } else if (!isValidEmail(inputValue)) {
        setEmailError("Email is invalid");
      } else {
        setEmailError(null);
      }
    }
  };

  const handleChangestudentID = (event) => {
    const inputValue = event.target.value;
    setStudentId(inputValue);

    if (submitClicked && inputValue === "") {
      setError("Student ID is required");
    } else {
      setError(null);
    }
  };

  const handleChangeName = (event) => {
    const inputValue = event.target.value;
    setStudentName(inputValue);

    if (submitClicked && inputValue === "") {
      setError("Full Name is required");
    } else {
      setError(null);
    }
  };

  const handleChangePhoneNumber = (event) => {
    const inputValue = event.target.value;
    setPhoneNumber(inputValue);

    if (submitClicked) {
      if (inputValue === "") {
        setPhoneNumberError("Phone Number is required");
      } else if (!/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(inputValue)) {
        setPhoneNumberError("Phone Number is invalid");
      } else {
        setPhoneNumberError(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);

    // Validation before submitting the form
    if (
      studentId === "" ||
      password === "" ||
      rePassword === "" ||
      studentName === "" ||
      email === "" ||
      phoneNumber === "" ||
      !isValidEmail(email) ||
      password !== rePassword
    ) {
      // Show error message and prevent form submission
      setError("Please fill in all required fields correctly");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth", {
        email,
        password,
      });
      const { data } = response;

      if (data.success) {
        setMessage(data.message);
        setSeverity("success");
        setErrorField(true);
        // Redirect or perform any other actions upon successful login
      } else {
        setMessage(data.message);
        console.log(data.message);
        setSeverity("error");
        setErrorField(true);
      }
    } catch (error) {
      setMessage(error.response.data.message);
      console.log(error.response.data.message);
      setSeverity("error");
      setErrorField(true);
    }
  };

  return (
    <div className="h-screen">
      {errorField ? (
        <Alert
          onClose={handleClose}
          message={message}
          severity={severity}
          sx={{ mb: 2 }}
        />
      ) : null}
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100%" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/v1/AFourathon/bvthzyajwnyih9ttvi8c)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <ElectricBoltIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  fontFamily: "Azonix, sans-serif",
                }}
              >
                Student Registration !!!
              </Typography>

              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="studentId"
                  label="Student ID"
                  name="studentId"
                  autoComplete="off"
                  type="number"
                  value={studentId}
                  onChange={handleChangestudentID}
                  error={submitClicked && studentId === ""}
                  helperText={
                    submitClicked && studentId === ""
                      ? "Student ID is required"
                      : ""
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={submitClicked && password === ""}
                  helperText={
                    submitClicked && password === ""
                      ? "Password is required"
                      : ""
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="rePassword"
                  label="Password Confirmation"
                  type={showPassword ? "text" : "password"}
                  id="rePassword"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  error={submitClicked && rePassword !== password}
                  helperText={
                    submitClicked && rePassword !== password
                      ? "Passwords do not match"
                      : ""
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="studentName"
                  label="Full Name"
                  name="studentName"
                  autoComplete="off"
                  value={studentName}
                  onChange={handleChangeName}
                  error={submitClicked && studentName === ""}
                  helperText={
                    submitClicked && studentName === ""
                      ? "Full Name is required"
                      : ""
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Username/Email"
                  name="email"
                  autoFocus
                  autoComplete="off"
                  value={email}
                  onChange={handleChangeEmail}
                  error={submitClicked && (email === "" || emailError !== null)}
                  helperText={submitClicked ? emailError || "" : ""}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  id="phoneNumber"
                  label="Phone Number"
                  name="phoneNumber"
                  autoFocus
                  autoComplete="off"
                  value={phoneNumber}
                  onChange={handleChangePhoneNumber}
                  error={
                    submitClicked &&
                    (phoneNumber === "" || phoneNumberError !== null)
                  }
                  helperText={submitClicked ? phoneNumberError || "" : ""}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Already Registered?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Register;

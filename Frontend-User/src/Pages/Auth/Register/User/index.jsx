import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  InputAdornment,
  IconButton,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { toast } from "react-toastify";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import axios from "axios";

const theme = createTheme();

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [reshowPassword, setReShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [error, setError] = useState("null");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickReShowPassword = () => setReShowPassword((show) => !show);

  const handleChangePhoneNumber = (event) => {
    const inputValue = event.target.value;
    setPhoneNumber(inputValue);

    if (submitClicked) {
      if (inputValue === "") {
        setPhoneNumberError("Phone Number is required");
      } else if (!/^[6789]\d{9}$/.test(inputValue)) {
        setPhoneNumberError("Phone Number is invalid");
      } else {
        setPhoneNumberError(null);
      }
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
    console.log(imageFile);
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

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

  const handleInputChange = (event, setValue) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    if (submitClicked && inputValue === "") {
      setError("Field is required");
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);

    // Validation before submitting the form
    const isFormValid =
      studentId !== "" &&
      password !== "" &&
      rePassword !== "" &&
      studentName !== "" &&
      email !== "" &&
      phoneNumber !== "" &&
      isValidEmail(email) &&
      password === rePassword;

    if (!isFormValid) {
      setError("Please fill in all required fields correctly");
      toast.error("Please fill in all required fields correctly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("studentID", studentId);
      formData.append("name", studentName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phoneNumber", phoneNumber);
      formData.append("imageFile", imageFile);

      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { data } = response;
      console.log(data);

      if (data.success) {
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        const errorMessage = error.response.data.message;
        console.log(errorMessage);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    // console.log(error.response.config);
  };

  return (
    <div className="min-h-screen">
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
            loading="lazy"
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
                Student Registration Portal!!!
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
                  onChange={(e) => handleInputChange(e, setStudentId)}
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
                  onChange={(e) => handleInputChange(e, setPassword)}
                  error={submitClicked && password === ""}
                  helperText={
                    submitClicked && password === ""
                      ? "Password is required"
                      : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="rePassword"
                  label="Password Confirmation"
                  type={reshowPassword ? "text" : "password"}
                  id="rePassword"
                  value={rePassword}
                  onChange={(e) => handleInputChange(e, setRePassword)}
                  error={submitClicked && rePassword !== password}
                  helperText={
                    submitClicked && rePassword !== password
                      ? "Passwords do not match"
                      : ""
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickReShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
                  onChange={(e) => handleInputChange(e, setStudentName)}
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
                  helperText={
                    submitClicked
                      ? email === ""
                        ? "Username/Email is required"
                        : emailError || ""
                      : ""
                  }
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="tel"
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
                  helperText={
                    submitClicked
                      ? phoneNumber === ""
                        ? "Phone Number is required"
                        : phoneNumberError || ""
                      : ""
                  }
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  autoFocus
                  onChange={handleFileChange}
                  accept="image/jpeg, image/png"
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

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
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

const SignInSide = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorField, setErrorField] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [error, setError] = useState(null);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
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

    if (!isValidEmail(inputValue)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

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
        console.log(data);
        if (data.user.role === "student") {
          // Redirect to the student route
          navigate("/Student", { state: { user: data.user } });
        }
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
    <div className="bg-gray-900 min-h-screen">
    <div className="h-[100%] my-auto">
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
                "url(https://res.cloudinary.com/djqjag779/image/upload/f_auto,q_auto/v1/AFourathon/d2jluylot5h9k13jrloh)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
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
                Sign in
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
                  id="email"
                  label="Username/Email"
                  name="email"
                  autoFocus
                  autoComplete="off"
                  value={email}
                  onChange={handleChangeEmail}
                  error={error !== null} // Set the error prop based on whether there is an error message
                  helperText={error} // Display the error message
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>

    </div>
  );
};

export default SignInSide;

import React from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

function AlertMessage({ onClose, message, severity }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={true} // Set open prop value to true
      autoHideDuration={6000}
      onClose={onClose}
    >
      <MuiAlert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

export default AlertMessage;

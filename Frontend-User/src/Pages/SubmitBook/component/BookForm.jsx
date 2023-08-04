import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Alert from "../../../Componenets/Alert";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [bookCode, setBookCode] = useState("");
  const [genre, setGenre] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [errorField, setErrorField] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleBookCodeChange = (event) => {
    setBookCode(event.target.value);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleClose = () => {
    setErrorField(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitClicked(true);

    if (
      !title ||
      !author ||
      !description ||
      !bookCode ||
      !genre ||
      !imageFile
    ) {
      setErrorMessage("Please fill in all the fields.");
      setErrorField(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("description", description);
      formData.append("code", bookCode);
      formData.append("genre", genre);
      formData.append("imageUrl", imageFile);

      const response = await axios.post(
        "http://localhost:3000/books/addBook",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setErrorMessage("Book added successfully.");
        setSeverity("success");
        setErrorField(true);
        // Reset the form fields
        setTitle("");
        setAuthor("");
        setDescription("");
        setBookCode("");
        setGenre("");
        setImageFile(null);
        setSubmitClicked(false);
      } else {
        setErrorMessage("Error occurred while adding the book.");
        setSeverity("error");
        setErrorField(true);
      }
    } catch (error) {
      setErrorMessage("Error occurred while adding the book.");
      setSeverity("error");
      setErrorField(true);
    }
  };

  return (
    <div>
      {errorField && (
        <Alert
          onClose={handleClose}
          message={errorMessage}
          severity={severity}
          sx={{ mb: 2 }}
        />
      )}

      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          mt: 2,
          width: "80%",
          marginInline: "auto",
          padding: "25px",
          backgroundColor: "wheat",
          borderRadius: "5px",
          marginBlock: "25px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            m: 2,
            fontWeight: "800",
            fontFamily: "Azonix, sans-serif",
          }}
        >
          Add New Book
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="off"
          value={title}
          onChange={handleTitleChange}
          error={submitClicked && !title}
          helperText={submitClicked && !title && "Title is required"}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="author"
          label="Author"
          name="author"
          autoComplete="off"
          value={author}
          onChange={handleAuthorChange}
          error={submitClicked && !author}
          helperText={submitClicked && !author && "Author is required"}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          autoComplete="off"
          value={description}
          onChange={handleDescriptionChange}
          error={submitClicked && !description}
          helperText={
            submitClicked && !description && "Description is required"
          }
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="bookCode"
          label="Book Code"
          name="bookCode"
          autoComplete="off"
          value={bookCode}
          onChange={handleBookCodeChange}
          error={submitClicked && !bookCode}
          helperText={submitClicked && !bookCode && "Book Code is required"}
        />
        <FormControl required fullWidth error={submitClicked && !genre}>
          <FormLabel component="legend">Genre</FormLabel>
          <Select value={genre} onChange={handleGenreChange}>
            <MenuItem value="">Select Genre</MenuItem>
            <MenuItem value="fiction">Fiction</MenuItem>
            <MenuItem value="nonfiction">Non-Fiction</MenuItem>
            <MenuItem value="sci-fi">Sci-Fi</MenuItem>
            <MenuItem value="fantasy">Fantasy</MenuItem>
          </Select>
          {submitClicked && !genre && (
            <FormHelperText>Please select a genre</FormHelperText>
          )}
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          type="file"
          id="imageFile"
          name="imageFile"
          onChange={handleFileChange}
          accept="image/jpeg, image/png"
          error={submitClicked && !imageFile}
          helperText={submitClicked && !imageFile && "Image is required"}
        />
        <Button
          type="submit"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ mt: 2 }}
        >
          Add Book
        </Button>
      </Box>
    </div>
  );
};

BookForm.propTypes = {};

export default BookForm;

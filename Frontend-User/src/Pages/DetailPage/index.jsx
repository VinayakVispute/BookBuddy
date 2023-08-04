import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, Box } from "@mui/material";
import Alert from "../../Componenets/Alert";
import axios from "axios";

import {
  Grid,
  Paper,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  ThemeProvider,
} from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const theme = createTheme();

const BookDetailPage = () => {
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [error, setError] = useState(null);
  const [errorField, setErrorField] = useState(false);

  const [isEditable, setIsEditable] = useState(false);
  const [bookData, setBookData] = useState({
    id: "",
    title: "Book Title",
    author: "Book Author",
    description: "Book Description",
    code: "Book Code",
    genre: "Book Genre",
    isAllocated: false,
    allocatedTo: [],
    imageUrl: "",
  });

  const { Bookid } = useParams();
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorField(false);
  };

  const handleUpdateClick = () => {
    setIsEditable(!isEditable);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(bookData);
      // Make a POST request to update the book data
      const response = await axios.put(
        `http://localhost:3000/books/${bookData.id}`,
        bookData
      );

      console.log(response);
      console.log("Book data updated:", response.data);

      setIsEditable(false);
      setMessage(response.data.message);
      setSeverity("success");
      setErrorField(true);
    } catch (error) {
      console.error("Error updating book:", error);
      setMessage(error.message);
      setSeverity("error");
      setErrorField(true);
    }
  };

  const handleDelete = async (event) => {
    try {
      // Make a DELETE request to delete the book
      const response = await axios.delete(
        `http://localhost:3000/books/${bookData.id}`
      );
      console.log("Book deleted:", response.data);

      setMessage(response.data.message);
      setSeverity("success");
      setErrorField(true);
    } catch (error) {
      console.error("Error deleting book:", error);
      setMessage(error.message);
      setSeverity("error");
      setErrorField(true);
    }
  };

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/books/${Bookid}`
        );
        console.log(response.data);
        const book = response.data;

        if (!book) {
          // Book not found, redirect to 404 page
          setIsEditable(false);
          setMessage("Book Not Found ...");
          setSeverity("error");
          navigate("/404");
          return;
        }
        console.log(book.data.title);
        setBookData({
          id: book.data._id,
          title: book.data.title,
          author: book.data.author,
          description: book.data.description,
          code: book.data.code,
          genre: book.data.genre,
          isAllocated: book.data.isAllocated,
          allocatedTo: book.data.allocatedTo,
          imageUrl: book.data.imageUrl,
        });
        console.log(bookData);
      } catch (error) {
        console.error("Error retrieving book details:", error);
        setIsEditable(false);
        setMessage("Book Not Found ...");
        setSeverity("error");
        setError(error);
      }
    };

    fetchBookData();
  }, [Bookid, history]);

  return (
    <div className="h-[100%]">
      {errorField ? (
        <Alert
          onClose={handleClose}
          message={message}
          severity={severity}
          sx={{ mb: 2 }}
        />
      ) : null}
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className="bg-cover! bg-no-repeat"
              style={{
                backgroundImage: `url(${bookData.imageUrl})`,
                height: 375,
                width: 375,
              }}
            ></div>
          </Grid>

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
              <LibraryBooksIcon sx={{ m: 1, bgcolor: "secondary.main" }} />
              <Typography component="h1" variant="h5">
                Book Details
              </Typography>
              <form noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  disabled={!isEditable}
                  id="title"
                  name="title"
                  autoComplete="off"
                  value={bookData.title}
                  onChange={(e) =>
                    setBookData({ ...bookData, title: e.target.value })
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  disabled={!isEditable}
                  id="author"
                  name="author"
                  autoComplete="off"
                  value={bookData.author}
                  onChange={(e) =>
                    setBookData({ ...bookData, author: e.target.value })
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  multiline // Set multiline to true
                  rows={4} // Adjust the number of visible rows
                  disabled={!isEditable}
                  id="description"
                  name="description"
                  autoComplete="off"
                  value={bookData.description}
                  onChange={(e) =>
                    setBookData({ ...bookData, description: e.target.value })
                  }
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  disabled={!isEditable}
                  id="code"
                  name="code"
                  autoComplete="off"
                  value={bookData.code}
                  onChange={(e) =>
                    setBookData({ ...bookData, code: e.target.value })
                  }
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  disabled={!isEditable}
                  id="genre"
                  name="genre"
                  autoComplete="off"
                  value={bookData.genre}
                  onChange={(e) =>
                    setBookData({ ...bookData, genre: e.target.value })
                  }
                />

                {/* {bookData.isAllocated ? (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {bookData.allocatedTo.map((student) => (
                          <TableRow key={student.email}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>
                              <Link to={`/student/${student.id}`}>
                                <Button variant="contained">View</Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body1">
                    Allocated To: Nobody
                  </Typography>
                )} */}

                {!isEditable ? (
                  <>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      endIcon={<CloudUploadIcon />}
                      onClick={handleUpdateClick}
                    >
                      Update
                    </Button>
                  </>
                ) : (
                  <div className="flex justify-evenly">
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                    <Button
                      variant="contained"
                      // endIcon={<CloudUploadIcon />}
                      onClick={handleUpdateClick}
                    >
                      Back
                    </Button>
                  </div>
                )}
              </form>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default BookDetailPage;

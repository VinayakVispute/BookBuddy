import React, { Component } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Generate book data
function createData(id, date, name, genre, GivenTo, DueDate) {
  return { id, date, name, genre, GivenTo, DueDate };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Book 1",
    "Fiction",
    "Tupelo, MS",
    "19 Mar, 2019"
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Book 2",
    "Non-fiction",
    "London, UK",
    "18 Mar, 2019"
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Book 3",
    "Fiction",
    "Boston, MA",
    "19 Mar, 2019"
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Book 4",
    "Mystery",
    "Gary, IN",
    "17 Mar, 2019"
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Book 5",
    "Fiction",
    "Long Branch, NJ",
    "16 Mar, 2019"
  ),
];

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalBooks: 0,
      allocatedBooks: 0,
      genreDistribution: {},
    };
  }

  componentDidMount() {
    // Fetch the total number of books and allocated books from an API or calculate them in some way
    // For the sake of this example, let's assume the total number is 100 and the allocated books are 30
    const totalBooks = 100;
    const allocatedBooks = 30;

    // Calculate the distribution of books by genre
    const genreDistribution = this.calculateGenreDistribution();

    this.setState({ totalBooks, allocatedBooks, genreDistribution });
  }

  calculateGenreDistribution() {
    const genreDistribution = {};
    rows.forEach((row) => {
      if (genreDistribution[row.genre]) {
        genreDistribution[row.genre]++;
      } else {
        genreDistribution[row.genre] = 1;
      }
    });
    return genreDistribution;
  }

  render() {
    const { totalBooks, allocatedBooks, genreDistribution } = this.state;

    return (
      <div>
        <div className="bg-gray-900 p-5 m-5 border-0 rounded-lg">
        <div className="bg-gray-800 p-5 my-5 border-0 rounded-lg">
          <h1>Total Number of Books in the Library: {totalBooks}</h1>
          <h2>Number of Books Allocated to Students: {allocatedBooks}</h2>
        </div>
        <div className="bg-gray-800 p-5 my-5 border-0 rounded-lg">
          <h3 className="font-semibold text-lg">Genre Distribution</h3>
          <ul>
            {Object.entries(genreDistribution).map(([genre, count]) => (
              <li key={genre}>{`${genre}: ${count}`}</li>
            ))}
          </ul>
        </div>

        </div>

        <div className="bg-white border-0 rounded-lg p-5 m-5">
        <React.Fragment>
          <p className="text-lg font-semibold text-gray-800">Recent Books</p>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Given to</TableCell>
                <TableCell>Due date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.genre}</TableCell>
                  <TableCell>{row.GivenTo}</TableCell>
                  <TableCell>{row.DueDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="my-5 text-black font-semibold bg-gray-100 text-lg flex justify-evenly fles-wrap border-0 rounded-lg p-5 ">
          <a to="/student-search" className="mr-3 hover:underline">
            Student Search
          </a>
          <a to="/due-pending" className="mr-3 hover:underline">
            Due Pending Page
          </a>
          <a to="/books-dashboard" className=" hover:underline">
            Books Dashboard
          </a>

          </div>
          <Link
            color="primary"
            href="#"
            onClick={(event) => event.preventDefault()}
            sx={{ mt: 3 }}
          >
            See more History
          </Link>
        </React.Fragment>

        </div>
      </div>
    );
  }
}

export default Library;

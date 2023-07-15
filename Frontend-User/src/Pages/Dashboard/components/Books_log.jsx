import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

const Library = () => {
  const [totalBooks, setTotalBooks] = useState(0);
  const [allocatedBooks, setAllocatedBooks] = useState(0);
  const [genreDistribution, setGenreDistribution] = useState({});
  const [statistics, setStatistics] = useState([]);
  const [studentNames, setStudentNames] = useState({});

  useEffect(() => {
    const fetchLibraryStatistics = async () => {
      const calculateGenreDistribution = (rows) => {
        const genreDistribution = {};
        rows?.forEach((row) => {
          if (genreDistribution[row.genre]) {
            genreDistribution[row.genre]++;
          } else {
            genreDistribution[row.genre] = 1;
          }
        });
        return genreDistribution;
      };

      try {
        const response = await axios.get("http://localhost:3000/books");
        setStatistics(response?.data);
        console.log(response?.data?.data);
        setTotalBooks(response.data.data?.length);
        setAllocatedBooks(
          response.data.data?.filter((row) => row?.isAllocated !== false)
            ?.length
        );
        setGenreDistribution(calculateGenreDistribution(response.data.data));
      } catch (error) {
        console.error("Error fetching library statistics:", error);
      }
    };

    fetchLibraryStatistics();
  }, []);

  useEffect(() => {
    const fetchStudentName = async (studentId) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/students/${studentId}`
        );
        const { name } = response.data.student;
        setStudentNames((prevNames) => ({
          ...prevNames,
          [studentId]: name,
        }));
      } catch (error) {
        console.error("Error fetching student:", error);
        setStudentNames((prevNames) => ({
          ...prevNames,
          [studentId]: "Error fetching student",
        }));
      }
    };

    statistics?.data?.forEach((row) => {
      if (row.allocatedTo && !studentNames[row.allocatedTo]) {
        fetchStudentName(row.allocatedTo);
      }
    });
  }, [statistics]);

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
          <p className="text-lg font-semibold text-gray-500">Recent Books</p>
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
              {statistics?.data?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {row.isAllocated
                      ? new Date(row.allocationDate).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }
                        )
                      : "Not Allocated"}
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.genre}</TableCell>
                  <TableCell>
                    {row.allocatedTo
                      ? studentNames[row.allocatedTo]
                      : "Not Allocated"}
                  </TableCell>
                  <TableCell>
  {row.isAllocated ? new Date(row.dueDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }) : "Not Allocated"}
</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="my-5 text-black font-semibold bg-gray-100 text-lg flex justify-evenly fles-wrap border-0 rounded-lg p-5 ">
            <a href="/student-search" className="mr-3 hover:underline">
              Student Search
            </a>
            <a href="/due-pending" className="mr-3 hover:underline">
              Due Pending Page
            </a>
            <a href="/books-dashboard" className="hover:underline">
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
};

export default Library;

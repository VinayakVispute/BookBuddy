import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"

function Allocation_log({ user }) {
  const [allocatedBooks, setAllocatedBooks] = useState([]);
  const [showPassedDueBooks, setShowPassedDueBooks] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const Studentid = user.studentID;

  useEffect(() => {
    const fetchAllocatedBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books/allocated/${Studentid}`);
        setAllocatedBooks(response.data);
      } catch (error) {
        console.error("Error fetching allocated books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllocatedBooks();
  }, [Studentid]);

  const currentDate = new Date();

  const handleFilterButtonClick = () => {
    setShowPassedDueBooks(!showPassedDueBooks);
  };

  const filteredBooks = showPassedDueBooks
    ? allocatedBooks.data.filter((book) => {
        const dueDate = new Date(book.dueDate);
        return currentDate > dueDate;
      })
    : allocatedBooks.data;

  return (
    <div className="bg-gray-900 py-10 min-h-screen">
      <div className="p-5 bg-gray-800 border-0 shadow-lg shadow-black rounded-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Borrowed Books</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <div className="flex justify-between mb-4">
              <button
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2 ${
                  showPassedDueBooks ? "bg-gray-400" : ""
                }`}
                onClick={handleFilterButtonClick}
                disabled={isLoading}
              >
                Show Passed Due Books
              </button>
              <button
                className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ml-2 ${
                  !showPassedDueBooks ? "bg-gray-400" : ""
                }`}
                onClick={handleFilterButtonClick}
                disabled={isLoading}
              >
                Show All Books
              </button>
            </div>
            {filteredBooks.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="py-2">Book Title</th>
                    <th className="py-2">Due Date</th>
                    <th className="py-2">Allocation Date</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => {
                    const dueDate = new Date(book.dueDate);
                    const isDueDatePassed = currentDate > dueDate;

                    return (
                      <tr key={book._id} className={isDueDatePassed ? "bg-red-500" : ""}>
                        <td className="py-2">{book.title}</td>
                        <td className="py-2">{dueDate.toLocaleDateString()}</td>
                        <td className="py-2">
                          {new Date(book.allocationDate).toLocaleDateString()}
                        </td>
                        <td className="py-2">
                          <Link to={`/DetailPage/${book._id}`}>
                            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                              View
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <p>No books currently borrowed.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

Allocation_log.propTypes={
  user: PropTypes.string.isRequired,
}
export default Allocation_log;

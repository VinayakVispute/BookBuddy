import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types"

function Allocation_log({user}) {
  const [allocatedBooks, setAllocatedBooks] = useState([]);
  const Studentid = user.studentID;
  useEffect(() => {
    const fetchAllocatedBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books/allocated/${Studentid}`);
        setAllocatedBooks(response.data);
        console.log(allocatedBooks)
      } catch (error) {
        console.error("Error fetching allocated books:", error);
      }
    };

    fetchAllocatedBooks();
  }, []);
console.log(allocatedBooks)
  return (
    <div className="bg-gray-900 py-10 min-h-screen">
      <div className="p-5 bg-gray-800 border-0 shadow-lg shadow-black rounded-lg max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Borrowed Books</h2>
        {allocatedBooks.data && allocatedBooks.data.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2">Book Title</th>
                <th className="py-2">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {allocatedBooks.data.map((book) => (
                
                <tr key={book.id}>
                  <td className="py-2">{book.title}</td>
                  <td className="py-2">{book.dueDate.substring(0,10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No books currently borrowed.</p>
        )}
      </div>
    </div>
  );
}

Allocation_log.propTypes={
  user: PropTypes.string.isRequired,
}
export default Allocation_log;


function Allocation_log() {

    const student ={
        borrowedBooks: [
            { id: 1, title: "Book 1", dueDate: "2023-07-31" },
            { id: 2, title: "Book 2", dueDate: "2023-08-15" },
            { id: 3, title: "Book 3", dueDate: "2023-08-07" },
          ],
    }
  return (
    <div className="bg-gray-900 py-10 min-h-screen">
          <div className="p-5 bg-gray-800 border-0 shadow-lg shadow-black rounded-lg max-w-md  mx-auto ">
            <h2 className="text-xl font-bold mb-4">Borrowed Books</h2>
            {student.borrowedBooks.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="py-2">Book Title</th>
                    <th className="py-2">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {student.borrowedBooks.map((book) => (
                    <tr key={book.id}>
                      <td className="py-2">{book.title}</td>
                      <td className="py-2">{book.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No books currently borrowed.</p>
            )}
          </div>
        </div>
  )
}

export default Allocation_log

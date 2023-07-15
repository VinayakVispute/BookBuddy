import PropTypes from "prop-types"

const Book = ({ book }) => {
  return (
    <div className="bg-white shadow-md rounded-lg px-4 py-6 mb-4">
      <div className="flex items-center">
        <img
          src={book.cover}
          alt={book.title}
          className="w-32 h-40 object-cover rounded-lg"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{book.title}</h2>
          <p className="text-sm text-gray-600">{book.author}</p>
        </div>
      </div>
      <p className="text-gray-600">{book.description}</p>
    </div>
  );
};

Book.propTypes={
    book: PropTypes.string.isRequired,
}
export default Book;
// import { Description } from "@mui/icons-material";
import React from "react";
import PropTypes from "prop-types";

const BookForm = ({ onAddBook, onEditBook, onDeleteBook }) => {
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [Description, setDescription] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onAddBook) {
      onAddBook({ title, author, Description });
    } else if (onEditBook) {
      onEditBook({ title, author, Description });
    }
  };

  const handleDelete = () => {
    if (onDeleteBook) {
      onDeleteBook();
    }
  };

  return (
    <div className="bg-gray-900 py-10 min-h-screen">
      <div className="bg-gray-800 max-w-4xl mx-auto p-5  border-0 rounded-lg placeholder:bg-gray-600">
        <h1 className="text-3xl font-bold mb-4">Add New Book</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Book
          </button>
          {onEditBook && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Delete Book
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

BookForm.PropTypes={
}

export default BookForm;

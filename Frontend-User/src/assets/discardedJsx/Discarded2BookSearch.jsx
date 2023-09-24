import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import BookCard from "./components/BookCard";
import FilterBar from "./components/FilterBar";
import Spinner from "../../Componenets/Spinner";

const BookSearch = () => {
  const Thumb = useRef(null);
  const [pageNumber, setPageNumber] = useState(0);
  // const [bookData, setBookData] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null); // Added state for selected genre
  const itemsPerPage = 8;
  const bookData = useRef(null);
  const pageVisited = pageNumber * itemsPerPage;
  const filterBooks = () => {
    const Answer = selectedGenre
      ? bookData.current.filter((book) => {
          if (book.genre._id === selectedGenre) {
            return true;
          }
          return false;
        })
      : bookData.current;
    return Answer;
  };

  const dataToDisplay = async () => {
    const filteredBookData = await filterBooks();
    const resultantData = await calculatePageCount(filteredBookData);
    console.log(resultantData);
    Thumb.current = resultantData;
    return resultantData;
  };

  useEffect(() => {
    alert("useEffectonMOve");
    console.log(selectedGenre);
    if (!selectedGenre) {
      fetchData();
    }
    dataToDisplay();
  }, [pageNumber, selectedGenre]);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      // Fetch all books
      const response = await axios.get("http://localhost:3000/books");
      const data = response.data;
      alert("api call");
      if (data.success) {
        bookData.current = data?.data;
        const resultantData = await dataToDisplay();
        setFilteredBooks(resultantData);
      }

      // setDataToDisplay(slicedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleGenreChange = async (genre) => {
    console.log("data filtered");
    setSelectedGenre(genre);
    console.log(bookData);
    const final = await dataToDisplay();
    console.log(final);
    setFilteredBooks(Thumb.current);
    setPageNumber(0); // Reset page number to 0 when genre changes
  };

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Book Available
        </h2>
        <FilterBar onGenreChange={handleGenreChange} />
        {isLoading ? (
          <div className=" min-h-screen flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 min-h-screen justify-center">
            {filteredBooks?.map((book) => (
              <BookCard
                key={book?.id}
                title={book?.title}
                author={book?.author}
                description={book?.description}
                genre={book?.genre?.name}
                imageUrl={book?.imageUrl}
              />
            ))}
          </div>
        )}
        <div className="w-full flex justify-center pt-16">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageChange}
            renderOnZeroPageCount={null}
            containerClassName={"flex items-center -space-x-px h-8 text-sm"}
            previousLinkClassName={
              "flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }
            nextLinkClassName={
              "flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }
            disabledClassName={
              "flex items-center justify-center h-8 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }
            pageClassName={
              "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }
            breakClassName={
              "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }
            activeLinkClassName={
              "z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-white hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            }
          />
        </div>
      </div>
    </>
  );

  // Functions
};

export default BookSearch;

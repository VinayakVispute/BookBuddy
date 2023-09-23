import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import BookCard from "./components/BookCard";
import FilterBar from "./components/FilterBar";
import Spinner from "../../Componenets/Spinner";

const BookSearch = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null); // Added state for selected genre
  const itemsPerPage = 8;
  const pageVisited = pageNumber * itemsPerPage;

  useEffect(() => {
    fetchData();
  }, [pageNumber, selectedGenre]); // Fetch data whenever page number or selected genre changes

  const fetchData = async () => {
    setIsLoading(true); // Set isLoading to true when fetching data for a new page
    try {
      const response = await axios.get("http://localhost:3000/books");
      const data = response.data;

      if (data.success) {
        const slicedData = data?.data?.slice(
          pageVisited,
          pageVisited + itemsPerPage
        );
        setPageCount(Math.ceil(data?.data?.totalItems / itemsPerPage));
        setDataToDisplay(slicedData);
        setIsLoading(false); // Set isLoading back to false when data is available
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false); // Set isLoading to false in case of an error
    }
  };

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
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
            {dataToDisplay.map((book) => (
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
};

export default BookSearch;

import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCards from "./components/BookCards";
import FilterBar from "./components/FilterBar";
import Pagination from "./components/Pagination";
import Spinner from "../../Componenets/Spinner";

const BookSearch = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [bookData, setBookData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState([]); // Added state for selected genre
  const itemsPerPage = 8;
  const pageVisited = pageNumber * itemsPerPage;

  const calculatePageCount = (dummy) => {
    console.log("dummy", dummy);
    console.log(pageVisited, pageVisited + itemsPerPage);
    const slicedData = dummy.slice(pageVisited, pageVisited + itemsPerPage);
    setPageCount(Math.ceil(dummy.length / itemsPerPage));
    console.log(slicedData);

    return slicedData;
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data whenever page number or selected genre changes

  const fetchData = async () => {
    setIsLoading(true); // Set isLoading to true when fetching data for a new page
    try {
      const response = await axios.get("http://localhost:3000/books");
      const data = response.data;

      if (data.success) {
        setBookData(data?.data);

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

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Book Available
        </h2>
        <FilterBar
          setSelectedGenre={setSelectedGenre}
          setPageNumber={setPageNumber}
        />
        {isLoading ? (
          <div className=" min-h-screen flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <BookCards
            bookData={bookData}
            calculatePageCount={calculatePageCount}
            selectedGenre={selectedGenre}
          />
        )}
        <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
      </div>
    </>
  );
};

export default BookSearch;

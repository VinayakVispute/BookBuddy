import React, { useState } from "react";

const BookCard = ({ title, author, description, genre, imageUrl }) => {
  const [showMore, setShowMore] = useState(false);

  function handleShowMore() {
    setShowMore(!showMore);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="group relative flex-shrink-0">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4">
          <div>
            <h3 className="text-2xl font-semibold uppercase leading-normal whitespace-pre-line text-gray-700">
              {title}
            </h3>
            <div className="mt-4 flex flex-col gap-2 justify-between w-full">
              <p className="text-lg uppercase text-gray-500">{genre}</p>
              <p className="text-lg uppercase text-gray-500">{author}</p>
            </div>
            <div className="mt-4 text-gray-400">
              <div>
                {showMore ? description : description.substring(0, 100) + "..."}{" "}
                <span
                  className="text-blue-500 text-md cursor-pointer"
                  onClick={handleShowMore}
                >
                  Read More
                </span>
              </div>
            </div>
          </div>
          {/* More products... */}
        </div>
      </div>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mt-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[10rem] mx-auto"
      >
        <svg
          className="w-3.5 h-3.5 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 21"
        >
          <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
        </svg>
        Lend Book
      </button>
    </div>
  );
};

export default BookCard;

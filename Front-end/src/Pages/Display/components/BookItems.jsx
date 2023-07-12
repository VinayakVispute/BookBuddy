import React from "react";
import BookCard from "./BookCard";

function BookItems() {
  return (
    <div className="bg-white text-base-900 py-24 px-5">
      <div className=" max-w-4xl mx-auto">
        <div className="form-control mx-auto">
          <input
            type="text"
            placeholder="🔎 Search for Book"
            className="input input-bordered md:w-96"
          />
        </div>

        <div className="flex justify-around items-center flex-wrap max-w-4xl mx-auto">
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
      </div>
    </div>
  );
}

export default BookItems;

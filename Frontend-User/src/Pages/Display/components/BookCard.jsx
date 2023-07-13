import React from "react";

function BookCard() {
  return (
    <div className="card w-64 bg-base-100 shadow-xl my-5">
      <figure>
        <img
          src="https://static.vecteezy.com/system/resources/previews/000/626/977/original/education-book-logo-template-vector-illustration.jpg"
          alt="Book"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Book_Name
        </h2>
        <p>book is good.
        </p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Science</div>
          <div className="badge badge-outline">Engineering</div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;

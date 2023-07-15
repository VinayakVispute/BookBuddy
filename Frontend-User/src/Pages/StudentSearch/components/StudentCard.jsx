import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

function StudentCard({ student }) {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="card w-72 bg-gray-800 hover:shadow-lg hover:shadow-black my-5 px-2 py-5 transition duration-250 hover:-translate-y-2 mx-2">
      <figure>
        <img
          className="border-0 rounded-lg h-[285px]"
          src={student.imageUrl}
          alt="Student"
        />
      </figure>
      <div className="card-body p-4 text-white">
        <div className="font-bold text-2xl mb-2 text-center ">{student.name}</div>
        <div className="flex justify-evenly">
          <p>Student ID: {student.studentID}</p>
          <p>Email: {student.email}</p>
        </div>
        {student.description ? (
          showDescription ? (
            <p className="mx-5 max-w-[200px] text-gray-200 text-gray-200">
              {student.description}
            </p>
          ) : (
            <p className="mx-5 max-w-[200px] text-slate-700 text-base">
              {student.description.split(" ").slice(0, 25).join(" ")}
              {student.description.split(" ").length > 25 && "..."}
            </p>
          )
        ) : null}
        {student.description && (
          <span className="cursor-pointer" onClick={toggleDescription}>
            {showDescription ? "Less" : "More"}
          </span>
        )}
      </div>
      <div className="flex justify-center items-center">
        <Link
          to={`/student-detailpage/${student._id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-32"
        >
          View More
        </Link>
      </div>
    </div>
  );
}

StudentCard.propTypes = {
  student: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    studentID: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

export default StudentCard;

import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function BookCard({ title, author, image, description }) {
  const updatedDesc = description.split(" ").slice(0, 10).join(" ");

  const display_image =
    "https://th.bing.com/th/id/OIP.I5wxkhAJmmR3sWPFaCtEcQHaE8?pid=ImgDet&rs=1";


  return (
    <div className="card w-72 bg-gray-800 hover:shadow-lg hover:shadow-black my-5 p-2 transition duration-250 hover:-translate-y-2 mx-2">
      <figure>
        <img className="border-0 rounded-lg" src={display_image} alt="Book" />
      </figure>
      <div className="card-body p-4 text-white">
        <h2 className="card-title">{title}</h2>
        <p>author: {author}</p>
          <p className="mb-5">{updatedDesc}</p>
{/* 
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Science</div>
          <div className="badge badge-outline">Engineering</div>
        </div> */}
        <Link to="/Book" className="btn btn-primary w-32 mx-auto">
          more
        </Link>
      </div>
    </div>
  );
}

BookCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default BookCard;

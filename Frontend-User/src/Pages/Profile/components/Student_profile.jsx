import PropTypes from "prop-types";

function Student_profile({ user }) {
  // Sample student data

  const student = {
    name: user.name,
    id: user.studentID,
    email: user.email,
    contact: user.phoneNumber,
    imageUrl: user.imageUrl,
    borrowedBooks: user.borrowedBooks,
  };

  // Generate a unique student ID and QR code
  const uniqueId = `#${student.id}`;
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="flex flex-col  lg:flex-row lg:justify-center lg:items-center bg-gray-900 border-0 rounded-lg container py-20 mx-auto px-4">
        <div className="p-5 border-0 bg-gray-800 shadow-lg shadow-black rounded-lg max-w-md mx-auto lg:w-96 lg:mx-10">
          <img
            src={student.imageUrl}
            alt="Student QR Code"
            className="w-32 h-32 my-4 object-cover border-0 rounded-full hover:shadow-xl hover:shadow-gray-900 mx-auto"
          />

          <h1 className="text-2xl font-bold mb-4">Student Details</h1>
          <p className="mb-2">
            <span className="font-bold">Name:</span> {student.name}
          </p>
          <p className="mb-2">
            <span className="font-bold">Student ID:</span> {student.id}
          </p>
          <p className="mb-2">
            <span className="font-bold">Email:</span> {student.email}
          </p>
          <p className="mb-2">
            <span className="font-bold">Contact:</span> {student.contact}
          </p>
          <p className="mb-2">
            <span className="font-bold">Unique ID:</span> {uniqueId}
          </p>
        </div>
      </div>
    </div>
  );
}

Student_profile.protoTypes={
  user: PropTypes.string.isRequired,

}

export default Student_profile;

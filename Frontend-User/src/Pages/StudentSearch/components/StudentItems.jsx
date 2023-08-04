import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";
import StudentCard from "./StudentCard";

function StudentItems() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/students");
      setStudents(response.data.students);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStudents = students.filter((student) => {
    const searchTermWithoutSpaces = searchTerm
      .replace(/\s+/g, "")
      .toLowerCase();
    const studentNameWithoutSpaces = student.name
      .replace(/\s+/g, "")
      .toLowerCase();
    const studentIDWithoutSpaces = student.studentID
      .replace(/\s+/g, "")
      .toLowerCase();

    return (
      studentNameWithoutSpaces.includes(searchTermWithoutSpaces) ||
      studentIDWithoutSpaces.includes(searchTermWithoutSpaces)
    );
  });

  return (
    <div className="bg-gray-900 text-base-900 py-24 px-5 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="form-control mx-auto">
          <input
            type="text"
            placeholder="🔎 Search for Student"
            className="input input-bordered md:w-96 bg-white placeholder:text-black"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex justify-around items-stretch flex-wrap max-w-6xl mx-auto">
            {filteredStudents.map((student) => (
              <StudentCard key={student._id} student={student} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentItems;

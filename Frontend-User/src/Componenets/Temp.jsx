import React, { useState } from "react";
import axios from "axios";

function App() {
  const [studentID, setStudentID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("studentID", studentID);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("imageFile", imageFile);

    try {
      const response = await axios.post(
        "https://afourthanhackthon.onrender.com/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Student Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Student ID:</label>
          <input
            type="text"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Profile Image:</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/jpeg, image/png"
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;

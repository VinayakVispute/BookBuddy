import { Link } from "react-router-dom"



function Hero() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Unlock Infinite Literary Worlds.</h1>
          <p className="py-6">Discover, track, and access a vast library of books with BookBuddy. Login now to explore and check availability seamlessly.</p>
          <Link to="/login" className="btn btn-primary">Get Started</Link>
          <Link to="/login" className="btn btn-primary mx-4">LogIn</Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;

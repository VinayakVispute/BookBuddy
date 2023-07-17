import { Link } from "react-router-dom"



function Hero() {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800">
      <div className=" min-h-screen flex justify-center items-center text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Unlock Infinite Literary Worlds.</h1>
          <p className="py-6">Discover, track, and access a vast library of books with BookBuddy. Login now to explore and check availability seamlessly.</p>
          <Link to="/Auth" className="btn btn-primary">Get Started</Link>
          <Link to="/Auth" className="btn btn-primary mx-4">LogIn</Link>
        </div>
      </div>
      <div className="bg-gray-900 text-white py-10 px-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-5">Welcome to our Library Management System</h1>
        <p className="text-lg mb-10">
          Explore a world of knowledge at your fingertips. Our library management system offers a vast collection of books, magazines, and resources to enrich your learning experience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-gray-800 rounded-lg p-5 hover:shadow-lg hover:shadow-black">
            <h2 className="text-xl font-semibold mb-2">Discover</h2>
            <p>Browse through our extensive catalog of books and discover new authors, genres, and hidden gems.</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-5 hover:shadow-lg hover:shadow-black">
            <h2 className="text-xl font-semibold mb-2">Borrow</h2>
            <p>Take advantage of our borrowing system to easily check out books and keep track of your reading list.</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-5 hover:shadow-lg hover:shadow-black">
            <h2 className="text-xl font-semibold mb-2">Manage</h2>
            <p>Organize your borrowed books, set reminders for due dates, and easily renew or return items.</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-5 hover:shadow-lg hover:shadow-black">
            <h2 className="text-xl font-semibold mb-2">Recommendations</h2>
            <p>Receive personalized book recommendations based on your reading preferences and interests.</p>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl font-semibold mb-5">Join our Library Community</h2>
          <p className="text-lg mb-5">
            Become a part of our vibrant library community and enjoy additional benefits:
          </p>
          <ul className="list-disc list-inside">
            <li>Participate in book clubs and reading events</li>
            <li>Access digital resources, including e-books and audiobooks</li>
            <li>Connect with fellow readers and share recommendations</li>
            <li>Receive notifications about upcoming releases and author signings</li>
          </ul>
          <p className="text-lg mt-5">
            Don't miss out on the opportunity to broaden your literary horizons and immerse yourself in a world of imagination.
          </p>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default Hero;

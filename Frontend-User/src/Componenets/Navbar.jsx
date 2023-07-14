import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-black">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          BookBuddy
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Display">Books</Link>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://th.bing.com/th/id/OIP.VZF1wqsimq9U8sbFysuo2gHaFJ?pid=ImgDet&rs=1" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-black rounded-box w-52"
          >
            <li>
              <Link to="/Student/Profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/Admin/Dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/Student/Allocation">Allocated Books</Link>
            </li>
            <li>
              <Link to="/Admin/SubmitBook">Add Book</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

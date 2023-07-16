import { Link } from "react-router-dom";
import {  useLocation } from "react-router-dom";

function Navbar() {
  
  const location = useLocation();
  const isAuthenticated = Boolean(location?.state?.user);
  
  console.log(isAuthenticated);

  return (
    <div className="flex justify-end bg-black p-2">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          BookBuddy
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex">
          <ul className="font-bold flex justify-around items-center px-1">
            <li className="mx-2 hover:text-blue-400">
              <Link to="/">Home</Link>
            </li>
            <li className="mx-2 hover:text-blue-400">
              <Link to="/Display">Books</Link>
            </li>
          </ul>
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
            <div className={isAuthenticated ? "visible" : "hidden" }>
            <li>
              <Link to="/Student" className="justify-between">
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

            </div>
            
            <li>
              <Link to="/Auth">Login</Link>
            </li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

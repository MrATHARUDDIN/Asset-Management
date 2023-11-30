import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./firebase config/Private";
import useAdmin from "../Hook/useAdmin";
import logo from "../assets/abstract-colorful-bird_621127-276.jpg";
const Navbar = () => {
  const { user, LogOut } = useContext(AuthContext);
  const handlelogout = () => {
    LogOut();
  };
  const [isAdmin] = useAdmin();
  return (
    <nav className="mb-20">
      <div className="max-w-screen-xl text-white bg-gray-500 rounded-full  mx-auto relative z-20 flex justify-between items-center">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dd text-black dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {!user && (
                <>
                  <li>
                    <NavLink to="/" className="mr-2">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Employee" className="ml-2">
                      Join as Employee
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/Hr" className="ml-2">
                      Join as HR/Admin
                    </NavLink>
                  </li>
                </>
              )}
              {isAdmin && (
                <>
                  <li>
                    <NavLink to="/Asset" className="ml-2">
                      Asset List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/AddAsset" className="ml-2">
                      Add an Asset
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/AddEmployee" className="ml-2">
                      Add an Employee
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            {
              <img src={logo} alt="" className="w-12 mt-1 rounded-full" />
              }
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {!user && (
              <>
                <li>
                  <NavLink to="/" className="mr-2">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Employee" className="ml-2">
                    Join as Employee
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Hr" className="ml-2">
                    Join as HR/Admin
                  </NavLink>
                </li>
              </>
            )}
            {user && !isAdmin && (
              <>
                <li>
                  <NavLink to="/" className="mr-2">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/CustomReq" className="mr-2">
                    Custom Request
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/AssetRequest" className="mr-2">
                    Request for an Asset
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/MyAsset" className="mr-2">
                    MyAsset
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/MyTeam" className="mr-2">
                   My Team
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Profile" className="mr-2">
                  Profile
                  </NavLink>
                </li>
              </>
            )}
            {user && isAdmin && (
              <>
               <li>
                  <NavLink to="/" className="">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Asset" className="">
                    Asset List
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Allrequests" className="">
                  All Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/AddAsset" className="">
                    Add Asset
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/AddEmployee" className="">
                    Add Employee
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/CustomRequests" className="">
                  Custom Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/MyEmployee" className="">
                  My Employee
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Profile" className="">
                  Profile
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* Login Button */}
        <div className="navbar-end flex">
          {user && !isAdmin && (
            <div className="w-10 mr-5 mt-1 ml-2 rounded-full">
              <img src={user.photoURL} alt="" />
            </div>
          )}
          {user && isAdmin &&(
            <div className="w-20 h-20 mt-6 rounded-full">
              <img src={user.photoURL} alt="" />
            </div>
          )}
          {user && !isAdmin && (
            <h1 className="text-lg mt-3 mb-2 mr-4 font-bold">
              {user.displayName}
            </h1>
          )}
          {user && isAdmin && (
            <h1 className="text-sm mt-6 mb-2 mr-4 font-bold">
              {user.displayName}
            </h1>
          )}
          {user && isAdmin &&
            <button
              className="btn bg-gray-500 mt-6 mr-6 text-white"
              onClick={handlelogout}
            >
              Log Out
            </button>
}
          {user && !isAdmin &&
            <button
              className="btn bg-gray-500 mt-1 mr-6 text-white"
              onClick={handlelogout}
            >
              Log Out
            </button>
}
          {!user && <Link to="/Login">
              <button className="btn bg-gray-500 lg:mr-10 md:mr-6 text-white">
                Login
              </button>
            </Link>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../store/AuthProvider";

function Navbar() {
  const { authUser, isHost } = useAuth();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isSticky, setIsSticky] = useState(false);
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = (
    <>
      <li><Link to="/" className="hover:text-primary">Home</Link></li>
      <li><Link to="/course" className="hover:text-primary">Course</Link></li>
      {isHost && <li><Link to="/add-book" className="hover:text-primary">Add Book</Link></li>}
    </>
  );

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 max-w-screen-2xl mx-auto md:px-20 px-4 transition-all duration-300 ${
          isSticky ? "shadow-md bg-base-200 dark:bg-slate-600" : ""
        } dark:bg-slate-600 dark:text-white`}
      >
        <div className="navbar">
          {/* Navbar Start */}
          <div className="navbar-start">
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
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
              <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-slate-700 dark:text-white rounded-box w-52">
                {navLinks}
              </ul>
            </div>
            <Link to="/" className="text-2xl font-bold cursor-pointer">BookStore</Link>
          </div>

          {/* Navbar Center */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-black dark:text-white">
              {navLinks}
            </ul>
          </div>

          {/* Navbar End */}
          <div className="navbar-end space-x-3">
            {/* Search Box - Hide on mobile */}
            <label className="hidden md:flex items-center border px-3 py-2 rounded-md dark:bg-slate-800">
              <input
                type="text"
                className="grow outline-none px-1 bg-transparent dark:text-white"
                placeholder="Search"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>

            {/* Theme Toggle */}
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                className="theme-controller"
                checked={theme === "dark"}
                onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              />
              <svg
                className="swap-off fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.75 15.5a9 9 0 01-11.25-11.25 9 9 0 1011.25 11.25z" />
              </svg>
              <svg
                className="swap-on fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 4.5v-2m0 19v-2m7.07-14.14l1.42 1.42M4.93 19.07l1.42-1.42M19.5 12h2m-19 0h2m14.14 7.07l1.42-1.42M4.93 4.93l1.42 1.42M12 6.75a5.25 5.25 0 110 10.5 5.25 5.25 0 010-10.5z" />
              </svg>
            </label>

            {/* Login / Logout */}
            {authUser ? (
              <Logout />
            ) : (
              <div>
                <button
                  className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </button>
                <Login />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

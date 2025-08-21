import { NavLink, Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <div className="navbar bg-base-100 shadow-sm">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About Us</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>
              </ul>
            </div>
            <NavLink to="/" className="btn btn-ghost text-xl">Uthao Parcel</NavLink>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
          </div>
          <div className="navbar-end">
            <NavLink to="/login" className="btn btn-primary">Login</NavLink>
          </div>
        </div>
      </header>

      {/* 👇 main will expand */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-10">
        <aside>
          <p>Copyright © 2025 - All right reserved by Uthao Industries Ltd</p>
        </aside>
      </footer>
    </div>
  );
}

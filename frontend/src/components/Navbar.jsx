import { NavLink } from "react-router-dom";
import { useState } from 'react';

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink
        to="/"
        className="bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 text-white font-bold text-xl px-4 py-2 rounded-lg shadow-lg hover:opacity-90"
      >
        Hospital Food Delivery Management
      </NavLink>

      <nav className='flex text-lg gap-7 font-medium'>
        <NavLink to='/Signup' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          SignUp
        </NavLink>
        <NavLink to='/Login' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          LogIn
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;

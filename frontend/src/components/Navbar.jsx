import { NavLink } from "react-router-dom";
import { useState } from 'react';

const Navbar = () => {
  return (
    <header className='header'>
      <NavLink
        to="/"
        className="font-bold w-20 px-4 py-2 rounded-lg shadow-lg "
      >
        <img src="\home.webp" alt="logo"/>
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

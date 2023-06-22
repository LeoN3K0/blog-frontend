import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div>
      <nav className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#1E1926] text-white">
        <div>
          <h1 className="text-3xl font-bold">Blog App</h1>
        </div>

        {/*Menu*/}
        <ul className="hidden md:flex">
          <li className="border-white hover:border-b"><Link to="/">Home</Link></li>
          <li className='border-white hover:border-b'><Link to="/blog">Blog</Link></li>
          <li className='border-white hover:border-b'><Link to="/login">Login</Link></li>
        </ul>
        
        {/*Hamburger*/}
        <div onClick={handleClick} className='md:hidden z-10 hamburger'>
          {!nav ? <FaBars/> : <FaTimes/>}
        </div>

        {/*Mobile Menu*/}        
        <ul className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-[#1e1926] flex flex-col justify-center items-center'}>
          <li className="py-6 text-4xl border-white hover:border-b"><Link onClick={handleClick} to="/">Home</Link></li>
          <li className="py-6 text-4xl border-white hover:border-b"><Link onClick={handleClick} to="/blog">Blog</Link></li>
          <li className="py-6 text-4xl border-white hover:border-b"><Link onClick={handleClick} to="/login">Login</Link></li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;

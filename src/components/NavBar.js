import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if(user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  },[]);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#1E1926] text-white">
        <div>
          <h1 className="text-3xl font-bold"><Link to="/">Blog App</Link></h1>
        </div>

        {/*Menu*/}
        <ul className="hidden md:flex">
          <li className="border-white hover:border-b"><Link to="/home">Home</Link></li>
          <li className='border-white hover:border-b'><Link to="/blogs">Blogs</Link></li>
          {currentUser ? (
            <>
            <li key="username" className='border-white hover:border-b'>
              <Link to="/profile">{currentUser.username}</Link>
            </li>
            <li key="logout" className="border-white hover:border-b">
              <a href="/login" onClick={logOut}>LogOut</a>
            </li>
          </>
          ) : (
            <li className='border-white hover:border-b'><Link to="/login">Login</Link></li> 
          )}
        </ul>
        
        {/*Hamburger*/}
        <div onClick={handleClick} className='md:hidden z-10 hamburger'>
          {!nav ? <FaBars/> : <FaTimes/>}
        </div>

        {/*Mobile Menu*/}        
        <ul className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-[#1e1926] flex flex-col justify-center items-center'}>
          <li className="py-6 text-4xl border-white hover:border-b"><Link onClick={handleClick} to="/">Home</Link></li>
          <li className="py-6 text-4xl border-white hover:border-b"><Link onClick={handleClick} to="/blogs">Blogs</Link></li>
          {currentUser ? (
            <>
            <li className='py-6 text-4xl border-white hover:border-b'><Link onClick={handleClick} to="/profile">{currentUser.username}</Link></li>
            <li className="py-6 text-4xl border-white hover:border-b"><a href="/login" onClick={logOut}>LogOut</a></li>
            </>
          ) : (
            <li className='py-6 text-4xl border-white hover:border-b'><Link onClick={handleClick} to="/login">Login</Link></li> 
          )}
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;

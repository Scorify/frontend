import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='bg-gray-800 text-white'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link
              to='/'
              className='flex flex-shrink-0 gap-2 items-center rounded-md hover:text-white hover:bg-gray-700 p-1'
            >
              <img src='scorify.svg' className='w-7 h-7' />
              <h1 className='text-2xl text-bold'>Scorify</h1>
            </Link>
            <div className='hidden md:block ml-10 flex items-baseline space-x-4'>
              <ul className='flex space-x-4'>
                <li>
                  <Link
                    to='/home'
                    className='hover:text-gray-300 rounded-md hover:text-white hover:bg-gray-700 p-2'
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to='/about'
                    className='hover:text-gray-300 rounded-md hover:text-white hover:bg-gray-700 p-2'
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='md:hidden'>
            <button
              onClick={toggleMenu}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 p-2'
            >
              <FontAwesomeIcon
                className='w-6 h-6'
                icon={isOpen ? faTimes : faBars}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3`}
      >
        <ul className='flex space-x-4'>
          <li>
            <Link
              to='/home'
              className='hover:text-gray-300 rounded-md hover:text-white hover:bg-gray-700 p-2'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/about'
              className='hover:text-gray-300 rounded-md hover:text-white hover:bg-gray-700 p-2'
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

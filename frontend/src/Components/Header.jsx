import { Navbar } from 'flowbite-react';
import React, { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMoon } from 'react-icons/fa';
import { MdOutlineLightMode } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../app/theme/themSlice';
import { LogoutUser, setLoading } from '../app/user/userSlice';

function Header() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { loggedIn } = useSelector((state) => state.user);

  const logoutHandler = useCallback(() => {
    dispatch(LogoutUser());
    dispatch(setLoading(false));
    navigate('/register');
  }, [dispatch, navigate]);

  const toggleThemeHandler = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <Navbar className="stickyPosition w-full z-10 mb-30 border-b-2 dark:bg-gray-800">
      <Link to="/" className="font-bold items-center flex l">
        <span className="px-2 py-1 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-900 rounded-lg text-white">
          PreP
        </span>
        NITA
      </Link>
      <div className="flex items-center gap-2 md:order-2">
        <button
          className="w-13 h-10 px-2"
          onClick={toggleThemeHandler}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <FaMoon /> : <MdOutlineLightMode size={20} />}
        </button>
        {!loggedIn && (
          <Link to="/register">
            <button className="tracking-wider border border-gray-500 dark:border-gray-400 font-bold rounded-lg px-2 py-1.5 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-green-500">
              Login
            </button>
          </Link>
        )}
        {loggedIn && (
          <button
            className="tracking-wide border border-gray-500 dark:border-gray-400 font-bold rounded-lg px-2 py-1.5 hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-red-500"
            onClick={logoutHandler}
          >
            Logout
          </button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <div className="flex flex-col md:flex-row md:gap-4">
          <Navbar.Link active={path === '/'} as="div">
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/quizes'} as="div">
            <Link to="/quizes">Quizes</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/questions'} as="div">
            <Link to="/questions">Questions</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/interview'} as="div">
            <Link to="/interview">Interviews</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/experience'} as="div">
            <Link to="/experience">Experience</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/contribute'} as="div">
            <Link to="/contribute">Contribute</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/dashboard'} as="div">
            <Link to="/dashboard">Dashboard</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/profile'} as="div">
            <Link to="/profile">Profile</Link>
          </Navbar.Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;

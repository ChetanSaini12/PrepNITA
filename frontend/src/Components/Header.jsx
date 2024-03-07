import { Navbar, Button } from 'flowbite-react'
import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaMoon, FaSun } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../app/theme/themSlice'
import Lottie from 'react-lottie';
import animationData from '../../src/lotties/startup.json';
import { LogoutUser} from '../app/user/userSlice'


function Header() {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useSelector(state => state.theme)
    const { loggedIn } = useSelector((state) => state.user);

    const logoutHandler = () => {
        dispatch(LogoutUser());
        return navigate('/register');
    };
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        
    };


    return (
        <Navbar>
            <Link to="/" className='font-bold text-lg flex-col '>
                
            
                <span className='px-2 py-1 bg-gradient-to-r from from-indigo-500  via-purple-500 to-pink-500 rounded-lg text-white text-lg font-bold ab'>PreP</span> NITA
            </Link>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 border-spacing-2 sm:inline' color='grey' pill onClick={() => {
                    dispatch(toggleTheme())
                }}>
                    {
                        theme === 'light' ? <FaMoon></FaMoon> : <FaSun></FaSun>
                    }
                </Button>
                {!loggedIn && (
                    <Link to='/register' >
                        <Button gradientDuoTone='purpleToBlue' outline >Login</Button>
                    </Link>
                )}
                {loggedIn && (
                    <Button gradientDuoTone='purpleToBlue' outline onClick={logoutHandler} >Logout</Button>
                )}

                <Navbar.Toggle></Navbar.Toggle>
            </div>
            <Navbar.Collapse>
                {/* <Navbar.Link active={path==='/'}  as={'div'}> */}
                <Navbar.Link className={path === '/' ? "nav-links-active" : "nav-links"} as={'div'}>
                    <Link to='/'>Home</Link>
                </Navbar.Link>
                {/* <Navbar.Link active={path==='/quizes'} as={'div'}> */}
                <Navbar.Link className={path === '/quizes' ? "nav-links-active" : "nav-links"} as={'div'}>
                    <Link to='/quizes'>Quizes</Link>
                </Navbar.Link>
                {/* <Navbar.Link active={path==='/dashboard'} as={'div'}> */}
                <Navbar.Link className={path === '/dashboard' ? "nav-links-active" : "nav-links"} as={'div'}>
                    <Link to='/dashboard'>Dashboard</Link>
                </Navbar.Link>
                {/* <Navbar.Link active={path==='/interview'} as={'div'}> */}
                <Navbar.Link className={path === '/interview' ? "nav-links-active" : "nav-links"} as={'div'}>
                    <Link to='/interview'>Interviews</Link>
                </Navbar.Link>
                {/* <Navbar.Link active={path==='/discuss'} as={'div'}> */}
                <Navbar.Link className={path === '/discuss' ? "nav-links-active" : "nav-links"} as={'div'}>
                    <Link to='/discuss'>Discuss</Link>
                </Navbar.Link>
                <Navbar.Link className={path === '/profile' ? "nav-links-active" : "nav-links"} as={'div'}>
                    <Link to='/profile'>Profile</Link>
                </Navbar.Link>

            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
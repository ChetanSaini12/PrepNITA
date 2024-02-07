import { Navbar, TextInput,Button } from 'flowbite-react'
import React from 'react'
import {Link, useLocation} from "react-router-dom"
import {AiOutlineSearch} from "react-icons/ai"
import {FaMoon,FaSun} from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../app/theme/themSlice'
import '../CSS/header.css'

function Header() {
    const path=useLocation().pathname;
    const dispatch=useDispatch()
    const {theme}=useSelector(state=>state.theme)
    return (
      <Navbar className='navbar'>
          <Link to="/" className='nav-logo'>
              <span className='nav-logo-name'>MindSet</span>
          </Link>
          {/* <form >
              <TextInput
                  type='text'
                  placeholder='Search...'
                  rightIcon={AiOutlineSearch}
                  className='hidden lg:inline bg-slate-600'
              >
  
              </TextInput>
  
          </form> */}
          {/* <Button className='w-10 h-10' color='gray' pill>
              <AiOutlineSearch></AiOutlineSearch>
          </Button> */}
          <div className='flex gap-2 md:order-2'>
              <Button className='w-12 h-10 sm:inline' color='grey' pill onClick={()=>{
                dispatch(toggleTheme())
              }}>
                {
                    theme==='light' ?<FaMoon></FaMoon>:<FaSun></FaSun>
                }
              </Button>
              <Button className='w-12 h-10 text-2xl sm:inline' pill><FaMoon/></Button>
              
              <Link to='/register'>
                  <Button gradientDuoTone='purpleToBlue' outline>Register/Login</Button>
              </Link>
              <Navbar.Toggle></Navbar.Toggle>
          </div>
          <Navbar.Collapse>
              {/* <Navbar.Link active={path==='/'}  as={'div'}> */}
              <Navbar.Link className= {path==='/' ? "nav-links-active" : "nav-links" }  as={'div'}>
                  <Link to='/'>Home</Link>
              </Navbar.Link>
              {/* <Navbar.Link active={path==='/quizes'} as={'div'}> */}
              <Navbar.Link className= {path==='/quizes' ? "nav-links-active" : "nav-links" }  as={'div'}>
                  <Link to='/quizes'>Quizes</Link>
              </Navbar.Link>
              {/* <Navbar.Link active={path==='/dashboard'} as={'div'}> */}
              <Navbar.Link className= {path==='/dashboard' ? "nav-links-active" : "nav-links" }  as={'div'}>
                  <Link to='/dashboard'>Dashboard</Link>
              </Navbar.Link>
              {/* <Navbar.Link active={path==='/interview'} as={'div'}> */}
              <Navbar.Link className= {path==='/interview' ? "nav-links-active" : "nav-links" }  as={'div'}>
                  <Link to='/interview'>Interviews</Link>
              </Navbar.Link>
              {/* <Navbar.Link active={path==='/discuss'} as={'div'}> */}
              <Navbar.Link className= {path==='/discuss' ? "nav-links-active" : "nav-links" }  as={'div'}>
                  <Link to='/discuss'>Discuss</Link>
              </Navbar.Link>
              
          </Navbar.Collapse>
      </Navbar>
    )
}

export default Header
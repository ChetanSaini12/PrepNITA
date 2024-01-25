import { Navbar, TextInput,Button } from 'flowbite-react'
import React from 'react'
import {Link, useLocation} from "react-router-dom"
import {AiOutlineSearch} from "react-icons/ai"
import {FaMoon} from "react-icons/fa"

function Header() {
    const path=useLocation().pathname;
    return (
      <Navbar className='border-b-2'>
          <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
              <span className='px-2 py-1 bg-gradient-to-r from from-indigo-500  via-purple-500 to-pink-500 rounded-lg text-white'>MindSet</span>
          </Link>
          <form >
              <TextInput
                  type='text'
                  placeholder='Search...'
                  rightIcon={AiOutlineSearch}
                  className='hidden lg:inline'
              >
  
              </TextInput>
  
          </form>
          <Button className='w-12 h-10 lg:hidden' color='gray' pill>
              <AiOutlineSearch></AiOutlineSearch>
          </Button>
          <div className='flex gap-2 md:order-2'>
              <Button className='w-12 h-10 sm:inline' color='grey' pill><FaMoon></FaMoon></Button>
              
              <Link to='/signUp'>
                  <Button gradientDuoTone='purpleToBlue' outline>Sign In</Button>
              </Link>
              <Navbar.Toggle></Navbar.Toggle>
          </div>
          <Navbar.Collapse>
              <Navbar.Link active={path==='/'}  as={'div'}>
                  <Link to='/'>Home</Link>
              </Navbar.Link>
              <Navbar.Link active={path==='/quizes'} as={'div'}>
                  <Link to='/quizes'>Quizes</Link>
              </Navbar.Link>
              <Navbar.Link active={path==='/dashboard'} as={'div'}>
                  <Link to='/dashboard'>Dashboard</Link>
              </Navbar.Link>
              <Navbar.Link active={path==='/interview'} as={'div'}>
                  <Link to='/interview'>Interviews</Link>
              </Navbar.Link>
              <Navbar.Link active={path==='/discuss'} as={'div'}>
                  <Link to='/discuss'>Discuss</Link>
              </Navbar.Link>
              
          </Navbar.Collapse>
      </Navbar>
    )
}

export default Header
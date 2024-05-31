import React from 'react'
import {Footer} from 'flowbite-react'
import {BsDiscord, BsFacebook, BsGithub, BsInstagram, BsTwitter} from 'react-icons/bs'
import {Link} from "react-router-dom"

export default function FooterCom(){
    return <Footer container className='border border-t-8 border-teal-500'>
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid w-full justify-between sm:flex md:grid-cols-1">
                <div className="mt-5">
                <Link to="/" className='font-bold dark:text-white text-4xl'>
                  <span className='px-2 py-1 bg-gradient-to-r from from-cyan-400  via-cyan-500 to-cyan-900 rounded-lg text-white'>PreP</span>NITA
                </Link>
                </div>
                <div className='grid grid-cols-2 gap-8  mt-4 sm:grid-cols-3 sm:gap-6'>
                    <div>
                    <Footer.Title title='About'></Footer.Title>
                    <Footer.LinkGroup col>
                        <Footer.Link href='#' target='_blank' rel='noopener norefere' >
                            Interview Experiences
                        </Footer.Link>
                        <Footer.Link href='/about' target='_blank' rel='noopener norefere' >
                            Referrals
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                    <div>
                    <Footer.Title title='Follow Us'></Footer.Title>
                    <Footer.LinkGroup col>
                        <Footer.Link href='#' target='_blank' rel='noopener norefere' >
                            Github
                        </Footer.Link>
                        <Footer.Link href='#' target='_blank' rel='noopener norefere' >
                            Instagram
                        </Footer.Link>
                    </Footer.LinkGroup>
                    </div>
                    <div>
                    <Footer.Title title='Privacy Policy'></Footer.Title>
                    <Footer.LinkGroup col>
                        <Footer.Link href='#' target='_blank' rel='noopener norefere' >
                            Terms & Conditions
                        </Footer.Link>
                        
                    </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider></Footer.Divider>
            <div className='w-full sm:flex sm:items-center sm:justify-between'>
                <Footer.Copyright href='#' by="PreP_NITA" year={new Date().getFullYear()}></Footer.Copyright>
            </div>
            <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                <Footer.Icon href='#' icon={BsFacebook}></Footer.Icon>
                <Footer.Icon href='#' icon={BsInstagram}></Footer.Icon>
                <Footer.Icon href='#' icon={BsTwitter}></Footer.Icon>
                <Footer.Icon href='#' icon={BsGithub}></Footer.Icon>
                <Footer.Icon href='#' icon={BsDiscord}></Footer.Icon>
            </div>
        </div>
    </Footer>
}
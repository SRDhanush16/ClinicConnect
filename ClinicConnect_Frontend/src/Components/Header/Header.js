import React from 'react'

// importing css
import './Header.css';
import { NavLink } from 'react-router-dom';

export default function Header() {

    const handleClick = () => {
        const headerEl = document.querySelector(".header-nav");
        headerEl.classList.toggle("nav-open");
    }

  return (
    <>
        <header>
            <nav className='header-nav' >
                <div className='header-nav-logo' >
                    <img src='/images/ClinicConnectlogo.png' alt="ClinicConnect-logo"/>
                    
                </div>

                <div className='header-nav-links' >
                    <ul>
                        <li><NavLink to="/" >Home</NavLink></li>
                        <li><NavLink to="/links" >Pages</NavLink></li>
                        <li><NavLink to="/doctors" >Doctors</NavLink></li>
                        <li><NavLink to="/aboutus" >About Us</NavLink></li>
                    </ul>
                </div>

                <button className='header-btn-mobile-nav' onClick={handleClick} >
                    <i className='icon-mobile-nav' name='menu'><img src="/images/icons/hamburger-menu.png" alt="click" /></i>
                    <i className='icon-mobile-nav' name='close' ><img src="/images/icons/close-menu.png" alt="click"/></i>
                </button>

            </nav>
        </header>
    </>
  )
}

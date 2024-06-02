import React from 'react'
import {NavLink} from 'react-router-dom'

import './componentsStyles/header.css'

export default function Header() {
  return (
    <header>
      <div className='header-nav'>
        <div className='header-nav-logo'>
          <img src="/images/CConlylogo.png" alt="CC"/>
          ClinicConnect
        </div>
        <div className='header-nav-links'>
          <ul>
            <li><NavLink to="/" style={{ textDecoration: 'none', color: 'black' }} ><li>Home</li></NavLink></li>
            <li><NavLink to="/Pages" style={{ textDecoration: 'none', color: 'black' }} ><li>Pages</li></NavLink></li>
            <li><NavLink to="/Doctorlist" style={{ textDecoration: 'none', color: 'black' }} ><li>Doctors</li></NavLink></li>
            <li><NavLink to="/AboutUs" style={{ textDecoration: 'none', color: 'black' }} ><li>About Us</li></NavLink></li>
            {/* <li><NavLink to="/ContactUs" style={{ textDecoration: 'none', color: 'black' }} ><li>Contact Us</li></NavLink></li> */}
          </ul>
        </div>
      </div>
    </header>
  )
}

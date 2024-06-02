import React from 'react'
import {NavLink } from 'react-router-dom'

import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './pagesStyles/LinkpageStyles.css'

export default function LinkPage() {
  return (
    <>
        <Header/>
        <section className=' linkpage-container'>
          <div className='link-group'>
            <div className='linkbox'>
              <div className='description'>Create an account to get started</div>
              <NavLink to="/CreateAccount" className='link'>Create Account</NavLink>
            </div>
            <div className='linkbox'>
              <div className='description'>Existing users login here</div>
              <NavLink to="/UsersLogin" className='link'>Users Login</NavLink>
            </div>
            <div className='linkbox'>
              <div className='description'>Login for doctors </div>
              <NavLink to="/DoctorsLogin" className='link'>Doctors Login</NavLink>
            </div>
          </div>
        </section>
        <Footer/>
    </>
  )
}

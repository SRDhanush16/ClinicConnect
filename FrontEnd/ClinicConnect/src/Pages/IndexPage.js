import React from 'react'
import {NavLink } from 'react-router-dom'

import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './pagesStyles/indexpage.css'

export default function IndexPage() {
  return (
    <>
    
      <Header/>

      <section className='container Index-container'>
          <main>
              <div className='intro'>
                <h1>Booking and Handling appointments made easy with ClinicConnect.</h1>
                <p>Our platform redefines the appointment creation and management experience. Enjoy a streamlined, user-friendly system that simplifies the entire process, ensuring efficiency and ease for all users.</p>
              </div>
              <div className='intro-img' >
                <img src="/images/indexcontainerimg.png" alt="mainimg" />
              </div>
              
          </main>
      </section>

      <section className='Index-important'>
        <div className='important-grid'>
          <div>
              <h3>EMERGENCY SERVICE</h3>
              <h3>45678912</h3>
              <p>Feel free to call us anytime in case of Emergency,<br/> We are always available for you</p>
          </div>
          <div style={{ backgroundColor: '#CCF2F4', color: 'black' }} >
            <h3>DO YOU WISH TO<br/> MAKE AN APPOINTMENT</h3>
            <p>Click <NavLink to="/Pages" style={{ textDecoration: 'none', color: 'blue' }} >HERE</NavLink><br/>Login/create account in order to make an appointment</p>
            
          </div>
          <div>
            <h3>OPENING HOURS</h3>
            <p>MONDAY - FRIDAY</p>
            <p>SATURDAY - SUNDAY</p>
            <p>Morning : 08:00 - 13:00</p>
            <p>Evening : 16:00 - 21:00</p>  
          </div>
        </div>

      </section>
      <Footer/>

    </>
  )
}

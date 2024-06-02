import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

import './pagesStyles/aboutus.css'

export default function AboutUsPage() {
  return (
    <>

        <Header/>
        <section className='container aboutus-container'>
            <div className='aboutus' >
              <h1> -About Us- </h1>
              <ul>
                <li><p>Clinic Connect is a web application developed for clinics.</p></li>
                <li><p>User Portal: Users login to the user portal to make an appointment with the doctor</p></li>
                <li><p>Doctor Portal: Doctors logs into the doctor portal to view, handle and manage appointment</p></li>
                <li><p>This is the 3rd Version of BookMyDoctor which is renamed as ClinicConnect</p></li>
                <li><p>Whats New in Clinic Connect: Security, Limited Appointment per slot</p></li>
                <li><p>For Doctors provides easy and efficent way to manange and appointments<br/> with the help of the feature like sorting and filtering</p></li>
              </ul>
            </div>
        </section>
        <Footer/>
    
    </>
  )
}

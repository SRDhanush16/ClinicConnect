import React from 'react'

import '../../App.css';
import './AboutPage.css';

import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';

export default function AboutPage() {
  return (
    <>
        <Header/>

        <div className='background-about-img'>
            <div className='background-about-overlay'>
                <section className='container about-container'>
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
            </div>
        </div>

        <Footer/>


    </>
  )
}

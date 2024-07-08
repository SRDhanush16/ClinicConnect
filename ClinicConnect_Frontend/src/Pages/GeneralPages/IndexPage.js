import React from 'react'
import { useNavigate } from 'react-router-dom'

import './IndexPage.css';
import '../../App.css';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header'

export default function IndexPage() {

  const Navigate = useNavigate();

  const handleGotopages=(e)=>{
    Navigate('/links');
  }

  return (
    <>
        <Header/>
        <div className='background-index-img'>
          <div className='background-index-overlay'>
            <section className='container index-intro-container' >
              <main>
                <div className='intro-content' >
                  <h1>Booking and Handling appointments made easy with ClinicConnect.</h1>
                  <p>Our platform redefines the appointment creation and management experience. Enjoy a streamlined, user-friendly system that simplifies the entire process, ensuring efficiency and ease for all users.</p>
                  <button onClick={handleGotopages} >Make Appointemnt</button>
                </div>
              </main>
            </section>
          </div>
        </div>

        <div className='background-index-services'>
          <section className='container index-services-container'>
            <div className='services-grid'>
              <div>
                <h2>Appointment</h2>
                <p>Any problems or discomfort experiencing? Make an appointment with our experts to get back on track.</p>
                <button onClick={handleGotopages}>Appointment Now</button>
              </div>
              <div>
                <h2><img src="/images/icons/emergency-call.png" alt=" "/> Emergency Cases.</h2>
                <h3>+99-55-66-88-526</h3>
                <p>You can call us for Emergency and make an appointment out of our clinic</p>
                <button onClick={handleGotopages} >Appointment Now</button>
              </div>
              <div>
                <h2><img src="/images/icons/opening-hours.png"  alt=" "/> Opening Hours.</h2>
                <p>Mon-Fri &emsp;  &emsp;  &emsp; &emsp;   8:00-21:00</p>
                <p>Saturday&emsp;   &emsp;   &emsp; &emsp; 8:00-21:00</p>
                <p>Sunday &emsp;    &emsp;  &emsp;  &emsp;&ensp;8:00-21:00</p>
              </div>
            </div>
          </section>
        </div>

        <Footer/>

    </>
  )
}

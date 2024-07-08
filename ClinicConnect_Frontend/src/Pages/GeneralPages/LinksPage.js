import React from 'react'

import '../../App.css';
import'./LinksPage.css';

import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';
import { NavLink } from 'react-router-dom';

export default function LinksPage() {
  return (
    <>
      <Header/>
      <div className='background-links-img'>
        <div className='background-links-overlay'>
          <section className='container links-container'>
            <main>
              <div className='links-grid'>
                <div>
                  <h2>Don't have an account?</h2>
                  <p>Join us today and take the first step towards managing your healthcare needs effortlessly. With an account, you can book appointments online, access your medical records, and stay connected with your healthcare providers.</p>
                  <NavLink to="/createaccount">Create Account</NavLink>
                </div>

                <div>
                  <h2>Already have an account?</h2>
                  <p>Welcome back! Your health is our priority, and we are here to support you. Log in now to consult with our expert medical professionals and take advantage of our comprehensive healthcare services.</p>
                  <NavLink to="/userlogin" >Login</NavLink>
                </div>

                <div>
                  <h2>Hey Doc, come here!</h2>
                  <p>Welcome, Doctor! This platform is designed to help you manage your patients more efficiently. Log in to access patient information, schedule appointments, and streamline your practice management.</p>
                  <NavLink to="/doctorlogin">Login</NavLink>
                </div>
              </div>
            </main>
          </section>
        </div>
      </div>

      <Footer/>
    </>
  )
}

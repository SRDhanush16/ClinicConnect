import React from 'react'
import { BrowserRouter, Routes,Route } from 'react-router-dom'

import IndexPage from './Pages/IndexPage'
import LinkPage from './Pages/LinkPage'
import DoctorListPage from './Pages/DoctorListPage'

import CreateAccountPage from './Pages/CreateAccountPage'

import UsersLoginPage from './Pages/Users/UsersLoginPage'
import UserHomePage from './Pages/Users/UserHomePage'
import UserBookAppointmentPage from './Pages/Users/UserBookAppointmentPage'
import UserPrevAppoPage from './Pages/Users/UserPrevAppoPage'

import DoctorsLoginPage from './Pages/Doctors/DoctorsLoginPage'
import DoctorHomePage from './Pages/Doctors/DoctorHomePage'
import DoctorPrevAppointments from './Pages/Doctors/DoctorPrevAppointments'
import AboutUsPage from './Pages/AboutUsPage'
import ContactUsPage from './Pages/ContactUsPage'




export default function App() {

    

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage/>}/>
                <Route path="/Pages"element={<LinkPage/>}/>
                <Route path="/Doctorlist"element={<DoctorListPage/>}/>
                <Route path="/AboutUs" element={<AboutUsPage/>}/>
                <Route path="/ContactUs" element={<ContactUsPage/>}/>

                <Route path="/UsersLogin" element={<UsersLoginPage/>} />
                <Route path="/CreateAccount" element={<CreateAccountPage/>} />
                <Route path="/DoctorsLogin" element={<DoctorsLoginPage/>} />   
                <Route path="/user/:uname" element={<UserHomePage/>}/>
                <Route path="/doctor/:dname" element={<DoctorHomePage/>}/>
                <Route path="/user/:uname/BookAppointment" element={<UserBookAppointmentPage/>}/>
                <Route path="/user/:uname/PreviousAppointment" element={<UserPrevAppoPage/>}/>

                <Route path="/doctor/:dname/PreviousAppointment" element={<DoctorPrevAppointments/>}  />

            </Routes>
        </BrowserRouter>    
    </>
  )
}

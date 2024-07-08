import React from 'react'
import IndexPage from './Pages/GeneralPages/IndexPage'
import { BrowserRouter,Routes ,Route } from 'react-router-dom'
import LinksPage from './Pages/GeneralPages/LinksPage'
import AboutPage from './Pages/GeneralPages/AboutPage'
import DoctorListPage from './Pages/GeneralPages/DoctorListPage'
import CreateAccountPage from './Pages/GeneralPages/CreateAccountPage'
import UserLoginPage from './Pages/GeneralPages/UserLoginPage'
import DoctorLoginPage from './Pages/GeneralPages/DoctorLoginPage'
import UserHomePage from './Pages/UserPages/UserHomePage'
import UserPrevPage from './Pages/UserPages/UserPrevPage'
import BookAppointement from './Pages/UserPages/BookAppointement'
import PageNotFound from './Pages/GeneralPages/PageNotFound'
import DoctorHomePage from './Pages/DoctorPages/DoctorHomePage'
import DoctorPrevPage from './Pages/DoctorPages/DoctorPrevPage'

export default function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IndexPage/>}/>
            <Route path="*" element={<PageNotFound/>} />
            <Route path="/links" element={<LinksPage/>}/>
            <Route path="/aboutus" element={<AboutPage/>} />
            <Route path="/doctors" element={<DoctorListPage/>} />

            <Route path="/createaccount" element={<CreateAccountPage/>} />
            <Route path="/userlogin" element={<UserLoginPage/>}/>
            <Route path="/doctorlogin" element={<DoctorLoginPage/>}/>

            <Route path="/user/:uname" element={<UserHomePage/>} />
            <Route path="/user/:uname/history" element={<UserPrevPage/>} />
            <Route path="/user/:uname/MakeAppointment" element={<BookAppointement/>} />

            <Route path="/doctor/:dname" element={<DoctorHomePage/>}/>
            <Route path="/doctor/:dname/history" element={<DoctorPrevPage/>}/>
            
          </Routes>
        </BrowserRouter>
    </>
  )
}

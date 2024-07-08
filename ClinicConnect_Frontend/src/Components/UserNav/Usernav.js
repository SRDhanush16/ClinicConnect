import React from 'react'

import { useNavigate,NavLink } from 'react-router-dom'
import axios from 'axios';

import '../../App.css';
import './Usernav.css';

export default function Usernav() {

    const navigate = useNavigate();

    const handleLogout = async(e) => {
        e.preventDefault();
        const jwtToken = localStorage.getItem('bmdv3ujwtToken');
        try{
            const response = await axios.post('http://localhost:8080/logoutuser',{
                headers:{
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            console.log('Logout Successful',response.data);
            localStorage.removeItem('bmdv3uid');
            localStorage.removeItem('bmdv3uname');
            localStorage.removeItem('bmdv3uemail');
            localStorage.removeItem('bmdv3uphone');
            localStorage.removeItem('bmdv3ujwtToken');
            setTimeout(() => {
                navigate('/');
            }, 3000); // Wait for 3 seconds before navigating to /loginpage
        }catch(error){
            console.log('Error in log out', error);
        }
    };


    // showing user account details
    const uid = localStorage.getItem('bmdv3uid');
    const uname = localStorage.getItem('bmdv3uname');
    const uemail = localStorage.getItem('bmdv3uemail');
    const uphone = localStorage.getItem('bmdv3uphone');
    // add jwt in the UserHomePage

    

  return (
    <>
        <nav className='userlinks-nav'>
            <div className=' container userlinks'>
                <ul>
                    <li> <NavLink to={`/user/${uname}/history`}>History</NavLink> </li>
                    <li><NavLink to={`/user/${uname}/MakeAppointment`} >Make-Appointment</NavLink></li>
                    <li>
                        <button onClick={handleLogout} ><img src="/images/icons/logout.png" alt="logout"/></button>
                    </li>
                </ul>
            </div>
        </nav>


        <section className='userdetails-nav'>
            <div className='container usernav-container'>
                <div className='useraccount'>
                    <ul>
                        <li><NavLink to={`/user/${uname}`}>Home</NavLink></li>
                        <li><b>User ID:</b> {uid}</li>
                        <li><b>Username:</b> {uname}</li>
                        <li><b>Email:</b> {uemail}</li>
                        <li><b>Phone:</b> {uphone}</li>
                    </ul>
                </div>
            </div>
        </section>

    </>
  )
}

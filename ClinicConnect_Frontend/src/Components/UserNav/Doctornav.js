import React from 'react'

import { useNavigate,NavLink } from 'react-router-dom'
import axios from 'axios';

import '../../App.css';
import './Usernav.css';


export default function Doctornav() {


    const did = localStorage.getItem('bmdv3did');
    const dname = localStorage.getItem('bmdv3dname');
    const demail = localStorage.getItem('bmdv3demail');
    const rating = localStorage.getItem('bmdv3drating');

    const navigate = useNavigate();

    const handleLogout = async(e) => {
        e.preventDefault();
        const jwtToken = localStorage.getItem('bmdv3djwtToken');
        try{
            const response = await axios.post('http://localhost:8082/logoutdoctor',{
                headers:{
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            console.log('Logout Successful',response.data);
            localStorage.removeItem('bmdv3did');
            localStorage.removeItem('bmdv3dname');
            localStorage.removeItem('bmdv3demail');
            localStorage.removeItem('bmdv3drating');
            localStorage.removeItem('bmdv3djwtToken');
            setTimeout(() => {
                navigate('/');
            }, 1000); // Wait for 3 seconds before navigating to /loginpage
        }catch(error){
            console.log('Error in log out', error);
        }
    };

  return (
    <>
         <nav className='userlinks-nav'>
            <div className=' container userlinks'>
                <ul>
                    <li> <NavLink to={`/doctor/${dname}/history`}>History</NavLink> </li>
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
                        <li><NavLink to={`/doctor/${dname}`}>Home</NavLink></li>
                        <li><b>User ID:</b> {did}</li>
                        <li><b>Username:</b> {dname}</li>
                        <li><b>Email:</b> {demail}</li>
                    </ul>
                </div>
            </div>
        </section>
    </>
  )
}

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import UserLogout from '../../Components/UserLogout'

import './Usernav.css'
import './userhome.css'
import './appointmentcard.css'

export default function UserHomePage() {
    // storing All the important loginRespose in localstorage
    const uid = localStorage.getItem('bmdv3uid');
    const uname = localStorage.getItem('bmdv3uname');
    const uemail = localStorage.getItem('bmdv3uemail');
    const uphone = localStorage.getItem('bmdv3uphone');
    const jwtToken = localStorage.getItem('bmdv3ujwtToken');
    

/* 
The issue with the state not updating correctly is due to the asynchronous nature of state updates in React. 
Specifically, you're setting the totalcurrappo state but immediately trying to use its value to update the message, 
which will not reflect the updated value immediately. Instead, you should use the calculated tot directly when setting the message.

*/
    const [currentAppointments, setCurrentAppointments] = useState([]);
    const [currentAppoflag, setCurrentAppoflag] = useState(false);
    const [currentAppointmentsmsg, setCurrentAppointmentsmsg] = useState('');
    const [totalcurrappo, setTotalcurrappo] = useState(0);
    const fetchAppointments = async () => {
        try {
            const response = await axios.post('http://localhost:8080/Userpage/ShowCurrentUserAppointments', {
                uid: uid,
                uname: uname,
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            if (response.data) {
                if (response.data.length === 0 || response.data == null) {
                    setCurrentAppoflag(true);
                    setCurrentAppointmentsmsg('No current appointments');
                    console.log('No current appointments');
                } else {
                    const tot = response.data.length;
                    setTotalcurrappo(tot);
                    setCurrentAppoflag(true);
                    setCurrentAppointmentsmsg(`Total Current Appointments: ${tot}`);
                    setCurrentAppointments(response.data);
                    console.log('Current appointments:', response.data);
                }
            }
        } catch (error) {
            setCurrentAppoflag(true);
            setCurrentAppointmentsmsg('Cant Fetch appointments');
            console.log('Cant Fetch appointments', error);
        }
    };

    /* 
        is used to automatically fetch appointments when the user logs in or page is rendered for the first time
        have to mention the dependency array (Input for fetchAppointments)
    */
    useEffect(() => {
        fetchAppointments();
    }, [uid, uname, jwtToken]);  

    const handleCancel = async (aid,adname,adate,aslot) => {
        try {
            await axios.post('http://localhost:8080/Userpage/CancelAppointment', {
                aid: aid,
                auid:uid,
                auname:uname,
                adname:adname,
                adate:adate,
                aslot:aslot,
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            fetchAppointments();
        } catch (error) {
            console.error('Error in Canceling Appointment : ', error);
        }
    };

    return (
        <>
            <Header />

            <nav className='usernav'>
                <div className='userdetails'>
                    <ul>
                        <li>User ID: {uid}</li>
                        <li>User name:{uname}</li>
                        <li>Email: {uemail}</li>
                        <li>Phone: {uphone}</li>
                    </ul>
                </div>
                <div className='userlinks'>
                    <ul>
                        <li><NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/user/${uname}/BookAppointment`}><li>Book Appointments</li></NavLink><br /></li>
                        <li><NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/user/${uname}/PreviousAppointment`}><li>Previous Appointments</li></NavLink><br /></li>
                        <li><UserLogout /></li>
                    </ul>
                </div>
            </nav>


            <section className='container userhome-container'>
                    
                <div className='userhome'>
                    <h1>My Current Appointments</h1>
                    {currentAppoflag && <p className='totalappo'>{currentAppointmentsmsg}</p>}
                    <div className='appointmentshow'>
                    {
                        currentAppointments.map((appointment, index) => (
                            <div key={index} className='appointmentcard'>
                                <p><b>Appointment id:</b> {appointment.aid}</p>
                                <p><b>Patient name:</b> {appointment.pname}</p>
                                <p><b>Patient age:</b> {appointment.page}</p>
                                <p><b>Patient phone no: </b>{appointment.pphone}</p>
                                <p><b>Booking name:</b> {appointment.auname}</p>
                                <p><b>Doctor name:</b> {appointment.adname}</p>
                                <p><b>Date:</b> {appointment.adate} <b>& Time:</b> {appointment.aslot}</p>
                                <button type="button" onClick={() => handleCancel(appointment.aid,appointment.adname,appointment.adate,appointment.aslot)}>CANCEL</button>
                                
                            </div>
                        ))
                    }
                    </div>
                </div>
                
            </section>
            <Footer />
        </>
    );
}

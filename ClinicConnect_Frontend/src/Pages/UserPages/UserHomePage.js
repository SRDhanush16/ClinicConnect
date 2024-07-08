import React , { useState,useEffect }from 'react'

import {Navigate } from 'react-router-dom'
import axios from 'axios';

import '../../App.css';
import '../UserPages/UserHomePage.css';

import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';
import Usernav from '../../Components/UserNav/Usernav';

export default function UserHomePage() {

 // storing all the important login response in localStorage
 const uid = localStorage.getItem('bmdv3uid');
 const uname = localStorage.getItem('bmdv3uname');
//  const uemail = localStorage.getItem('bmdv3uemail');
//  const uphone = localStorage.getItem('bmdv3uphone');
 const jwtToken = localStorage.getItem('bmdv3ujwtToken');

 const [currentAppointments, setCurrentAppointments] = useState([]);
 const [currentAppoFlag, setCurrentAppoFlag] = useState(false);
 const [currentAppointmentsMsg, setCurrentAppointmentsMsg] = useState('');
 


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
            if (response.data.length === 0) {
                setCurrentAppoFlag(true);
                setCurrentAppointmentsMsg('No current appointments');
                console.log('No current appointments');
            } else {
                const tot = response.data.length;
                setCurrentAppoFlag(true);
                setCurrentAppointmentsMsg(`Total Current Appointments: ${tot}`);
                setCurrentAppointments(response.data);
                console.log('Current appointments:', response.data);
            }
        }
    } catch (error) {
        setCurrentAppoFlag(true);
        setCurrentAppointmentsMsg('Cannot fetch appointments');
        console.log('Cannot fetch appointments', error);
    }
};

useEffect(() => {
    fetchAppointments();
}, [uid, uname, jwtToken]);

const handleCancel = async (aid, adname, adate, aslot) => {
    try {
        await axios.post('http://localhost:8080/Userpage/CancelAppointment', {
            aid: aid,
            auid: uid,
            auname: uname,
            adname: adname,
            adate: adate,
            aslot: aslot,
        }, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        fetchAppointments();
    } catch (error) {
        console.error('Error in canceling appointment:', error);
    }
};

if (!jwtToken) {
    return <Navigate to="/" />;
}

  return (
    <>
        <Header/>
        <Usernav/>
        <section className='container userhome-container'> 
            <div className='userhome'>
                <h1>My Current Appointments</h1>
                {currentAppoFlag && <p className="totalappo">{currentAppointmentsMsg}</p>}
                <div className='appointmentshow'>
                    {currentAppointments.map((appointment, index) => (
                        <div key={index} className="appointmentcard">
                            <div className='beautify-card'>
                            </div>
                            <div className='appointmentdetails'>
                                <p><b>Appointment ID:</b> {appointment.aid}</p>
                                <p><b>Patient name:</b> {appointment.pname}</p>
                                <p><b>Patient age:</b> {appointment.page}</p>
                                {/* <p><b>Patient Phone No:</b> {appointment.pphone}</p> */}
                                {/* <p><b>Booking Name:</b> {appointment.auname}</p> */}
                                <p><b>Doctor name:</b> {appointment.adname}</p>
                                <p><b>Date:</b> {appointment.adate} <b>Time:</b> {appointment.aslot}</p>
                                <button type="button" onClick={() => handleCancel(appointment.aid, appointment.adname, appointment.adate, appointment.aslot)}>Cancel</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        <Footer/>
    </>
  )
}

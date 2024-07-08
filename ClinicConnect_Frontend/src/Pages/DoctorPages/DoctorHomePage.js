import React , { useState,useEffect }from 'react'

import {Navigate } from 'react-router-dom'
import axios from 'axios';

import '../../App.css';
import '../UserPages/UserHomePage.css';

import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';
import Doctornav from '../../Components/UserNav/Doctornav';

export default function DoctorHomePage() {

  const did = localStorage.getItem('bmdv3did');
  const dname = localStorage.getItem('bmdv3dname');
  // const demail = localStorage.getItem('bmdv3demail');
  // const rating = localStorage.getItem('bmdv3drating');
  const jwtToken = localStorage.getItem('bmdv3djwtToken');

  const [currentAppointments, setCurrentAppointments] = useState([]);
  const [currentAppoflag, setCurrentAppoflag] = useState(false);
  const [currentAppointmentsmsg, setCurrentAppointmentsmsg] = useState('');
    
  const fetchAppointments = async () => {
    try {
        const response = await axios.post('http://localhost:8082/Doctorpage/ShowCurrentDoctorAppointments', {
            did: did,
            dname: dname,
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
                setCurrentAppoflag(true);
                setCurrentAppointmentsmsg(`Total pending Appointments: ${tot}`);
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
  useEffect(() => {
      fetchAppointments();
  }, [did, dname, jwtToken]);


  const handleFinish = async (aid) => {
    try {
        await axios.post('http://localhost:8082/Doctorpage/FinishAppointment', {
            aid: aid,
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

  if (!jwtToken) {
      return <Navigate to="/" />;
  }


  return (
    <>
        <Header/>
        <Doctornav/>
          <section className='container userhome-container'> 
              <div className='userhome'>
                  <h1>Pending Appointments</h1>
                  {currentAppoflag && <p className="totalappo">{currentAppointmentsmsg}</p>}
                  <div className='appointmentshow'>
                      {currentAppointments.map((appointment, index) => (
                          <div key={index} className="appointmentcard">
                              <div className='beautify-card' >
                              </div>
                              <div className='appointmentdetails'>
                                  <p><b>Appointment ID:</b> {appointment.aid}</p>
                                  <p><b>Patient name:</b> {appointment.pname}</p>
                                  <p><b>Patient age:</b> {appointment.page}</p>
                                  <p><b>Patient Phone No:</b> {appointment.pphone}</p>
                                  <p><b>Booking Name:</b> {appointment.auname}</p>
                                  {/* <p><b>Doctor name:</b> {appointment.adname}</p> */}
                                  <p><b>Date:</b> {appointment.adate} <b>Time:</b> {appointment.aslot}</p>
                                  <button type="button" onClick={() => handleFinish(appointment.aid)}>Finish</button>
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

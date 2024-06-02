import React, { useState ,useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import DoctorLogout from '../../Components/DoctorLogout';

import './doctornav.css';
import './doctorhome.css';
import '../Users/appointmentcard.css';

export default function DoctorHomePage() {

    const did = localStorage.getItem('bmdv3did');
    const dname = localStorage.getItem('bmdv3dname');
    const demail = localStorage.getItem('bmdv3demail');
    const rating = localStorage.getItem('bmdv3drating');
    const jwtToken = localStorage.getItem('bmdv3djwtToken');

    const [currentAppointments, setCurrentAppointments] = useState([]);
    const [currentAppoflag, setCurrentAppoflag] = useState(false);
    const [currentAppointmentsmsg, setCurrentAppointmentsmsg] = useState('');
    const [totalcurrappo, setTotalcurrappo] = useState(0);

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
                    setTotalcurrappo(tot);
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


  return (
    <>
        <Header />
            
        <nav className='doctornav'>
                <div className='doctordetails'>
                    <ul>
                        <li>doctor ID: {did}</li>
                        <li>doctor name:{dname}</li>
                        <li>Email: {demail}</li>
                        <li>rating: {rating}</li>
                    </ul>
                </div>
                <div className='doctorlinks'>
                    <ul>
                        <li><NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/doctor/${dname}/PreviousAppointment`}><li>Previous Appointments</li></NavLink><br /></li>
                        <li><DoctorLogout /></li>
                    </ul>
                </div>
        </nav>

            <section className='container doctorhome-container' >
                
                    <div className='doctorhome'>
                        <h1>My Pending Appointments</h1>
                        {currentAppoflag && <p className='totalappo' >{currentAppointmentsmsg}</p>}
                        <div className='appointmentshow' >
                        {
                            currentAppointments.map((appointment, index) => (
                                <div key={index} className='appointmentcard'>
                                    <p><b>Appointment id:</b> {appointment.aid}</p>
                                    <p><b>Patient name:</b> {appointment.pname}</p>
                                    <p><b>Patient age:</b> {appointment.page}</p>
                                    <p><b>Patient phone no:</b> {appointment.pphone}</p>
                                    <p><b>Booking name:</b> {appointment.auname}</p>
                                    <p><b>Date and Time of Visit:</b> {appointment.adate} & {appointment.aslot}</p>
                                    <button type="button" onClick={() => handleFinish(appointment.aid)}>FINISH</button>
                                   
                                </div>
                            ))
                        }
                        </div>
                    </div>
                
            </section>
        <Footer />
    </>
  )
}

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import UserLogout from '../../Components/UserLogout'

import './userprev.css';
import './Usernav.css'
import './appointmentcard.css'


export default function UserPrevAppoPage() {
    const uid = localStorage.getItem('bmdv3uid');
    const uname = localStorage.getItem('bmdv3uname');
    const uemail = localStorage.getItem('bmdv3uemail');
    const uphone = localStorage.getItem('bmdv3uphone');
    const jwtToken = localStorage.getItem('bmdv3ujwtToken');

    const [previousAppointments, setPreviousAppointments] = useState([]);
    // const [newRating, setNewRating] = useState({});

    const fetchAppointments = async () => {
        try {
            const response = await axios.post('http://localhost:8080/Userpage/ShowPreviousUserAppointments', {
                uid: uid,
                uname: uname,
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            if (response.data) {
                setPreviousAppointments(response.data);
            }
        } catch (error) {
            console.log('Cant Fetch appointments', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [uid, uname, jwtToken]);

    /*
    const handleFeedback = async (aid, adid, drating) => {
        
        try {
            await axios.post('http://localhost:8082/Userpage/AppointmentFeedback', {
                aid: aid,
                adid: adid,
                drating: drating,
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            fetchAppointments();
        } catch (error) {
            console.error('Error in giving feedback: ', error);
        }
    };
    

    const handleRatingChange = (aid) => (e) => {
        setNewRating({
            ...newRating,
            [aid]: e.target.value,
        });
    };
    */

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
                        <li><NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/user/${uname}`}><li>Homepage</li></NavLink><br /></li>
                        <li><NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/user/${uname}/BookAppointment`}><li>Book Appointments</li></NavLink><br /></li>         
                        <li><UserLogout /></li>
                    </ul>
                </div>
            </nav>

            <section className='container userprev-container '>
                    <div className='userprev' >
                        <h1>My Previous Appointments</h1>
                        <div className='appointmentshow' >

                        {
                            previousAppointments.map((appointment, index) => (
                                <div key={index} className='appointmentcard'>
                                    <p><b>Appointment id:</b> {appointment.aid}</p>
                                    <p><b>Patient name:</b> {appointment.pname}</p>
                                    <p><b>Patient age: </b>{appointment.page}</p>
                                    <p><b>Patient phone no:</b> {appointment.pphone}</p>
                                    <p><b>Booking name: </b>{appointment.auname}</p>
                                    <p><b>Doctor name:</b> {appointment.adname}</p>
                                    <p><b>Date and Time of Visit: </b>{appointment.adate} & {appointment.aslot}</p>
                                    {/* <form onSubmit={() => handleFeedback(appointment.aid, appointment.adid, newRating[appointment.aid])}>
                                        <label>
                                            Enter Rating/10:
                                            <input type="number" value={newRating[appointment.aid] || ''} onChange={handleRatingChange(appointment.aid)} />
                                        </label>
                                        <button type="submit">GIVE FEEDBACK</button>
                                    </form> */}
                                   
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

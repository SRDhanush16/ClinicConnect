import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import DoctorLogout from '../../Components/DoctorLogout';
import './doctornav.css';
import './doctorprev.css';
import '../Users/appointmentcard.css';


export default function DoctorPrevAppointments() {
    const did = localStorage.getItem('bmdv3did');
    const dname = localStorage.getItem('bmdv3dname');
    const demail = localStorage.getItem('bmdv3demail');
    const rating = localStorage.getItem('bmdv3drating');
    const jwtToken = localStorage.getItem('bmdv3djwtToken');

    const [previousAppointments, setPreviousAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [filterDate, setFilterDate] = useState('');

    const fetchAppointments = async () => {
        try {
            const response = await axios.post('http://localhost:8082/Doctorpage/ShowPreviousDoctorAppointments', {
                did: did,
                dname: dname,
            }, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            if (response.data) {
                setPreviousAppointments(response.data);
                setFilteredAppointments(response.data); // Initially show all appointments
            }
        } catch (error) {
            console.log('Cant Fetch appointments', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [did, dname, jwtToken]);

    const sortAppointments = (order) => {
        const sortedAppointments = [...filteredAppointments].sort((a, b) => {
            const dateA = new Date(a.adate);
            const dateB = new Date(b.adate);
            if (dateA.getTime() === dateB.getTime()) {
                // Secondary sort by slot if dates are equal
                return a.aslot.localeCompare(b.aslot) * (order === 'asc' ? 1 : -1);
            }
            return (dateA - dateB) * (order === 'asc' ? 1 : -1);
        });
        setFilteredAppointments(sortedAppointments);
    };

    const handleFilterChange = (e) => {
        setFilterDate(e.target.value);
        if (e.target.value === '') {
            // Show all appointments if no date is selected
            setFilteredAppointments(previousAppointments);
        } else {
            // Filter appointments by the selected date
            const filtered = previousAppointments.filter(appointment => appointment.adate === e.target.value);
            setFilteredAppointments(filtered);
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
                        <li><NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/doctor/${dname}`}><li>Hompage</li></NavLink><br /></li>
                        <li><DoctorLogout /></li>
                    </ul>
                </div>
            </nav>

            <section className='container doctorprev-container' >
                <div className='doctorprev'>
                    <h1> My Previous Appointments</h1>
                    <div className="filter-sort-container">
                        <div>
                            <label htmlFor="filterDate">Filter by Date:</label>
                            <input
                                type="date"
                                id="filterDate"
                                value={filterDate}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <button type="button" onClick={() => sortAppointments('desc')}>Sort Desc</button>
                        <button type="button" onClick={() => sortAppointments('asc')}>Sort Asc</button>
                    </div>
                    <div className='appointmentshow' >
                    {filteredAppointments.map((appointment, index) => (
                        <div key={index} className='appointmentcard'>
                            <p><b>Appointment id:</b> {appointment.aid}</p>
                            <p><b>Patient name:</b> {appointment.pname}</p>
                            <p><b>Patient age:</b> {appointment.page}</p>
                            <p><b>Patient phone no:</b> {appointment.pphone}</p>
                            <p><b>Booking name:</b> {appointment.auname}</p>
                            <p><b>Date and Time of Visit:</b> {appointment.adate} & {appointment.aslot}</p>
                            
                        </div>
                    ))}
                    </div>
                </div>
            
            </section>
            <Footer />
        </>
    );
}

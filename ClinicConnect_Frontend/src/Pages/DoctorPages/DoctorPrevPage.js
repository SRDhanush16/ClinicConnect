import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import '../../App.css';
import '../UserPages/UserHomePage.css';

import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Doctornav from '../../Components/UserNav/Doctornav';

export default function DoctorPrevPage() {
  const did = localStorage.getItem('bmdv3did');
  const dname = localStorage.getItem('bmdv3dname');
  const jwtToken = localStorage.getItem('bmdv3djwtToken');

  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  const fetchAppointments = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8082/Doctorpage/ShowPreviousDoctorAppointments',
        {
          did: did,
          dname: dname,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

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
    console.log('clicked sort');
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
    console.log('clicked filter');
    setFilterDate(e.target.value);
    if (e.target.value === '') {
      // Show all appointments if no date is selected
      setFilteredAppointments(previousAppointments);
    } else {
      // Filter appointments by the selected date
      const filtered = previousAppointments.filter(
        (appointment) => appointment.adate === e.target.value
      );
      setFilteredAppointments(filtered);
    }
  };

  if (!jwtToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <Doctornav />

      <section className="container userhome-container">
        <div className="userhome">
          <h1>Completed Appointments</h1>
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
            <button type="button" onClick={() => sortAppointments('desc')}>
              Sort Desc
            </button>
            <button type="button" onClick={() => sortAppointments('asc')}>
              Sort Asc
            </button>
          </div>

          <div className="appointmentshow">
            {filteredAppointments.map((appointment, index) => (
              <div key={index} className="appointmentcard">
                <div className="beautify-card finished-card"></div>
                <div className="appointmentdetails">
                  <p>
                    <b>Appointment ID:</b> {appointment.aid}
                  </p>
                  <p>
                    <b>Patient name:</b> {appointment.pname}
                  </p>
                  <p>
                    <b>Patient age:</b> {appointment.page}
                  </p>
                  <p>
                    <b>Patient Phone No:</b> {appointment.pphone}
                  </p>
                  <p>
                    <b>Booking Name:</b> {appointment.auname}
                  </p>
                  {/* <p><b>Doctor name:</b> {appointment.adname}</p> */}
                  <p>
                    <b>Date:</b> {appointment.adate} <b>Time:</b> {appointment.aslot}
                  </p>
                  {/* <button type="button" onClick={() => handleFinish(appointment.aid)}>Finish</button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

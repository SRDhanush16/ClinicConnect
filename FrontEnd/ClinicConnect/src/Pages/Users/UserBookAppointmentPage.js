import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import UserLogout from '../../Components/UserLogout'
import './Usernav.css'
import './bookappo.css'

export default function UserBookAppointmentPage() {
    const uid = localStorage.getItem('bmdv3uid');
    const uname = localStorage.getItem('bmdv3uname');
    const jwtToken = localStorage.getItem('bmdv3ujwtToken');
    const uemail = localStorage.getItem('bmdv3uemail');
    const uphone = localStorage.getItem('bmdv3uphone');

    const [appointmentflag, setAppintmentflag] = useState(false);
    const [appointmentmsg, setAppointmentmsg] = useState('');
    const [doctorlist, setDoctorlist] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:8082/getDoctorList');
                setDoctorlist(response.data);
            } catch (error) {
                console.log('Error in fetching doctors: ', error);
            }
        };
        fetchDoctors();
    }, []);

    const [pname, setPname] = useState('');
    const [page, setPage] = useState(0);
    const [pphone, setPphone] = useState('');
    const [adate, setAdate] = useState('');
    const [aslot, setAslot] = useState('');
    const [adid, setAdid] = useState(0);

    const handlePnameChange = (e) => {
        setPname(e.target.value);
    };
    const handlePageChange = (e) => {
        setPage(e.target.value);
    };
    const handlePphoneChange = (e) => {
        setPphone(e.target.value);
    };
    const handleAdidChange = (e) => {
        const selectedDoctorId = e.target.value;
        setAdid(selectedDoctorId);
        // Reset the appointment slot when the doctor changes
        setAslot('');
    };
    const handleAdateChange = (e) => {
        setAdate(e.target.value);
    };
    const handleAslotChange = (e) => {
        setAslot(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8080/Userpage/BookAppointment',
                {
                    adate: adate,
                    adid: adid,
                    adname: doctorlist.find((doctor) => doctor.did === parseInt(adid))?.dname,
                    aslot: aslot,
                    astatus: false,
                    auid: uid,
                    auname: uname,
                    drating: 3,
                    page: page,
                    pname: pname,
                    pphone: pphone,
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                }
            );
            if (response.data) {
                setAppintmentflag(true);
                setAppointmentmsg('Appointment Booked Successfully');
            } else {
                setAppintmentflag(true);
                setAppointmentmsg('Appointment Failed to Book. Maybe try another day or slot');
            }
        } catch (error) {
            console.log('Error in Booking appointment', error);
            setAppintmentflag(true);
            setAppointmentmsg('Appointment Failed to Book. Maybe try another day or slot');
        }

        setTimeout(() => {
            setPage(0);
            setPname('');
            setPphone('');
            setAdid(0);
            setAslot('');
            setAdate('');
            setAppintmentflag(false);
            setAppointmentmsg('');
        }, 3000);
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
                        <li><NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/user/${uname}`}><li>Homepage</li></NavLink><br /></li>
                        <li><NavLink style={{ textDecoration: 'none', color: 'black' }} to={`/user/${uname}/PreviousAppointment`}><li>Previous Appointments</li></NavLink><br /></li>
                        <li><UserLogout /></li>
                    </ul>
                </div>
            </nav>

            <section className='container bookappo-container'>
                <div className='bookappo'>
                    <h1>Book Appointments Here</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Patient Name:
                            <input type="text" value={pname} onChange={handlePnameChange} required />
                        </label>
                        <br />
                        <label>
                            Patient age:
                            <input type="number" value={page} onChange={handlePageChange} required />
                        </label>
                        <br />
                        <label>
                            Patient Phone no:
                            <input type="text" value={pphone} onChange={handlePphoneChange} required />
                        </label>
                        <br />
                        <label>
                            Choose Doctor:
                            <select value={adid} onChange={handleAdidChange} required>
                                <option value="">Select Doc</option>
                                {doctorlist.map((doctor, index) => (
                                    <option key={index} value={doctor.did}>
                                        {doctor.dname}, {doctor.specialization}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <br />
                        <label>
                            Appointment Date:
                            <input type="date" value={adate} onChange={handleAdateChange} required />
                        </label>
                        <br />
                        <label>
                            Appointment Slot:
                            <select value={aslot} onChange={handleAslotChange} required>
                                <option value="">Select Time</option>
                                <option value={doctorlist.find((doctor) => doctor.did === parseInt(adid))?.slot1}>
                                    {doctorlist.find((doctor) => doctor.did === parseInt(adid))?.slot1}
                                </option>
                                <option value={doctorlist.find((doctor) => doctor.did === parseInt(adid))?.slot2}>
                                    {doctorlist.find((doctor) => doctor.did === parseInt(adid))?.slot2}
                                </option>
                            </select>
                        </label>
                        <br />

                        <button type="submit">Book Appointment</button>

                        {appointmentflag && <p>{appointmentmsg}</p>}
                    </form>
                </div>
            </section>

            <Footer />
        </>
    );
}

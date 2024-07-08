import React , { useState,useEffect }from 'react'
import {Navigate } from 'react-router-dom'
import axios from 'axios';
import '../../App.css';
import '../UserPages/UserHomePage.css';
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';
import Usernav from '../../Components/UserNav/Usernav';

export default function UserPrevPage() {

    const uid = localStorage.getItem('bmdv3uid');
    const uname = localStorage.getItem('bmdv3uname');
   //  const uemail = localStorage.getItem('bmdv3uemail');
   //  const uphone = localStorage.getItem('bmdv3uphone');
    const jwtToken = localStorage.getItem('bmdv3ujwtToken');

    const [previousAppointments, setPreviousAppointments] = useState([]);
    const [prevAppoFlag, setPrevAppoFlag] = useState(false);
    const [prevAppointmentsMsg, setPrevAppointmentsMsg] = useState('');
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
                if(response.data.length===0){
                    setPrevAppoFlag(true);
                    setPrevAppointmentsMsg('No Previous Appointments');
                    console.log('No previous appointments');
                }
                else{
                    const tot = response.data.length;
                    setPrevAppoFlag(true);
                    setPrevAppointmentsMsg(`Total Appointments: ${tot}`);
                    setPreviousAppointments(response.data);
                }
            }
        } catch (error) {
            console.log('Cant Fetch appointments', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, [uid, uname, jwtToken]);

    if (!jwtToken) {
        return <Navigate to="/" />;
    }

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
        <Header/>
        <Usernav/>
        <section className='container userhome-container'> 
            <div className='userhome'>
                <h1>-History-</h1>
                {prevAppoFlag && <p className="totalappo">{prevAppointmentsMsg}</p>}
                <div className='appointmentshow'>
                    {previousAppointments.map((appointment, index) => (
                        <div key={index} className="appointmentcard">
                            <div className='beautify-card'>
                            </div>
                            <div className='appointmentdetails'>
                                <p><b>Appointment ID:</b> {appointment.aid}</p>
                                <p><b>Patient name:</b> {appointment.pname}</p>
                                <p><b>Patient age:</b> {appointment.page}</p>
                                <p><b>Patient Phone No:</b> {appointment.pphone}</p>
                                {/* <p><b>Booking Name:</b> {appointment.auname}</p> */}
                                <p><b>Doctor name:</b> {appointment.adname}</p>
                                <p><b>Date:</b> {appointment.adate} <b>Time:</b> {appointment.aslot}</p>
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

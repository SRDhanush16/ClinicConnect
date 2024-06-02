import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '../Pages/pagesStyles/doctorlist.css'
import './Users/appointmentcard.css';



export default function DoctorListPage() {

    const [doctorlist, setDoctorlist] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:8082/getDoctorList');
                setDoctorlist(response.data);
                console.log(doctorlist);
            } catch (error) {
                console.log('Error in fetching doctors: ', error);
            }
        };
        fetchDoctors();
    }, []);

  return (
    <>
        <Header/>
        <section className='container doctorlist-container'>
            <h1>Look At are Most Skilled Doctors</h1>
            <div className='doctorlist' >
                {
                    doctorlist.map((doctor,index)=>(
                        <div key={index} className='appointmentcard' >
                            <p><b>Name: </b>{doctor.dname}</p>
                            <p><b>Specialization: </b>{doctor.specialization}</p>
                            <p><b>Slot 1: </b>{doctor.slot1}</p>
                            <p><b>Slot 2: </b>{doctor.slot2}</p>
                        </div>
                    ))
                }
            </div>
        </section>
        <Footer/>
    </>
  )
}

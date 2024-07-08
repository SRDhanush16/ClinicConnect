import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';

import '../../App.css';
import './DoctorListPage.css';

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
        

        {/* <div className='background-doctorlist-img'>
            <div className='background-doctorlist-overlay'>
                <section className='container doctorlist-container'>
                    <h1>-Look At are Most Skilled Doctors-</h1>
                    <div className='doctorlist'>
                        <div>
                            <img src="/images/icons/doctor-user.png" alt="doctorphoto"/>
                            <p>NAME</p>
                            <p>Speicalzation</p>
                            <p>SLOT1: TIMING1 </p>
                            <p>SLOT2: TIMING2</p>
                        </div>

                        <div>
                            <img src="/images/icons/doctor-user.png" alt="doctorphoto"/>
                            <p>NAME</p>
                            <p>Speicalzation</p>
                            <p>SLOT1: TIMING1 </p>
                            <p>SLOT2: TIMING2</p>
                        </div>
                        <div>
                            <img src="/images/icons/doctor-user.png" alt="doctorphoto"/>
                            <p>NAME</p>
                            <p>Speicalzation</p>
                            <p>SLOT1: TIMING1 </p>
                            <p>SLOT2: TIMING2</p>
                        </div>
                        
                    </div>
                </section>
            </div>
        </div> */}


        <div className='background-doctorlist-img'>
            <div className='background-doctorlist-overlay'>
                <section className='container doctorlist-container'>
                    <h1>-Look At are Most Skilled Doctors-</h1>
                    <div className='doctorlist'>
                        {
                            doctorlist.map((doctor,index)=>(
                                <div key={index}>
                                    <img src="/images/icons/doctor-user.png" alt="doctorphoto"/>
                                    <p>{doctor.dname}</p>
                                    <p>{doctor.specialization}</p>
                                    <p>SLOT1: {doctor.slot1}</p>
                                    <p>SLOT2: {doctor.slot2}</p>
                                </div>
                            ))
                        }                        
                    </div>
                </section>
            </div>
        </div>

        <Footer/>

    </>
  )
}

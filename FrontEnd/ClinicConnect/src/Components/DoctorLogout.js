import React from 'react'
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom'

export default function DoctorLogout() {

    const navigate = useNavigate();

    const handleLogout = async(e) => {
        e.preventDefault();
        const jwtToken = localStorage.getItem('bmdv3djwtToken');
        try{
            const response = await axios.post('http://localhost:8082/logoutdoctor',{
                headers:{
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            console.log('Logout Successful',response.data);
            localStorage.removeItem('bmdv3did');
            localStorage.removeItem('bmdv3dname');
            localStorage.removeItem('bmdv3demail');
            localStorage.removeItem('bmdv3drating');
            localStorage.removeItem('bmdv3djwtToken');
            setTimeout(() => {
                navigate('/');
            }, 1000); // Wait for 3 seconds before navigating to /loginpage
        }catch(error){
            console.log('Error in log out', error);
        }
    };

  return (
    <>
        <button onClick={handleLogout}>Logout</button>
    </>
  )
}

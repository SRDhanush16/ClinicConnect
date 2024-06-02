import React from 'react'
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom'

export default function UserLogout() {

    const navigate = useNavigate();

    const handleLogout = async(e) => {
        e.preventDefault();
        const jwtToken = localStorage.getItem('bmdv3ujwtToken');
        try{
            const response = await axios.post('http://localhost:8080/logoutuser',{
                headers:{
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            console.log('Logout Successful',response.data);
            localStorage.removeItem('bmdv3uid');
            localStorage.removeItem('bmdv3uname');
            localStorage.removeItem('bmdv3uemail');
            localStorage.removeItem('bmdv3uphone');
            localStorage.removeItem('bmdv3ujwtToken');
            setTimeout(() => {
                navigate('/');
            }, 3000); // Wait for 3 seconds before navigating to /loginpage
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

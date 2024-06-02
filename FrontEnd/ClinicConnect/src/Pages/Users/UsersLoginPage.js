import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios';

import Header from '../../Components/Header'
import Footer from '../../Components/Footer'

import './userlogin.css'

export default function UsersLoginPage() {

    const navigate = useNavigate();

    // Users Datatype for Login
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // for displaying login response    
    const[uloginflag,setUloginflag] = useState(false);
    const[uloginmsg,setUloginmsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Username : ', username);
        console.log('Password : ', password);
        try {
            const response = await axios.post('http://localhost:8080/Userslogin', {
                uname: username,
                upassword: password,
            });
            console.log('Response data: ', response.data);
            if (response.data) {
                const { uid, uname, uemail, uphone, token, islogged } = response.data;
                setUloginflag(islogged);
                localStorage.setItem('bmdv3ujwtToken', token);
                localStorage.setItem('bmdv3uid', uid);
                localStorage.setItem('bmdv3uname', uname);
                localStorage.setItem('bmdv3uphone', uphone);
                localStorage.setItem('bmdv3uemail', uemail);
                console.log('Users Jwt token : ', token);
                setUloginmsg('login success');
                setTimeout(() => {
                    navigate(`/user/${uname}`);
                }, 3000);
            } else {
                setUloginflag(true);
                setUloginmsg('error in Backend');
                console.log('error in Backend');
            }
    
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setUloginflag(true);
                setUloginmsg('Unauthorized: Invalid Credentials');
                console.log('Unauthorized: Invalid Credentials', error);
            } else {
                setUloginflag(true);
                if (error.message.includes('ERR_CONNECTION_REFUSED')) {
                    setUloginmsg('Cannot register your account, Server Down');
                } else {
                    setUloginmsg('Server Down, We will be back online soon');
                }
            }
        }
    };
    
  return (
    <>
        <Header/>
        <section className='container userlogin-container'>
            <div>
                
                <div className='userlogin'>
                    <h1>User Login</h1>
                    <form onSubmit={handleSubmit} >
                        <label>
                            Username:
                        <input type="text" value={username} onChange={handleUsernameChange} />
                        </label>
                        
                        <label>
                            Password:
                        <input type="password" value={password} onChange={handlePasswordChange} />
                        </label>
                        
                        <button type="submit">Login</button>
                    </form>
                    {uloginflag && <p>{uloginmsg} </p>}
                </div>
            </div>
        </section>
        <Footer/>
    </>
  )
}

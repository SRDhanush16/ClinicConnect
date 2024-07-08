import React , { useState }from 'react'

import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';
import './CreateAccountPage.css';

export default function UserLoginPage() {

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
                }, 1500);
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
                    setUloginmsg('Server Down, We will be back online soon');
                } else {
                    setUloginmsg('Server Down, We will be back online soon');
                }
            }
        }
    };

  return (
    <>
        <Header/>
        <div className='background-form-img'>
            <div className='background-form-overlay'>
                <section className='container account-container'>
                    <div className='account-form'>
                        <img src="/images/ClinicConnectlogo.png" alt="clinicconnect logo" />

                        <h1>Users Login</h1>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Username:
                                <input
                                    type="text"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    required
                                />
                            </label>
                            <label>
                                Password:
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </label>

                            <button type="submit">Login</button>
                            {uloginflag && <p>{uloginmsg} </p>}
                        </form>
                    </div>
                </section>
            </div>
        </div>

        <Footer/>
    </>
  )
}

import React , { useState }from 'react'

import { useNavigate} from 'react-router-dom'
import axios from 'axios';

import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';
import './CreateAccountPage.css';
export default function DoctorLoginPage() {


    const navigate = useNavigate();

    // Doctors Datatype for Login
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    // for displaying the login response
    const[dloginflag,setDloginflag] = useState(false);
    const[dloginmsg,setDloginmsg] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log('Username : ', username);
        console.log('Password : ', password);
        try{
            const response = await axios.post('http://localhost:8082/Doctorslogin',{
                dname: username,
                dpassword: password,
            });
            console.log('Response data: ', response.data); 
            if(response.data){
                const { did, dname, demail, rating , token, islogged} = response.data;
                setDloginflag(islogged);
                setDloginmsg('Login Success');
                localStorage.setItem('bmdv3djwtToken', token);
                localStorage.setItem('bmdv3did',did);
                localStorage.setItem('bmdv3dname',dname);
                localStorage.setItem('bmdv3drating',rating);
                localStorage.setItem('bmdv3demail',demail);
                console.log('Doctors Jwt token : ', token);
                setTimeout(() => {
                    navigate(`/doctor/${dname}`);
                }, 1500);
            }else {
                setDloginflag(true);
                setDloginmsg('error in Backend');
                console.log('error in Backend');
            }

        }catch (error) {
            if (error.response && error.response.status === 401) {
                setDloginflag(true);
                setDloginmsg('Unauthorized: Invalid Credentials');
                console.log('Unauthorized: Invalid Credentials', error);
            } else {
                setDloginflag(true);
                if (error.message.includes('ERR_CONNECTION_REFUSED')) {
                    setDloginmsg('Server Down, We will be back online soon');
                } else {
                    setDloginmsg('Server Down, We will be back online soon');
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

                        <h1>Doctors Login</h1>
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

                            {dloginflag && <p>{dloginmsg}</p>}
                            

                        </form>
                    </div>
                </section>
            </div>
        </div>

        <Footer/>
    </>
  )
}

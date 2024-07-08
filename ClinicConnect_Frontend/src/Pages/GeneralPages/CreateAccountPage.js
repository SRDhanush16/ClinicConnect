import React , { useState }from 'react'

import axios from 'axios';

import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer';

import './CreateAccountPage.css';

export default function CreateAccountPage() {

    //Users Datatypes
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [role,setRole] = useState('user');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    // CreateAccount return/response
    const [createresponse,setCreateresponse] = useState(false);
    const [createresponsemsg,setCreateresponsemsg] = useState('');

    const handleSubmit = async(e) => {

        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        console.log('Email:', email);
        console.log('Phone:', phone);

        try{
            const response = await axios.post('http://localhost:8080/Createaccount',{
                uname: username, upassword: password, uemail: email, uphone: phone, rolee: role,
            });

            if(response.data){
                setCreateresponse(true);
                setCreateresponsemsg('Account created successfully!');
            }else{
                setCreateresponse(true);
                setCreateresponsemsg('Account with username already exists');
            }

        }catch(error){
            console.log('Error Creating account',error);
            setCreateresponse(true);
            if (error.message.includes('ERR_CONNECTION_REFUSED')) {
                setCreateresponsemsg('Cannot register your account, Server Down');
            } else {
                setCreateresponsemsg('Server Down, We will be back online soon');
            }
        }

        // Reset form fields
        setUsername('');
        setPassword('');
        setEmail('');
        setPhone('');

    };

  return (
    <>
        <Header/>

        <div className='background-form-img'>
            <div className='background-form-overlay'>
                <section className='container account-container'>
                    <div className='account-form'>
                        <img src="/images/ClinicConnectlogo.png" alt="clinicconnect logo" />

                        <h1>Create Account</h1>
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
                            <label>
                                Email:
                                <input
                                    type="text"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </label>
                            <label>
                                PhoneNo:
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    required
                                />
                            </label>

                            <button type="submit">Create Account</button>

                            {createresponse && (
                                <p>
                                {createresponsemsg}
                                </p>
                            )}
                            

                        </form>
                    </div>
                </section>
            </div>
        </div>

        <Footer/>
    </>
  )
}

// import React from 'react'
// import './register.css'
// const register = () => {
//   return (
//     <div>
//       <div class="logo-cmr">
//   </div>

//   <div class="Register-wrapper">
//     <form action="/register" class="form" id="reg-form" method="post">
      
//       <h2>Register</h2>
//       <div class="input-group">
//         <input type="Name" name="Name" id="RegName" autocomplete="off" required/>
//         <label for="Name">Name</label>
//       </div>
//       <div class="input-group">
//         <input type="text" name="loginUser" id="RegEmail" autocomplete="off" required/>
//         <label for="loginUser">Email</label>
//       </div>
//       <div class="input-group">
//         <input type="password" name="loginPassword" id="RegPassword" autocomplete="off" required/>
//         <label for="loginPassword">Password</label>
//       </div>
//       <input type="submit" value="Register" class="submit-btn" />
//       <p>Already Registered?</p>
//       <a href="login" class="forgot-pw">Login</a>
//     </form>
//   </div>
//     </div>
//   )
// }

// export default register


//vaic
import React, { useState } from 'react';
import './register.css';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../authSlice'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../authApiSlice'; 

const Register = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const [register] = useRegisterMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
           

            const { accessToken } = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ accessToken }));
        setName(''); 
        setEmail(''); 
        setPassword(''); 
        navigate('/dash/home'); 
           

        } catch (error) {
            console.log(error);
            
        }
    };

    return (
        <div>
            <div className="logo-cmr"></div>
            <div className="Register-wrapper">
                <form
                    action="/auth/register" 
                    className="form"
                    id="reg-form"
                    method="post"
                    onSubmit={handleSubmit}
                >
                    <h2>Register</h2>
                    <div className="input-group">
                        <input
                            type="text"
                            name="Name"
                            id="RegName"
                            autoComplete="off"
                            required
                            value={username}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="RegName">Name</label>
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="loginUser"
                            id="RegEmail"
                            autoComplete="off"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="RegEmail">Email</label>
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="loginPassword"
                            id="RegPassword"
                            autoComplete="off"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="RegPassword">Password</label>
                    </div>
                    <input type="submit" value="Register" className="submit-btn" />
                    <p>Already Registered?</p>
                    <a href="login" className="forgot-pw">
                        Login
                    </a>
                </form>
            </div>
        </div>
    );
};

export default Register;



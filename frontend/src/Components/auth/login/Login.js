import React from 'react'
import './login.css'
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../authSlice'
import { useLoginMutation } from '../authApiSlice'

import usePersist from '../../../hooks/usePersist'

const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
      userRef.current.focus()
  }, [])

  useEffect(() => {
      setErrMsg('');
  }, [email, password])

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const { accessToken } = await login({ email, password }).unwrap()
        dispatch(setCredentials({ accessToken }))
        setEmail('')
        setPassword('')
        navigate('/dash/home')
    } catch (err) {
        if (!err.status) {
            setErrMsg('No Server Response');
        } else if (err.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg(err.data?.message);
        }
        errRef.current.focus();
    }
}
const handleUserInput = (e) => setEmail(e.target.value)
const handlePwdInput = (e) => setPassword(e.target.value)
const handleToggle = () => setPersist(prev => !prev)

const errClass = errMsg ? "errmsg" : "offscreen"

if (isLoading) return <p>Loading...</p>



const content=(
    <div>
    <div className="logo-cmr">
</div>


<div className="login-wrapper" id="login">

  <form  className="form" onSubmit={handleSubmit}>
    <h2>Login</h2>
    <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
    <div className="input-group"> 
     
      <input type="text" 
      name="loginUser" 
      id="loginEmail"  
      ref={userRef}
      value={email}
      onChange={handleUserInput}
      autoComplete="off" required/>
      
      <label htmlFor="loginUser">Email</label>
    </div>
    <div className="input-group">
      <input type="password" 
      name="loginPassword" 
      id="loginPassword"
      onChange={handlePwdInput}
      value={password} required/>

      <label htmlFor="loginPassword">Password</label>
    
      <input type="submit" value="Login" className="submit-btn" />

      
    </div>
    <label htmlFor="persist" className="form__persist">
        <input
        type="checkbox"
          className="form__checkbox"
          id="persist"
           onChange={handleToggle}
            checked={persist}
           />
           Trust This Device
        </label>
  </form>
  </div>
  </div>
  )
  return content
}

export default Login

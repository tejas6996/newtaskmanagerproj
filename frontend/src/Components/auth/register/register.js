import React from 'react'
import './register.css'
const register = () => {
  return (
    <div>
      <div class="logo-cmr">
  </div>

  <div class="Register-wrapper">
    <form action="/register" class="form" id="reg-form" method="post">
      
      <h2>Register</h2>
      <div class="input-group">
        <input type="Name" name="Name" id="RegName" autocomplete="off" required/>
        <label for="Name">Name</label>
      </div>
      <div class="input-group">
        <input type="text" name="loginUser" id="RegEmail" autocomplete="off" required/>
        <label for="loginUser">Email</label>
      </div>
      <div class="input-group">
        <input type="password" name="loginPassword" id="RegPassword" autocomplete="off" required/>
        <label for="loginPassword">Password</label>
      </div>
      <input type="submit" value="Register" class="submit-btn" />
      <p>Already Registered?</p>
      <a href="login" class="forgot-pw">Login</a>
    </form>
  </div>
    </div>
  )
}

export default register

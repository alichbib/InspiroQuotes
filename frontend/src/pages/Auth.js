import React, { useState } from 'react';
import '../styles/Auth.css';
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  
  return (
    <div className="auth-grid">
      <div className="auth-container left">
        <h2>Sign In</h2>
        <SignIn />
      </div>
      <div className="auth-container right">
        <h2>Sign Up</h2>
        <SignUp />
      </div>
    </div>
  );
};

const SignIn = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [_, setCookies] = useCookies(["access_token"])

  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3001/auth/login",{
        username,
        password
      })
      console.log(response)
      setCookies("access_token", response.data.token)
      window.localStorage.setItem("userID", response.data.userID)
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={onSubmit} className="auth-form">
      <label htmlFor="username1">username:</label>
      <input
      type="text"
      id="username1"
      value={username}
      onChange={(e) => {setUsername(e.target.value)}} 
      />

      <label htmlFor="password1">Password:</label>
      <input
      type="password"
      id="password1"
      value={password}
      onChange={(e) => {setPassword(e.target.value)}}
      />

      <button type="submit">Sign In</button>
    </form>
  );
};

const SignUp = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3001/auth/registre",{
        username,
        password
      }) 
      setAlert(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    
    <form onSubmit={onSubmit} className="auth-form">
      <label htmlFor="username">username:</label>
      <input
      type="text"
      id="username"
      value={username}
      onChange={(e) => {setUsername(e.target.value)}}
      />

      <label htmlFor="password">Password:</label>
      <input 
        type="password"
        id="password"
        value={password}
        onChange={(e) => {setPassword(e.target.value)}}
        />

      <button type="submit">Sign Up</button>
      {alert && (
        <div className={`alert ${alert === 'user created' ? 'alert-success' : 'alert-danger'}`}>
          {alert}
        </div>
      )}
    </form>
  );
};

export default Auth;
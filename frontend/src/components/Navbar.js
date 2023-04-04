import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'
import { useCookies } from 'react-cookie'

function Navbar() {

  const [cookies, setCookies] = useCookies(["access_token"])

  const navigate = useNavigate()

  const logout = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
    navigate("/auth")
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">InspiroQuotes</Link>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/addQuote" className="navbar-link">Add Quote</Link>
        <Link to="/savedQuotes" className="navbar-link">Saved Quotes</Link>
        {!cookies.access_token ?  
        <Link to="auth" className="navbar-link">Login-SignUp</Link> : 
        <button onClick ={logout} className='logout'>Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar

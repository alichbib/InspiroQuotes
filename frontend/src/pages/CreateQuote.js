import React, { useState } from 'react'
import '../styles/createQuote.css'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const CreateQuote = () => {

  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [cookies, _] = useCookies(["access_token"])

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3001/quotes/addQuote", {
        quote,
        author,
        userOwner: window.localStorage.getItem('userID') 
      } , { 
        headers: {authorization: cookies.access_token} 
      })
      alert('Quote created :)')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="create-quote-container">
      <h1 className="create-quote-title">Create Quote</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor='quote' className="form-label">Quote</label>
          <input 
            type="text"
            id="quote"
            className="form-control"
            value={quote}
            onChange={(e) => {setQuote(e.target.value)}}
          />
        </div>
        <div className="form-group">
          <label htmlFor='author' className="form-label">Author</label>
          <input 
            type="text"
            id="author"
            className="form-control"
            value={author}
            onChange={(e) => {setAuthor(e.target.value)}}
          />
        </div>
        <button type='submit' className="submit-button">Add</button>
      </form>
    </div>
  )
}

export default CreateQuote

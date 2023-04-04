import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Home.css'
import { useCookies } from 'react-cookie'

const Home = () => {
  const [quotes, setQuotes] = useState([])
  const [savedQuotes, setSavedQuotes] = useState([])

  const [cookies, _] = useCookies(["access_token"])

  useEffect(() => {
    const getAllQuotes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/quotes/getQuotes');
        setQuotes(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    const savedQuotes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/quotes/savedQuotesIds/${window.localStorage.getItem('userID')}`)
        setSavedQuotes(response.data.savedQuotes)
        console.log(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    getAllQuotes()
    savedQuotes()
  }, [])

  const saveQuote = async (id) => {
    try {
      const reponse = await axios.put("http://localhost:3001/quotes", {
      quoteID: id,  
      userID: window.localStorage.getItem('userID'),
      }, { 
        headers: {authorization: cookies.access_token} 
      })
    } catch (error) {
      console.log(error)
    } 
  }

  const isQuoteSaved = (id) => savedQuotes.includes(id)

  return (
    <div className="home-container">
      <div className="quote-list">
        {quotes.map((quote) => {
          return (
            <div key={quote._id} className="quote-container">
              <p className="quote-text">{quote.quote}</p>
              <p className="author-text">wrote by {quote.author}</p>
              <button 
              onClick={() => saveQuote(quote._id)} 
              disabled={isQuoteSaved(quote._id)}>{isQuoteSaved(quote._id) ? 'saved' : "save"}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Home;

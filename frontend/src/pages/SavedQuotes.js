import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Home.css'

const SavedQuotes = () => {

  const [savedQuotes, setSavedQuotes] = useState([])

  useEffect(() => {
    const savedQuotes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/quotes/savedQuotes/${window.localStorage.getItem('userID')}`)
        setSavedQuotes(response.data.savedQuotes)
        console.log(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    savedQuotes()
  }, [])

  return (
    <div className="home-container">
      <div className="quote-list">
        {savedQuotes.map((quote) => {
          return (
            <div key={quote._id} className="quote-container">
              <p className="quote-text">{quote.quote}</p>
              <p className="author-text">wrote by {quote.author}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedQuotes

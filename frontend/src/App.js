import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Auth from './pages/Auth'
import SavedQuotes from './pages/SavedQuotes';
import CreateQuote from './pages/CreateQuote';
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/addQuote" element={<CreateQuote />}/>
            <Route path="savedQuotes" element={<SavedQuotes />}/>
            <Route path="/auth" element={<Auth />}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;

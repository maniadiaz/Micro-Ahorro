import Home from './app/page/home/Home';
import Login from './app/page/login/Login';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <div>
        <h2>Navbar</h2>
      </div>
      <div>
        <div>
          <Link to={"/"}> Home </Link>
          <span style={{ margin: '0 10px' }}>|</span>
          <Link to="/login">Login</Link>
        </div>

        <hr />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  )
}

export default App

import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

//https://codesandbox.io/s/cleverprogrammersreact-challenge-amazon-clone-x35kd?file=/src/App.js

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/e-commerce" element={<Home />}/>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

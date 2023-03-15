import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Product from './components/Product';
import PaymentPage from './components/PaymentPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductDetails from './components/ProductDetails';

//https://codesandbox.io/s/cleverprogrammersreact-challenge-amazon-clone-x35kd?file=/src/App.js
//Alka@123

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/e-commerce" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path='/addProduct' element={<Product/>} />
          <Route path='/productDetail' element={<ProductDetails/>}/>
          <Route path='/payment' element={<PaymentPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

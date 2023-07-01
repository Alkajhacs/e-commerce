import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Product from './components/Product';
import PaymentPage from './components/PaymentPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductDetails from './components/ProductDetails';
import CartDetails from './components/CartDetails';
import ConfirmationPage from './components/ConfirmationPage';
import Feedback from './components/Feedback';
import MyProfile from './components/MyProfile';
import AllUsers from './components/AllUsers';
import Orders from './components/Orders';
import AllFeedback from './components/AllFeedback';
import AllPayment from './components/AllPayment';
import OrderUpdate from './components/OrderUpdate';
import OrderTrack from './components/OrderTrack';
import GiveReview from './components/GiveReview';
import CheckReview from './components/CheckReview';
import AllReturns from './components/AllReturns';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/e-commerce" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path='/addProduct' element={<Product/>} />
          <Route path='/productDetail' element={<ProductDetails/>}/>
          <Route path='/payment' element={<PaymentPage/>}/>
          <Route path= '/cartDetails'element = {<CartDetails/>}/>
          <Route path= '/confimationPage' element = {<ConfirmationPage/>}/>
          <Route path= '/myProfile' element = {<MyProfile/>}/>
          <Route path= '/feedback' element = {<Feedback/>}/>
          <Route path= '/allUsers' element = {<AllUsers/>}/>
          <Route path= '/allOrders' element = {<Orders/>}/>
          <Route path= '/allFeedback' element = {<AllFeedback/>}/>
          <Route path= '/allPayment' element = {<AllPayment/>}/>
          <Route path= '/orderUpdate' element = {<OrderUpdate/>}/>
          <Route path = '/orderTrack' element = {<OrderTrack/>}/>
          <Route path = '/giveReview' element = {<GiveReview/>}/>
          <Route path = '/checkReview' element = {<CheckReview/>}/>
          <Route path = '/allReturns' element = {<AllReturns/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

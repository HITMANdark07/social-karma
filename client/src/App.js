import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from "./pages/Layout/Layout";
import { Donations } from "./pages/Donations/Donations";
import { Volunteer } from "./pages/Volunteer/Volunteer";
import { Pending } from "./pages/Pending/Pending";
import { Completed } from "./pages/Completed/Completed";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDonationsPerUser } from "./store/actions/donation.action";
import { getDonators } from "./store/actions/donators.action";

function App() {

  const {user} = useSelector(state => state.user) ;
  const dispatch = useDispatch();
  useEffect(() => {
    if(user){
      dispatch(getDonationsPerUser(user?._id));
      dispatch(getDonators('volunteer'));
    }
  },[user]);
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Layout />} />
        <Route path='/donations' element={<Donations />} />
        <Route path='/volunteer' element={<Volunteer />} />
        <Route path='/pending' element={<Pending />} />
        <Route path='/completed' element={<Completed />} />
      </Routes>
    </Router>
  );
}

export default App;

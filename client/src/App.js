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

function App() {
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

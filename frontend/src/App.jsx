
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/signup';
import Login from './pages/login';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './components/auth/login';
import Register from './components/auth/register';
import Home from './components/client/home'
import Client from './components/client/client'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="store" element={<Client />}>
        <Route path="" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;

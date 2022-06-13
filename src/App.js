import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './components/auth/login';
import Register from './components/auth/register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
    </Routes>
  );
}

export default App;

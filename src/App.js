import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="about" />
    </Routes>
  );
}

export default App;

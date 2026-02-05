import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Archive from './pages/Archive';
import About from './pages/About';
import Submit from './pages/Submit';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/about" element={<About />} />
        <Route path="/submit" element={<Submit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

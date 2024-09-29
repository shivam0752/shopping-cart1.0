import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from './components/Navbar';
import Home from "./pages/Home";
import Cart from "./pages/Cart";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={darkMode ? "min-h-screen bg-gray-900 text-gray-100" : "min-h-screen bg-gray-100 text-gray-900"}>
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} />} />
          <Route path="/cart" element={<Cart darkMode={darkMode} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

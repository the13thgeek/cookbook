import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import './App.scss';
import Surprise from "./pages/Surprise";

function App() {

  return (
    <Router>
      <div className="page-paper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/recipe/surprise" element={<Surprise />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

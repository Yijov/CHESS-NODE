import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header, HomePage, GamePage, Footer } from "../components";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gameroom/:roomid" element={<GamePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

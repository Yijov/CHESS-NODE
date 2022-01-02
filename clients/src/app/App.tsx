import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "../components/_shared_/header/Header";
import { GamePage } from "../components/game_room/page/GamePage";
import { Footer } from "../components/_shared_/footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/gameroom/:roomid" element={<GamePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import "./TicTacToeClassic.css";
import TicTacToeClassic from "./TicTacToeClassic";

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <span style={{ color: "#4caf50", fontWeight: 500 }}>TicTacToe Classic</span>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div style={{display:"flex", alignItems:"center", justifyContent:"center", minHeight:"85vh"}}>
            <TicTacToeClassic />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
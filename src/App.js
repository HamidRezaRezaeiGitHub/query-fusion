import React from "react";
import "./App.css";
import XMLInput from "./components/XMLInput";
import XQueryInput from "./components/XQueryInput";
import Results from "./components/Results";

function App() {
  return (
    <div className="App">
      <div className="left-panel">
        <div className="xml-container">
          <XMLInput />
        </div>
      </div>
      <div className="right-panel">
        <XQueryInput />
        <Results />
      </div>
    </div>
  );
}

export default App;

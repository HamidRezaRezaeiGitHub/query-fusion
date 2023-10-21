import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";

function App() {
  const [contentType, setContentType] = useState("XML");

  const handleContentTypeChange = (newContentType: string) => {
    setContentType(newContentType);
  };

  return (
    <div className="container-fluid">
      <NavBar onContentTypeChange={handleContentTypeChange} />
      <div className="row">
        <div className="col-md-6">{/* Left panel content */}</div>
        <div className="col-md-6">{/* Right panel content */}</div>
      </div>
    </div>
  );
}

export default App;

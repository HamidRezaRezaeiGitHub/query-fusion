import React, { useState, useEffect } from "react";
import "../styles/XMLInput.css";

const XMLInput = () => {
  const [xmlData, setXmlData] = useState("");
  const [fileXmlContent, setFileXmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const textAreaPlaceholder = "Paste your XML here...";
  function validateFileXMLContent(content) {
    return true; // Your validation logic
  }

  useEffect(() => {
    // Only run this effect if isLoading is true
    if (validateFileXMLContent(fileXmlContent)) {
      setXmlData(fileXmlContent);
    } else {
      alert("Please upload a valid XML file.");
      setXmlData(textAreaPlaceholder);
    }
    setIsLoading(false); // Set loading to false
  }, [fileXmlContent]); // Dependencies array

  function handleFileXMLContent(content) {
    setIsLoading(true);
    setFileXmlContent(content);
  }
  function handleFileUpload(event) {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file && file.type === "text/xml") {
        const reader = new FileReader();
        reader.onload = (e) => {
          handleFileXMLContent(e.target.result);
        };
        reader.readAsText(file);
      } else {
        alert("Please upload a valid XML file.");
      }
    }
  }

  return (
    <div className="xml-input">
      <div className="header">XML</div>
      {isLoading ? (
        <div className="spinner" /> // Show spinner when loading
      ) : (
        <>
          <textarea
            className="xml-textarea"
            placeholder={textAreaPlaceholder}
            value={xmlData} // Set the value of the textarea to the xmlData state variable
            onChange={(e) => setXmlData(e.target.value)} // Update the state variable when the textarea content changes
          />
          <input
            type="file"
            className="xml-file-input"
            accept=".xml"
            onChange={handleFileUpload}
          />
        </>
      )}
    </div>
  );
};

export default XMLInput;

import "./App.css";
import "./styles/debug.css";
import NavBar from "./components/NavBar";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="app full-screen">
      <div className="flex-item-navbar debug-border-red-pink">
        <NavBar />
      </div>
      <div className="flex-item-layout debug-border-navy-lightblue">
        <Layout />
      </div>
    </div>
  );
}

export default App;

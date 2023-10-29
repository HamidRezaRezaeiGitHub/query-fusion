import { Container } from "react-bootstrap";
import "./App.css";
import "./styles/debug.css";
import NavBar from "./components/NavBar";
import Layout from "./components/Layout";

function App() {
  return (
    <Container fluid className="app full-screen">
      <div className="flex-item-navbar debug-border2">
        <NavBar />
      </div>
      <div className="flex-item-layout debug-border3">
        <Layout />
      </div>
    </Container>
  );
}

export default App;

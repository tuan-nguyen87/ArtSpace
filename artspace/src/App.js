import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
//import HomePage from "./HomePage";
import NavigationBar from "./NavigationBar";
import LandingPage from "./LandingPage";
import Commissions from "./Commissions";
import MessagingPage from "./MessagingPage";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Commissions" element={<Commissions />} />
          <Route path="/MessagingPage" element={<MessagingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

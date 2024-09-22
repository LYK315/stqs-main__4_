import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GamePage from "./Game/Game";
import NewAgentPage from "./NewAgent/NewAgent";

function App() {
  return (
    <div className="relative z-0 h-screen overflow-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<GamePage />} />
          <Route path="/new-agent" element={<NewAgentPage />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;

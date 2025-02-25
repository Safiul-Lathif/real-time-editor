import "./App.css";
import Home from "./pages/index.jsx";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import EditorWithHighlightedChanges from "./pages/trackChanges.jsx";
import { HomePage } from "./pages/home.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:id" element={<Home />} />
          <Route
            path="/trackChanges"
            element={<EditorWithHighlightedChanges />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

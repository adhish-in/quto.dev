import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import URLEncoder from "./pages/URLEncoder";
import URLDecoder from "./pages/URLDecoder";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/tools/url-encoder" element={<URLEncoder />} />
        <Route path="/tools/url-decoder" element={<URLDecoder />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import URLEncoder from "./pages/URLEncoder";
import URLDecoder from "./pages/URLDecoder";
import "./index.css";
import RemoveLineBreaks from "./pages/RemoveLineBreaks";
import RenderString from "./pages/RenderString";
import RenderMarkdown from "./pages/RenderMarkdown";
import QueryParamEditor from "./pages/QueryParamEditor";
import JSONFormatter from "./pages/JSONFormatter";
import Help from "./pages/Help";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/tools/url-encoder" element={<URLEncoder />} />
        <Route path="/tools/url-decoder" element={<URLDecoder />} />
        <Route path="/tools/remove-line-breaks" element={<RemoveLineBreaks />} />
        <Route path="/tools/render-string" element={<RenderString />} />
        <Route path="/tools/render-markdown" element={<RenderMarkdown />} />
        <Route path="/tools/query-param-editor" element={<QueryParamEditor />} />
        <Route path="/tools/json-formatter" element={<JSONFormatter />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}

export default App;

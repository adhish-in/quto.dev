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
import ApiTester from "./pages/APITester";
import SMTPTester from "./pages/SMTPTester";
import TimezoneConverter from "./pages/TimeZoneConverter";
import Help from "./pages/Help";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <RouteChangeTracker />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/tools/url-encoder" element={<URLEncoder />} />
        <Route path="/tools/url-decoder" element={<URLDecoder />} />
        <Route path="/tools/remove-line-breaks" element={<RemoveLineBreaks />} />
        <Route path="/tools/render-string" element={<RenderString />} />
        <Route path="/tools/render-markdown" element={<RenderMarkdown />} />
        <Route path="/tools/query-param-editor" element={<QueryParamEditor />} />
        <Route path="/tools/json-formatter" element={<JSONFormatter />} />
        <Route path="/tools/api-tester" element={<ApiTester />} />
        <Route path="/tools/smtp-tester" element={<SMTPTester />} />
        <Route path="/tools/timezone-converter" element={<TimezoneConverter />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </Router>
  );
}


export default App;

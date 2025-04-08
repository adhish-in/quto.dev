import React, { useState } from "react";
import { Button, Card, Input, Space, message } from "antd";
import Footer from "../components/Footer";

const QueryParamEditor = () => {
  const [url, setUrl] = useState("");
  const [params, setParams] = useState([]);
  const [baseUrl, setBaseUrl] = useState("");

  const parseURL = () => {
    try {
      const parsedUrl = new URL(url);
      const entries = Array.from(parsedUrl.searchParams.entries());
      setBaseUrl(`${parsedUrl.origin}${parsedUrl.pathname}`);
      setParams(entries);
    } catch (e) {
      message.error("Invalid URL");
    }
  };

  const updateParam = (index, key, value) => {
    const updated = [...params];
    updated[index] = [key, value];
    setParams(updated);
  };

  const addParam = () => {
    setParams([...params, ["", ""]]);
  };

  const removeParam = (index) => {
    const updated = [...params];
    updated.splice(index, 1);
    setParams(updated);
  };

  const getUpdatedURL = () => {
    const query = params
      .filter(([key]) => key.trim() !== "")
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&");
    return query ? `${baseUrl}?${query}` : baseUrl;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUpdatedURL());
      message.success("Copied to clipboard!");
    } catch {
      message.error("Failed to copy");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white p-6 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">🔧 Query Parameter Editor</h1>

        <Card className="shadow-lg rounded-xl p-4">
          <Input.TextArea
            rows={2}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter full URL to edit parameters..."
          />

          <Button
            className="mt-4 w-full bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={parseURL}
          >
            Parse URL
          </Button>

          {params.length > 0 && (
            <div className="mt-6 space-y-4">
              {params.map(([key, value], idx) => (
                <Space key={idx} className="w-full">
                  <Input
                    placeholder="Key"
                    value={key}
                    onChange={(e) => updateParam(idx, e.target.value, value)}
                  />
                  <Input
                    placeholder="Value"
                    value={value}
                    onChange={(e) => updateParam(idx, key, e.target.value)}
                  />
                  <Button danger onClick={() => removeParam(idx)}>Remove</Button>
                </Space>
              ))}

              <Button onClick={addParam}>Add Parameter</Button>

              <div className="mt-4 bg-indigo-50 p-4 rounded border border-indigo-200">
                <strong className="text-indigo-700">Updated URL:</strong>
                <p className="break-all mt-2 text-gray-800">{getUpdatedURL()}</p>
                <Button className="mt-2" onClick={handleCopy}>Copy</Button>
              </div>
            </div>
          )}
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default QueryParamEditor;

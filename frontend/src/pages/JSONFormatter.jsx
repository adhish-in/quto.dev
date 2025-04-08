import React, { useState } from "react";
import { Button, Card, message } from "antd";
import JsonView from "@uiw/react-json-view";
import { lightTheme } from "@uiw/react-json-view/light";

const JSONFormatter = () => {
  const [input, setInput] = useState("");
  const [parsedJson, setParsedJson] = useState(null);

  const handleFormat = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/tools/json-formatter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: input }),
        }
      );

      const data = await response.json();
      if (data.result) {
        setParsedJson(JSON.parse(data.result));
      } else {
        message.error(data.error || "Formatting failed");
        setParsedJson(null);
      }
    } catch {
      message.error("Server error. Try again later.");
      setParsedJson(null);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(parsedJson, null, 2));
      message.success("Copied to clipboard!");
    } catch {
      message.error("Failed to copy.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white p-6 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">🧹 JSON Formatter</h1>

        <Card className="shadow-lg rounded-xl">
          <div className="p-4 flex flex-col gap-4">
            <textarea
              rows={8}
              placeholder="Paste raw or minified JSON here..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button
              type="primary"
              className="bg-indigo-600 hover:bg-indigo-700 w-full"
              onClick={handleFormat}
            >
              Format JSON
            </Button>

            {parsedJson && (
              <div className="bg-indigo-50 p-4 rounded-md border border-indigo-200 relative overflow-x-auto">
                <strong className="text-indigo-700 block mb-2">Formatted JSON:</strong>
                <JsonView
                  value={parsedJson}
                  style={{ fontSize: 14 }}
                  theme={lightTheme}
                  displayDataTypes={false}
                  enableClipboard={false}
                />
                <Button
                  size="small"
                  className="mt-4 border-indigo-500 text-indigo-600 hover:bg-indigo-600 hover:text-white"
                  onClick={handleCopy}
                >
                  Copy
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JSONFormatter;

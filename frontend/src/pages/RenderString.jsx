import React, { useState } from "react";
import { Button, Card, message } from "antd";

const RenderString = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleRender = () => {
    const formatted = input.replace(/\\n/g, "\n");
    setOutput(formatted);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      message.success("Output copied to clipboard!");
    } catch (err) {
      message.error("Failed to copy!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white p-6 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">📄 Render String</h1>

        <Card className="shadow-lg rounded-xl">
          <div className="p-4 flex flex-col gap-4">
            <textarea
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter text with line breaks..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button
              type="primary"
              className="bg-indigo-600 hover:bg-indigo-700 transition-all w-full rounded"
              onClick={handleRender}
            >
              Render
            </Button>

            {output && (
              <div className="bg-indigo-50 p-4 rounded-md border border-indigo-200 whitespace-pre-wrap relative">
                <strong className="text-indigo-700">Output:</strong>
                <p className="break-all mt-2 text-gray-800">{output}</p>

                <Button
                  size="small"
                  className="absolute top-2 right-2 border-indigo-500 text-indigo-600 hover:text-white hover:bg-indigo-600"
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

export default RenderString;

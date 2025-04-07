import React, { useState } from "react";
import { Button, Card, message } from "antd";
import ReactMarkdown from "react-markdown";

const RenderMarkdown = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleRender = () => {
    setOutput(input);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(input);
      message.success("Markdown copied to clipboard!");
    } catch {
      message.error("Failed to copy.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white p-6 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">📝 Markdown Renderer</h1>

        <Card className="shadow-lg rounded-xl">
          <div className="p-4 flex flex-col gap-4">
            <textarea
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Write your markdown here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button
              type="primary"
              className="bg-indigo-600 hover:bg-indigo-700 transition-all w-full rounded"
              onClick={handleRender}
            >
              Render Markdown
            </Button>

            {output && (
              <div className="bg-white p-4 rounded-md border border-indigo-200 prose max-w-none relative">
                <Button
                  size="small"
                  className="absolute top-2 right-2 border-indigo-500 text-indigo-600 hover:text-white hover:bg-indigo-600"
                  onClick={handleCopy}
                >
                  Copy
                </Button>
                <ReactMarkdown>{output}</ReactMarkdown>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RenderMarkdown;

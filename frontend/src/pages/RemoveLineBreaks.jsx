import React, { useState } from "react";
import { Button, Card, Select } from "antd";
import Footer from "../components/Footer";

const { Option } = Select;

const RemoveLineBreaks = () => {
  const [input, setInput] = useState("");
  const [replacement, setReplacement] = useState(" ");
  const [output, setOutput] = useState("");

  const handleRemoveLineBreaks = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/tools/remove-line-breaks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: input, replacement }),
        }
      );

      const data = await response.json();
      if (data.result) {
        setOutput(data.result);
      } else {
        setOutput("Error: " + data.error);
      }
    } catch (error) {
      setOutput("Error: Unable to connect to server.");
    }
  };

  const handleReplacementChange = (value) => {
    // Replace token with actual newline if selected
    setReplacement(value === "\\n" ? "\n" : value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white p-6 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">🚫 Remove Line Breaks</h1>

        <Card className="shadow-lg rounded-xl">
          <div className="p-4 flex flex-col gap-4">
            <textarea
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter text with line breaks..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Replace line breaks with:
              </label>
              <Select
                className="w-full"
                value={replacement === "\n" ? "\\n" : replacement}
                onChange={handleReplacementChange}
              >
                <Option value=" ">Space</Option>
                <Option value=",">Comma</Option>
                <Option value="|">Pipe (|)</Option>
                <Option value="-">Dash (-)</Option>
                <Option value="\\n">New Line</Option>
                <Option value="">Nothing (remove completely)</Option>
              </Select>
            </div>

            <Button
              type="primary"
              className="bg-indigo-600 hover:bg-indigo-700 transition-all w-full rounded"
              onClick={handleRemoveLineBreaks}
            >
              Remove Line Breaks
            </Button>

            {output && (
              <div className="bg-indigo-50 p-4 rounded-md border border-indigo-200 whitespace-pre-wrap">
                <strong className="text-indigo-700">Output:</strong>
                <p className="break-all mt-2 text-gray-800">{output}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default RemoveLineBreaks;

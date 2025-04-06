import React, { useState } from "react";
import { Button, Card } from "antd";

const URLDecoder = () => {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState("");

  const handleDecode = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tools/url-decode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();
      if (data.result) {
        setDecoded(data.result);
      } else {
        setDecoded("Error: " + data.error);
      }
    } catch (error) {
      setDecoded("Error: Unable to connect to server.");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">URL Decoder</h1>

        <Card>
          <div className="p-4 flex flex-col gap-4">
            <textarea
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter text to decode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button onClick={handleDecode}>Decode</Button>

            {decoded && (
              <div className="bg-gray-100 p-3 rounded-md">
                <strong>Decoded Output:</strong>
                <p className="break-all mt-1">{decoded}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default URLDecoder;

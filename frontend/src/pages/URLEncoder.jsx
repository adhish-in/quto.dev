import React, { useState } from "react";
import { Button, Card } from "antd";

const URLEncoder = () => {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");

  const handleEncode = async () => {
    try {
      const response = await fetch("${window.location.protocol}//${window.location.hostname}:8080/api/tools/url-encode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();
      if (data.result) {
        setEncoded(data.result);
      } else {
        setEncoded("Error: " + data.error);
      }
    } catch (error) {
      setEncoded("Error: Unable to connect to server.");
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 text-gray-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">URL Encoder</h1>

        <Card>
          <div className="p-4 flex flex-col gap-4">
            <textarea
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter text to encode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button onClick={handleEncode}>Encode</Button>

            {encoded && (
              <div className="bg-gray-100 p-3 rounded-md">
                <strong>Encoded Output:</strong>
                <p className="break-all mt-1">{encoded}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default URLEncoder;

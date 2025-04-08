import React, { useState } from "react";
import { Button, Card } from "antd";
import Footer from "../components/Footer";

const URLEncoder = () => {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");

  const handleEncode = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tools/url-encode`, {
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
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white p-6 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">🔐 URL Encoder</h1>

        <Card className="shadow-lg rounded-xl">
          <div className="p-4 flex flex-col gap-4">
            <textarea
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter text to encode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button
              type="primary"
              className="bg-indigo-600 hover:bg-indigo-700 transition-all w-full rounded"
              onClick={handleEncode}
            >
              Encode
            </Button>

            {encoded && (
              <div className="bg-indigo-50 p-4 rounded-md border border-indigo-200">
                <strong className="text-indigo-700">Encoded Output:</strong>
                <p className="break-all mt-2 text-gray-800">{encoded}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default URLEncoder;

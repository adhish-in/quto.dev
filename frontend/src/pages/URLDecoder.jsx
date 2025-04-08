import React, { useState } from "react";
import { Button, Card } from "antd";
import Footer from "../components/Footer";

const URLDecoder = () => {
  const [input, setInput] = useState("");
  const [decoded, setDecoded] = useState("");
  const [queryParams, setQueryParams] = useState([]);

  const handleDecode = async () => {
    try {
      const queryStart = input.indexOf("?");
      const basePart = queryStart >= 0 ? input.substring(0, queryStart) : input;
      const queryString = queryStart >= 0 ? input.substring(queryStart + 1) : "";

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tools/url-decode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: basePart }),
      });

      const data = await response.json();
      if (data.result) {
        const fullOutput = queryString ? `${data.result}?${queryString}` : data.result;
        setDecoded(fullOutput);
        setQueryParams(parseRawQueryParams(queryString));
      } else {
        setDecoded("Error: " + data.error);
        setQueryParams([]);
      }
    } catch (error) {
      setDecoded("Error: Unable to connect to server.");
      setQueryParams([]);
    }
  };

  const parseRawQueryParams = (queryString) => {
    if (!queryString) return [];
    return queryString.split("&").map((param) => {
      const [key, value = ""] = param.split("=");
      return [key, value];
    });
  };

  const isURL = (str) => {
    try {
      const url = new URL(str);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white p-6 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">🔓 URL Decoder</h1>

        <Card className="shadow-lg rounded-xl">
          <div className="p-4 flex flex-col gap-4">
            <textarea
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter text to decode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button
              type="primary"
              className="bg-indigo-600 hover:bg-indigo-700 transition-all w-full rounded"
              onClick={handleDecode}
            >
              Decode
            </Button>

            {decoded && (
              <div className="bg-indigo-50 p-4 rounded-md border border-indigo-200">
                <strong className="text-indigo-700">Decoded Output:</strong>
                <p className="break-all mt-2 text-gray-800">{decoded}</p>
              </div>
            )}
            {queryParams.length > 0 && (
              <div className="bg-white p-4 mt-4 border border-gray-300 rounded-md">
                <strong className="text-indigo-600 mb-2 block">Query Parameters:</strong>
                <div className="max-h-64 overflow-auto pr-2">
                  <ul className="list-disc list-inside space-y-1">
                    {queryParams.map(([key, value], idx) => {
                      const decodedValue = decodeURIComponent(value);
                      return (
                        <ol key={idx} className="break-all">
                          <span className="font-medium">{key}:</span>{" "}
                          {isURL(decodedValue) ? (
                            <a
                              href={decodedValue}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              {decodedValue}
                            </a>
                          ) : (
                            decodedValue
                          )}
                        </ol>
                      );
                    })}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default URLDecoder;

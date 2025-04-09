import React, { useState } from "react";
import { Button, Card, Input, Select, message, Tabs, Radio } from "antd";
import Footer from "../components/Footer";

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const ApiTester = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts");
  const [headers, setHeaders] = useState("{\"Content-Type\": \"application/json\"}");
  const [body, setBody] = useState("{}");
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const [renderType, setRenderType] = useState("raw");

  const sendRequest = async () => {
    try {
      const parsedHeaders = headers ? JSON.parse(headers) : {};

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tools/api-tester`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, method, headers: parsedHeaders, body }),
      });

      const data = await response.json();
      if (data.error) {
        setStatus("Error");
        setResponse(data.error);
      } else {
        setStatus(data.status);
        setResponse(data);
      }
    } catch (err) {
      setStatus("Error");
      setResponse(err.message);
      message.error("Failed to send request");
    }
  };

  const renderResponseContent = () => {
    if (!response) return null;

    const contentType = response.contentType || "";
    const rawBody = response.body;

    if (renderType === "html") {
      return <iframe title="HTML Response" srcDoc={rawBody} className="w-full h-96 border rounded-md bg-white" />;
    }

    if (renderType === "json") {
      return <pre className="mt-2 break-words">{JSON.stringify(rawBody, null, 2)}</pre>;
    }

    return <pre className="mt-2 break-words">{typeof rawBody === "object" ? JSON.stringify(rawBody, null, 2) : rawBody}</pre>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white p-6 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">🌐 API Tester</h1>

        <Card className="shadow-lg rounded-xl p-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Select value={method} onChange={setMethod} className="w-32">
                {["GET", "POST", "PUT", "DELETE", "PATCH"].map((m) => (
                  <Option key={m} value={m}>{m}</Option>
                ))}
              </Select>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter API URL"
                className="flex-1"
              />
            </div>

            <Tabs defaultActiveKey="1">
              <TabPane tab="Headers" key="1">
                <TextArea
                  rows={6}
                  value={headers}
                  onChange={(e) => setHeaders(e.target.value)}
                  placeholder='{"Content-Type": "application/json"}'
                />
              </TabPane>
              <TabPane tab="Body" key="2">
                <TextArea
                  rows={6}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder='{"key": "value"}'
                />
              </TabPane>
            </Tabs>

            <Button
              type="primary"
              className="bg-indigo-600 hover:bg-indigo-700 w-full"
              onClick={sendRequest}
            >
              Send Request
            </Button>

            {status && (
              <div className="bg-gray-100 p-4 mt-4 rounded border border-gray-300">
                <strong>Status:</strong> {status}
              </div>
            )}

            {response && (
              <div className="bg-indigo-50 p-4 mt-2 rounded border border-indigo-200 text-sm overflow-auto max-h-[40rem]">
                <div className="flex justify-between mb-2 items-center">
                  <strong className="text-indigo-700">Response:</strong>
                  <Radio.Group value={renderType} onChange={(e) => setRenderType(e.target.value)}>
                    <Radio.Button value="raw">Raw</Radio.Button>
                    <Radio.Button value="json">JSON</Radio.Button>
                    <Radio.Button value="html">HTML</Radio.Button>
                  </Radio.Group>
                </div>
                {renderResponseContent()}
              </div>
            )}
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ApiTester;

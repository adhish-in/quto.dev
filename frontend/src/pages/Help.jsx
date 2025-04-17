import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";

const groupedTools = {
  URL: [
    {
      name: "🔐 URL Encoder",
      description: "Convert unsafe characters into percent-encoding for use in URLs.",
      path: "/tools/url-encoder",
    },
    {
      name: "🔓 URL Decoder",
      description: "Decode encoded URLs and view query parameters in a readable format.",
      path: "/tools/url-decoder",
    },
    {
      name: "⚙️ Query Param Editor",
      description: "Add, remove, or update URL query parameters interactively.",
      path: "/tools/query-param-editor",
    },
  ],
  TEXT: [
    {
      name: "🚫 Remove Line Breaks",
      description: "Strip line breaks and replace them with spaces, commas, or nothing.",
      path: "/tools/remove-line-breaks",
    },
    {
      name: "📄 Render String",
      description: "Render escaped newline characters (\\n) into actual line breaks.",
      path: "/tools/render-string",
    },
    {
      name: "📝 Render Markdown",
      description: "Convert Markdown text into beautifully rendered HTML preview.",
      path: "/tools/render-markdown",
    },
  ],
  HTTP: [
    {
      name: "🌐 API Tester",
      description: "Send HTTP requests like GET, POST, PUT and view responses. A mini Postman!",
      path: "/tools/api-tester",
    },
  ],
  JSON: [
    {
      name: "🧾 JSON Formatter",
      description: "Paste raw JSON and view a nicely indented, color-coded output.",
      path: "/tools/json-formatter",
    },
  ],
  EMAIL: [
    {
      name: "📧 SMTP Tester",
      description: "Send test emails using SMTP credentials to verify connectivity and authentication.",
      path: "/tools/smtp-tester",
    },
  ],
  TIME: [
    {
      name: "⏱️ Timezone Converter",
      description: "Convert date & time between different timezones instantly.",
      path: "/tools/timezone-converter",
    },
  ],
  IMAGE: [
    {
      name: "📐 Image Resizer",
      description: "Resize images to specific dimensions or scale them proportionally.",
      path: "/tools/image-resizer",
    },
  ],
};

const Help = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white py-10 px-4 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-indigo-700 text-center">
          🛠️ Help
        </h1>

        {Object.entries(groupedTools).map(([category, tools]) => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 border-b pb-1">
              {category}
            </h2>
            <div className="grid gap-6">
              {tools.map((tool) => (
                <Card key={tool.name} className="shadow rounded-lg">
                  <Link to={tool.path} className="block">
                    <h3 className="text-xl font-semibold text-indigo-600 mb-1">{tool.name}</h3>
                  </Link>
                  <p className="text-gray-700">{tool.description}</p>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;

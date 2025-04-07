import React, { useState } from "react";
import { Input, Card } from "antd";
import { Link } from "react-router-dom";

const tools = [
  {
    category: "URL",
    items: [
      { name: "URL Encoder", path: "/tools/url-encoder" },
      { name: "URL Decoder", path: "/tools/url-decoder" },
      { name: "Query Param Editor", path: "/tools/query-param-editor" },
    ],
  },
  {
    category: "String",
    items: [
      { name: "Remove Line Breaks", path: "/tools/remove-line-breaks" },
      { name: "Render String", path: "/tools/render-string" },
    ],
  },
];

const colorClasses = [
  "bg-gradient-to-r from-cyan-500 to-blue-500 text-white",
  "bg-gradient-to-r from-pink-500 to-rose-500 text-white",
  "bg-gradient-to-r from-purple-500 to-indigo-500 text-white",
  "bg-gradient-to-r from-teal-400 to-green-500 text-white",
  "bg-gradient-to-r from-orange-400 to-red-500 text-white",
];

const HomePage = () => {
  const [search, setSearch] = useState("");

  const filteredTools = tools.map((category) => ({
    ...category,
    items: category.items.filter((tool) =>
      tool.name.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((category) => category.items.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white py-10 px-4 text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">
          🎨 <span className="text-pink-500">Quto.dev</span> - Quick Tools for Developers
        </h1>

        <div className="mb-8">
          <Input.Search
            placeholder="Search developer tools..."
            allowClear
            onChange={(e) => setSearch(e.target.value)}
            size="large"
            className="w-full shadow-md"
          />
        </div>

        {filteredTools.map((category, categoryIndex) => (
          <div key={category.category} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-300 text-indigo-600">
              {category.category}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {category.items.map((tool, toolIndex) => (
                <Link key={tool.name} to={tool.path}>
                  <Card
                    hoverable
                    className={`rounded-lg shadow-md p-4 transition-all duration-300 ${colorClasses[(categoryIndex + toolIndex) % colorClasses.length]}`}
                  >
                    <p className="text-lg font-semibold">{tool.name}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {filteredTools.length === 0 && (
          <div className="text-center text-gray-500">No tools found.</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

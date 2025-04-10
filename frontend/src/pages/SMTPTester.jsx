import React, { useState } from "react";
import { Button, Card, Input, message } from "antd";
import Footer from "../components/Footer";

const SMTPTester = () => {
  const [form, setForm] = useState({
    host: "",
    port: "587",
    secure: false,
    user: "",
    pass: "",
    to: "",
    subject: "SMTP Test Email",
    text: "Hello! This is a test email from Quto SMTP Tester.",
  });
  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSend = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tools/smtp-tester`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.result) {
        setOutput(data.result);
        message.success("Email sent successfully!");
      } else {
        setOutput("Error: " + data.error);
        message.error("Failed to send email.");
      }
    } catch (err) {
      setOutput("Error: Unable to connect to server.");
      message.error("Server connection failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white p-6 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">📧 SMTP Tester</h1>

        <Card className="shadow-lg rounded-xl p-4 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-indigo-700 mb-2">1. SMTP Information</h2>
            <div className="flex flex-col gap-3">
              <Input name="host" placeholder="SMTP Host" value={form.host} onChange={handleChange} />
              <Input name="port" placeholder="Port (e.g. 587)" value={form.port} onChange={handleChange} />
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="secure" checked={form.secure} onChange={handleChange} />
                Use secure (SSL/TLS)
              </label>
              <Input name="user" placeholder="Username" value={form.user} onChange={handleChange} />
              <Input name="pass" type="password" placeholder="Password" value={form.pass} onChange={handleChange} />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-indigo-700 mb-2">2. Sample Email Details</h2>
            <div className="flex flex-col gap-3">
              <Input name="to" placeholder="To Email Address" value={form.to} onChange={handleChange} />
              <Input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
              <Input.TextArea rows={4} name="text" placeholder="Message" value={form.text} onChange={handleChange} />
            </div>
          </div>
          <div className="mt-4 mb-4">
            <Button
              type="primary"
              className="bg-indigo-600 hover:bg-indigo-700 transition-all w-full rounded"
              onClick={handleSend}
            >
              Send Test Email
            </Button>
          </div>

          {output && (
            <div className="bg-indigo-50 p-4 rounded-md border border-indigo-200 whitespace-pre-wrap">
              <strong className="text-indigo-700">Result:</strong>
              <p className="break-all mt-2 text-gray-800">{output}</p>
            </div>
          )}
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SMTPTester;

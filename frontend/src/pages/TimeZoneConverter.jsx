import React, { useState } from "react";
import { Button, Card, Select, DatePicker, TimePicker, message } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Footer from "../components/Footer";
import moment from "moment-timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const { Option } = Select;

const TimezoneConverter = () => {
  const browserTimeZone = moment.tz.guess();
  const [datetime, setDatetime] = useState(dayjs());
  const [fromZone, setFromZone] = useState(browserTimeZone);
  const [toZone, setToZone] = useState("US/Pacific");
  const [converted, setConverted] = useState("");

  const timezones = moment.tz.names();

  const handleConvert = () => {
    if (!datetime) {
      message.error("Please select date and time.");
      return;
    }

    try {
      const dt = dayjs.tz(datetime.format("YYYY-MM-DD HH:mm"), fromZone);
      const convertedTime = dt.tz(toZone).format("YYYY-MM-DD HH:mm:ss"); // Removed timezone suffix
      setConverted(convertedTime);
    } catch (err) {
      message.error("Failed to convert time.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white p-6 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">⏱️ Timezone Converter</h1>

        <Card className="shadow-lg rounded-xl p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2">Select Date & Time</label>
              <div className="flex flex-col gap-4 md:flex-row">
                <DatePicker
                  className="w-full"
                  value={datetime}
                  onChange={(date) =>
                    setDatetime(date ? date.hour(datetime.hour()).minute(datetime.minute()) : null)
                  }
                />
                <TimePicker
                  className="w-full"
                  format="HH:mm"
                  value={datetime}
                  onChange={(time) => {
                    if (datetime && time) {
                      setDatetime(datetime.hour(time.hour()).minute(time.minute()));
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">From Timezone</label>
              <Select
                showSearch
                value={fromZone}
                onChange={setFromZone}
                className="w-full"
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              >
                {timezones.map((tz) => (
                  <Option key={tz} value={tz}>
                    {tz}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">To Timezone (for reference)</label>
              <Select
                showSearch
                value={toZone}
                onChange={setToZone}
                className="w-full"
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              >
                {timezones.map((tz) => (
                  <Option key={tz} value={tz}>
                    {tz}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="mb-4 mt-4">
            <Button
              type="primary"
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              onClick={handleConvert}
            >
              Convert
            </Button>
          </div>


          {converted && (
            <div className="bg-indigo-50 p-4 rounded-md border border-indigo-200">
              <p className="mt-2 text-lg text-gray-800">{converted}</p>
            </div>
          )}
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default TimezoneConverter;

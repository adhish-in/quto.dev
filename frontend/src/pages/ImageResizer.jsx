import React, { useState } from "react";
import { Button, Card, Input, Checkbox, Upload, message } from "antd";
import Footer from "../components/Footer";

const ImageResizer = () => {
  const [imageFile, setImageFile] = useState(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [newWidth, setNewWidth] = useState("");
  const [newHeight, setNewHeight] = useState("");
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [resizedImageUrl, setResizedImageUrl] = useState("");

  const handleImageUpload = (info) => {
    const file = info?.file;

    if (!file) {
      console.log("File not found.");
      return message.error("No file detected.");
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      return message.error("Only JPG and PNG files are supported.");
    }

    const img = new Image();
    img.onload = () => {
      setOriginalDimensions({ width: img.width, height: img.height });
      setNewWidth(img.width);
      setNewHeight(img.height);
      setImageFile(file);
    };
    img.src = URL.createObjectURL(file);
  };


  const handleResize = async () => {
    if (!imageFile) return message.error("Upload an image first.");

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("width", newWidth);
    formData.append("height", newHeight);
    formData.append("maintainRatio", maintainRatio);

    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/tools/image-resize`, {
      method: "POST",
      body: formData,
    });

    const blob = await response.blob();
    if (response.ok) {
      setResizedImageUrl(URL.createObjectURL(blob));
    } else {
      message.error("Failed to resize image.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white p-6 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600 text-center">📐 Image Resizer</h1>

        <Card className="shadow-lg rounded-xl p-4 space-y-4">
          <Upload
            showUploadList={false}
            accept="image/png,image/jpeg"
            beforeUpload={() => false}
            onChange={handleImageUpload}
          >
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700">Upload Image</Button>
          </Upload>

          {imageFile && (
            <div className="space-y-2">
              <p>
                Original Size: {originalDimensions.width} x {originalDimensions.height}
              </p>
              <Input
                type="number"
                value={newWidth}
                onChange={(e) => {
                  const newW = parseInt(e.target.value, 10);
                  setNewWidth(newW);
                  if (maintainRatio && originalDimensions.width && originalDimensions.height) {
                    const ratio = originalDimensions.height / originalDimensions.width;
                    setNewHeight(Math.round(newW * ratio));
                  }
                }}
                placeholder="New Width"
              />
              <Input
                type="number"
                value={newHeight}
                onChange={(e) => setNewHeight(e.target.value)}
                placeholder="New Height"
                disabled={maintainRatio}
              />
              <Checkbox
                checked={maintainRatio}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setMaintainRatio(checked);
                  if (checked && newWidth && originalDimensions.width && originalDimensions.height) {
                    const ratio = originalDimensions.height / originalDimensions.width;
                    setNewHeight(Math.round(newWidth * ratio));
                  }
                }}
              >
                Maintain Aspect Ratio
              </Checkbox>
              <Button className="bg-indigo-600 text-white w-full" onClick={handleResize}>
                Resize
              </Button>
            </div>
          )}

          {resizedImageUrl && (
            <div className="mt-4">
              <p className="mb-2 font-semibold">Resized Image:</p>
              <img src={resizedImageUrl} alt="Resized" className="max-w-full rounded border" />
              <a
                href={resizedImageUrl}
                download="resized-image"
                className="block mt-2 text-indigo-600 underline"
              >
                Download Image
              </a>
            </div>
          )}
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ImageResizer;

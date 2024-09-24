"use client";

import { useState } from "react";

export default function AnimalDetectionPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [classification, setClassification] = useState<string | null>(null);
  const [isDangerous, setIsDangerous] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle the image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  // Function to simulate image classification and danger detection
  const classifyImage = async () => {
    if (!selectedImage) return;

    setLoading(true);

    // Call to your backend API or external CV model to classify the image
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      // Send image to the backend for classification
      const response = await fetch("/api/classify-animal", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setClassification(data.animal);
      setIsDangerous(data.isDangerous);
    } catch (error) {
      console.error("Error during classification:", error);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Animal Detection App</h1>

      {/* Image Upload Field */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      <button
        onClick={classifyImage}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!selectedImage || loading}
      >
        {loading ? "Classifying..." : "Upload and Classify"}
      </button>

      {/* Display classification results */}
      {classification && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Detected Animal: {classification}</h2>
          <p>
            This animal is {isDangerous ? "dangerous" : "not dangerous"}.
          </p>
        </div>
      )}
    </div>
  );
}

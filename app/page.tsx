"use client";

import { useState } from "react";

export default function AnimalDetectionPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [classification, setClassification] = useState<string | null>(null);
  const [isDangerous, setIsDangerous] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle the image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // Preview the image
    }
  };

  // Function to classify the uploaded image
  const classifyImage = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      // Send image to the backend for classification
      const response = await fetch("/api/classify-animal", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to classify the image");
      }

      const data = await response.json();
      setClassification(data.animal);
      setIsDangerous(data.isDangerous);
    } catch (error) {
      console.error("Error during classification:", error);
      setError("Error classifying the image. Please try again.");
    } finally {
      setLoading(false);
    }
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

      {imagePreview && (
        <div className="mb-4">
          <img src={imagePreview} alt="Selected Animal" className="max-w-xs h-auto" />
        </div>
      )}

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

      {/* Display error message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

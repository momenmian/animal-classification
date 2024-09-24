import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Get the image from the request (use formData)
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file || typeof file === "string") {
      return new NextResponse("No image provided", { status: 400 });
    }

    // Send the image to the Computer Vision model for classification (replace with actual CV model API)
    const cvResponse = await fetch("CV_MODEL_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: file, // Assuming the model accepts binary image data
    });

    const cvData = await cvResponse.json();
    const animal = cvData.animal; // Assuming the model returns the classified animal

    // Simulate a Wikipedia API request to retrieve animal description and danger status (replace with actual API call)
    const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${animal}`);
    const wikiData = await wikiResponse.json();

    // Simulate determining if the animal is dangerous based on Wikipedia description (this can be more advanced)
    const isDangerous = wikiData.extract.includes("dangerous");

    return NextResponse.json({
      animal,
      description: wikiData.extract,
      isDangerous,
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    return new NextResponse("Failed to process the request", { status: 500 });
  }
}

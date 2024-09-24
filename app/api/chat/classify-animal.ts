import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Get the image from the request (use formData)
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file || typeof file === "string") {
      return new NextResponse("No image provided", { status: 400 });
    }

    // Send the image to the Computer Vision model for classification
    const cvResponse = await fetch("CV_MODEL_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: file, // Assuming the model accepts binary image data
    });

    if (!cvResponse.ok) {
      return new NextResponse("Failed to classify the animal", { status: 500 });
    }

    const cvData = await cvResponse.json();
    const animal = cvData.animal; // Assuming the model returns the classified animal

    // Fetch the animal's description from Wikipedia
    const wikiResponse = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${animal}`);
    if (!wikiResponse.ok) {
      return new NextResponse("Failed to retrieve animal info from Wikipedia", { status: 500 });
    }

    const wikiData = await wikiResponse.json();

    // Determine if the animal is dangerous based on Wikipedia data (custom logic)
    const isDangerous = wikiData.extract.includes("dangerous") || wikiData.extract.includes("predator");

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

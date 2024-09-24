# Animal Detection & Danger Assessment App

## Overview
The **Animal Detection & Danger Assessment App** allows users to upload images of animals, classify them using a Computer Vision model, and assess whether the detected animal is dangerous. This application integrates AI to provide real-time feedback based on the uploaded images, leveraging external APIs for animal classification and danger assessment.

## Features
- **Image Upload**: Upload an image containing an animal.
- **Animal Classification**: Automatically classify the uploaded image to detect various animals.
- **Danger Assessment**: Retrieve information from Wikipedia to determine if the detected animal is dangerous.
- **Real-Time Results**: Display the classification results and danger status in real-time.
- **Structured Output**: Show the detected animal's name and danger assessment in a user-friendly format.

## Tech Stack
- **Next.js**: For building the web interface and handling server-side API requests.
- **React**: To create interactive and dynamic UI components.
- **TypeScript**: Provides type safety and enhances code quality.
- **OpenAI API**: Used for AI-driven character extraction and story generation (if applicable).
- **Tailwind CSS**: For styling and creating a responsive design.
- **Node.js**: Server environment to run the application.
- **FileReader API**: Used to handle file uploads and read image content.

## Prerequisites
To run this project, ensure you have the following:

- A valid OpenAI API key to access AI models.
- **Node.js** installed (v14.x or higher).
- **npm** or **yarn** to manage dependencies.


- A valid OpenAI API key to access AI models.
- **Node.js** installed (v14.x or higher).
- **npm** or **yarn** to manage dependencies.

## Setup and Installation

1. Clone the Story Telling App repository:
   ```
   git clone https://github.com/momenmian/animal-classification
   ```

2. Navigate to the project directory:
   ```
   cd animal-classification
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   ```
   OPENAI_API_BASE=http://127.0.0.1:5000/v1
   ```

5. Run the development server:
   ```
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage
1. Upload an image containing an animal.
2. Click the **Upload and Classify** button to classify the animal in the uploaded image.
3. View the classification results, including the name of the detected animal.
4. Learn whether the detected animal is dangerous based on information retrieved from Wikipedia.

## Future Enhancements
- **Support for Multiple Image Formats**: Expand file upload capabilities to support more image types.
- **Animal Detail Display**: Provide more detailed information about the detected animal beyond danger assessment.
- **User Rating System**: Allow users to rate the accuracy of animal classification results for feedback and improvement.

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgments
- Special thanks to **OpenAI** for providing the API that powers the AI-driven functionalities.
- Thanks to the open-source community for their valuable contributions and resources.
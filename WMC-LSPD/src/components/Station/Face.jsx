import React, { useState } from 'react';
import face_recog from "../../assets/face_recog.jpeg";

function Face() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchFaceMatch = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("img1", image1);
    formData.append("img2", image2);

    try {
      const response = await fetch("http://localhost:8000/face/check", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.status);
      } else {
        console.error("Failed to fetch face match result");
      }
    } catch (error) {
      console.error("Error fetching face match result:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange1 = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleImageChange2 = (e) => {
    setImage2(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image1 && image2) {
      fetchFaceMatch();
    } else {
      console.error("Please upload both images");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${face_recog})` }}>
      <div className="bg-gray-800 bg-opacity-30 shadow-lg rounded-xl p-8 m-4 w-full sm:w-4/5 md:w-3/5 lg:w-1/2 backdrop-blur-2xl border border-gray-700 shadow-2xl shadow-black">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
          LSPD - Face Recognition
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-6">
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Upload Image 1
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange1}
                className="block w-full text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 dark:file:bg-gray-700 dark:file:text-gray-200 hover:file:bg-gray-300 dark:hover:file:bg-gray-600"
              />
              {image1 && (
                <img
                  src={URL.createObjectURL(image1)}
                  alt="Image 1"
                  className="mt-4 object-cover h-60 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm"
                />
              )}
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Upload Image 2
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange2}
                className="block w-full text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 dark:file:bg-gray-700 dark:file:text-gray-200 hover:file:bg-gray-300 dark:hover:file:bg-gray-600"
              />
              {image2 && (
                <img
                  src={URL.createObjectURL(image2)}
                  alt="Image 2"
                  className="mt-4 object-cover h-60 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm"
                />
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
        {result && (
          <div className="mt-6 text-center text-lg font-bold text-gray-900 dark:text-gray-100">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default Face;

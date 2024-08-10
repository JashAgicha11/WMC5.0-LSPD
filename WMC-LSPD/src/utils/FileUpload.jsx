import React, { useState } from "react";
import { upload } from "../assets";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      setFile(files[0]);
    }
  };

  return (
    <div className="flex justify-center w-full h-[60%]">
      <label
        htmlFor="file"
        className="cursor-pointer bg-gray-200 w-full p-8 rounded-2xl border-2 border-dashed border-gray-600 shadow-lg  items-center justify-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex h-[100%] flex-col items-center justify-center gap-2">
          <img className="w-[60%] h-[40%] " src={upload} alt="" />
          {!file && (
            <div className="flex h-[60%] justify-center flex-col items-center text-lg">
              <p>Drag and Drop</p>
              <p>or</p>
            </div>
          )}

          {file && (
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">Selected file:</p>
              <p>{file.name}</p>
            </div>
          )}

          <span className="bg-gray-600 w-[70%] text-white px-4 p-2 rounded-lg transition duration-300 hover:bg-gray-800 flex justify-center items-center">
            Browse file
          </span>
        </div>
        <input
          id="file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUpload;

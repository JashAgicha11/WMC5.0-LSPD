import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Admin, upload } from "../../assets";
import "./btn.css";
import useStore from "../../Store/store";

const CreateNewsModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    picture: null,
    header: "",
    content: "",
    author: "",
  });

  const { setToastr } = useStore();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      setFormData({ ...formData, picture: files[0] });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };

  const dataEmpty = () => {
    setFormData({
      picture: null,
      header: "",
      content: "",
      author: "",
    });
  };

  const handleClose = () => {
    onClose();
    dataEmpty();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { picture, header, content, author } = formData;

    const formDataObj = new FormData();
    formDataObj.append("file", picture);
    formDataObj.append("title", header);
    formDataObj.append("content", content);
    formDataObj.append("by", author);

    const response = await fetch("https://lspd-project.onrender.com/announcements", {
      method: "POST",
      mode: "cors",
      body: formDataObj,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    handleClose();
    setToastr("News created successfully");
  };

  useEffect(() => {
    dataEmpty();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-30 font-poppins">
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black opacity-50"
      ></div>
      <div className="relative w-[80%] h-[90%] bg-white p-4 rounded-lg flex flex-col gap-4 z-20 shadow-lg">
        <div className="w-full static min-h-[10%] flex justify-end items-center bg-pink-300  rounded-2xl">
          <h2 className=" text-black flex justify-center items-center w-full h-full text-2xl lg:text-4xl font-thin text font-pricedown">
            {" "}
            Create News
          </h2>
          <Button onClick={handleClose}>
            <CloseIcon className="text-black" />
          </Button>
        </div>

        <div className="w-full h-[90%] p-6">
          <form
            className="flex lg:flex-row flex-col w-full h-full  gap-6"
            onSubmit={handleSubmit}
          >
            <div className="lg:w-1/4  lg:h-full h-1/4 w-full">
              <div className="flex justify-center w-full h-full lg:h-[60%]">
                <label
                  htmlFor="file"
                  className="cursor-pointer bg-gray-200 lg:w-full md:w-[50%] sm:w-[70%]  p-8 rounded-2xl border-2 border-dashed border-gray-600 shadow-lg  items-center justify-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="flex h-[100%] flex-col items-center justify-center gap-2">
                    <img className="w-[60%] lg:h-[40%] h-[25%]" src={upload} alt="" />
                    {!formData.picture && (
                      <div className="flex h-[60%] justify-center flex-col items-center text-[1rem] lg:text-lg text-nowrap">
                        <p>Drag and Drop</p>
                        <p>or</p>
                      </div>
                    )}

                    {formData.picture && (
                      <div className="mt-4 text-center">
                        <p className="text-lg font-semibold">Selected file:</p>
                        <p>{formData.picture.name}</p>
                      </div>
                    )}

                    <span className="bg-gray-600 lg:w-[70%]  text-white px-4 p-2 rounded-lg transition duration-300 hover:bg-gray-800 flex justify-center items-center">
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
            </div>
            <div className="lg:w-3/4 lg:h-full w-full h-3/4 flex flex-col justify-center items-center gap-2">
              <div className="flex w-full flex-col gap-2 h-[25%]">
                <label className="text-lg font-semibold">News Header</label>
                <input
                  type="text"
                  name="header"
                  value={formData.header}
                  onChange={handleInputChange}
                  placeholder="Enter The Header of the News"
                  className="p-2 border h-[50%] border-gray-400 rounded-lg"
                  required
                />
              </div>
              <div className="flex w-full flex-col gap-2 h-[40%]">
                <label className="text-lg font-semibold">News Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  placeholder="Enter the content of News"
                  onChange={handleInputChange}
                  className="p-2  border border-gray-400 rounded-lg min-h-[75%] max-h-[75%] overflow-y-auto"
                  rows="4"
                  required
                />
              </div>
              <div className="flex flex-col w-full gap-2 h-[25%]">
                <label className="text-lg font-semibold">Author</label>
                <input
                  type="text"
                  name="author"
                  placeholder="Enter the Author's name"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="p-2 h-[50%] border border-gray-400 rounded-lg"
                  required
                />
              </div>
        
              <div className="w-[99%] h-[10%] overflow-visible flex justify-center items-start mt-5">
              <button
                  className="button lg:w-[15%] md:w-[30%] sm:w-[40%] w-[70%] h-[70%] text-xl flex justify-center items-center"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewsModal;

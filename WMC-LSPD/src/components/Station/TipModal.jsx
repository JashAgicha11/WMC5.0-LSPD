import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { motion } from "framer-motion";

const TipModal = ({ isOpen, onClose }) => {
  const [tip, setTip] = useState({
    tip: "",
    tipName: "",
    against: "",
    tipHeader:"",
  });

  const dataEmpty =() =>{
    setTip({
      tip: "",
      tipName:"",
      against: "",
      tipHeader:""
  })
}


const handleClose = () =>{
    dataEmpty()
    onClose()
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTip({ ...tip, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const { tip: description, tipName: name, tipHeader: header, against } = tip;

    try {
      const response = await fetch('https://lspd-project.onrender.com/tips', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description, name, against, header }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        throw new Error(errorData.detail || "Failed to submit tip");
      }

      const data = await response.json();
      console.log("Submitted tip:", data.description);
      dataEmpty();
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error submitting tip:", error.message || String(error));
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 font-poppins">
      <div onClick={handleClose} className="absolute inset-0 bg-black opacity-50"></div>
      <div className=" w-[80%] h-[90%] z-10 flex justify-around items-center flex-col rounded-2xl">
        <span className="w-full h-[100%] flex justify-center items-center flex-col">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 w-[100%] flex flex-col gap-3 h-full rounded-md shadow-md overflow-y-auto overflow-hidden"
          >
            <span className="flex justify-center pl-5 h-[10%] static items-center bg-pink-400 font-pricedown rounded-md ">
              <h2 className="text-2xl text-nowrap sm:text-4xl text-black font-bold w-full flex justify-center ">
                Submit a Crime Tip
              </h2>
              <Button onClick={handleClose}>
                <CloseIcon className="text-black" />
              </Button>
            </span>
            <form onSubmit={handleSubmit} className="h-4/5 flex flex-col gap-5">
              <div className="w-full h-[15%] flex justify-center items-center gap-3 text-black placeholder:text-black">
                <input
                  type="text"
                  className="w-1/2 h-full bg-gray-200 p-3 rounded-md sm:text-lg  text-sm text-wrap"
                  placeholder="Enter the Name    (Optional)"
                   name="tipName"
                  value={setTip.tipName}
                  onChange={handleInputChange}
                 
                />

                <input
                  type="text"
                  className="w-1/2 h-full bg-gray-200 p-3 rounded-md text-sm sm:text-lg"
                  placeholder="Against Whom"
                  name="against"
                  value={setTip.against}
                  onChange={handleInputChange}
                  
                  required
                />
              </div>
              <div className="w-full h-1/5 flex justify-center items-center">
                <input
                  type="text"
                  name="tipHeader"
                  value={tip.tipHeader}
                  onChange={handleInputChange}
                  className="w-full h-4/5 bg-gray-200 pl-3 rounded text-sm sm:text-lg"
                  placeholder="Enter the Header"
                  required
                />
              </div>
              <div className="w-full h-2/5">
                <textarea
                  className="w-full max-h-full h-full bg-gray-200  p-3 rounded-md mb-4 overflow-hidden overflow-y-auto text:lg sm:text-lg"
                  rows="4"
                  placeholder="Enter your crime tip..."
                  name="tip"
                  value={setTip.tip}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className=" bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </span>
      </div>
    </div>
  );
};

export default TipModal;
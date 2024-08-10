import React from "react";

const AdminViewBox = ({ name, contact, img, email }) => {
  const imageUrl = `https://lspd-project.onrender.com/images/${img}` ;

  return (
    <div className="static bg-white bg-cover sm:w-[48%] w-[96%] sm:h-[20%] border-black border-2 rounded-xl  flex justify-between items-center">
      <div className="w-1/4 h-full flex justify-center items-center ml-2">
        <img
          className="object-cover w-[100%] h-[90%] rounded-md "
          src={imageUrl}
          alt={name}
        />
      </div>
      <div className="w-[70%] h-[90%] bg-white flex-col z-50 justify-center items-center text-black flex rounded-md pl-6 mr-2 pr-1 pt-1">
        <div className="w-full h-1/2 flex lg:flex-row flex-col  justify-start items-start sm:text-[0.9rem] text-[0.85rem] md:text-[01rem] lg:text-lg  z-10 text-nowrap">
          <span className="w-1/2 h-full  flex font-semibold justify-start items-center">
            {name}
          </span>
          <span className="w-1/2 h-full flex justify-start items-center">
            {contact}
          </span>
        </div>
        <div className="w-full h-1/2 text-ellipsis lg:justify-start flex lg:items-center gap-2 sm:text-[0.9rem] text-[0.85rem] md:text-[1rem] lg:text-lg flex-wrap">
          <strong>Email :- </strong>   {email}
        </div>
      </div>
    </div>
  );
};

export default AdminViewBox;
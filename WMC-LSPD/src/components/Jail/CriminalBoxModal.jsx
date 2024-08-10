import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import useStore from "../../Store/store";
import { Star } from "../../assets";

const CriminalBoxModal = ({
  isOpen,
  onClose,
  Name,
  Crime,
  Img,
  Duration,
  Age,
  DOB,
  Rank,
  Height,
  City,
  Committed,
  Sex,
}) => {
  if (!isOpen) return null;
  const imageUrl = `https://lspd-project.onrender.com/images/${Img}` ;
  
  return (
    <div className="fixed inset-0 justify-center items-center flex z-50 font-technor">
      <div onClick={onClose} className="absolute inset-0"></div>
      <div className=" w-[80%] h-[90%] bg-white z-30 p-4 rounded-lg flex flex-col gap-4">
        <div className=" w-full h-[7%] md:h-[15%] lg:h-[10%] flex justify-end static bg-light-gray rounded-2xl">
          <h2 className="text-white flex justify-center items-center w-full h-full text-2xl text-nowrap lg:text-4xl font-pricedown ">
            Criminal Record
          </h2>

          <Button onClick={onClose}>
            <CloseIcon className="text-white" />
          </Button>
        </div>
        <div className="w-full h-[80%] flex lg:flex-row flex-col overflow-y-auto">
          <div className="lg:w-1/4 w-full h-fit flex p-2 justify-center items-center lg:mt-5 flex-col gap-2 lg:overflow-hidden">
            <img className="w-[90%] h-[90%] rounded-2xl" src={imageUrl} alt="" />
            {/* {stars.map((_,index) =>{
              return(
                <img key={index} className="w-[30px] h-[30px]" src={Star} alt={`Star ${index + 1}`} />
              )
            })} */}
            <span className="flex gap-1">
              {Array.from({ length: Rank }).map((_, index) => (
                <img
                  key={index}
                  className="w-[30px] h-[30px]"
                  src={Star}
                  alt={`Star ${index + 1}`}
                />
              ))}
            </span>
          </div>
          <div className="lg:w-3/4 w-full h-full ">
            <div className="w-full lg:h-1/2 h-[70%] flex lg:flex-row flex-col">
              <div className="lg:w-1/2 w-full h-full text-nowrap">
                {/* <div className="w-full h-full flex flex-col justify-center items-center"> */}
                <h2 className="w-full gap-2 lg:gap-1 h-1/4  justify-start pl-3 items-center flex">
                  {" "}
                  <strong>Name :</strong> {Name}
                </h2>
                <h2 className="w-full  gap-2 lg:gap-1 h-1/4  justify-start pl-3 items-center flex">
                  <strong>Age : </strong>
                  {Age}
                </h2>
                <h2 className="w-full  gap-2 lg:gap-1 h-1/4  justify-start pl-3 items-center flex">
                  <strong>Dob</strong> : {DOB}
                </h2>
                <h2 className="w-full  gap-2 lg:gap-1 h-1/4  justify-start pl-3 items-center flex">
                  <strong>Sex : </strong> {Sex}
                </h2>
              </div>
              <div className="lg:w-1/2 w-full h-full text-nowrap">
                <h2 className="w-full  gap-2 lg:gap-1 h-1/4  justify-start pl-3 items-center flex">
                  <strong>City : </strong> {City}{" "}
                </h2>
                <h2 className="w-full gap-2 lg:gap-1 h-1/4  justify-start pl-3 items-center flex">
                  <strong>Committed in : </strong> {Committed}
                </h2>
                <h2 className="w-full  gap-2 lg:gap-1 h-1/4  justify-start pl-3 items-center flex">
                  <strong>Duration : </strong> {Duration} Years
                </h2>
                <h2 className="w-full gap-2 lg:gap-1 h-1/4  justify-start pl-3 items-center flex">
                  <strong>Height : </strong> {Height} inch{" "}
                </h2>
                {/* </div> */}
              </div>
            </div>
            <div className="w-full h-1/2 p-3">
              <strong>Crime </strong> : {Crime}
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default CriminalBoxModal;

import React, { useEffect, useState } from "react";
import { BG1, BG2, BG3, BG4, BG5 } from "../../assets";
import CriminalBoxModal from "./CriminalBoxModal";
import useStore from "../../Store/store";
import { Criminal } from "../../context/trialIndex";

const WantedBox = ({
  criminalAge,
  criminalDuration,
  img,
  criminalName,
  crime,
  City,
  Committed,
  Sex,
  DOB,
  Rank,
  Height,
}) => {
  const backgrounds = [BG1, BG2, BG3, BG4, BG5];
  const {
    selectedCriminal,
    setCriminalBoxOpen,
    isCriminalBoxOpen,
    isWantedBoxOpen,
    setCriminalOpen,
  } = useStore();

  const getRandomBg = () => {
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
  };

  const handleClick = () => {
    setCriminalBoxOpen(true);
    setCriminalOpen(criminalName);
  };

  const [isBg] = useState(getRandomBg());  
  const imageUrl = `https://lspd-project.onrender.com/images/${img}` ;
  return (
    <>
      {!isCriminalBoxOpen ? (
        <div
          // Key={key}
          onClick={handleClick}
          style={{ backgroundImage: `url(${isBg})` }}
          className="static bg-cover lg:w-[48%] sm:w-[80%] md:w-[48%] w-[96%] h-[13%]  md:h-[13%] lg:h-[20%] bg-black rounded-xl text-white flex justify-between items-center"
        >
          <div className="w-1/4 h-full flex justify-center items-center ml-2">
            <img
              className="object-cover w-[100%] h-[90%] rounded-md "
              src={imageUrl}
              alt={criminalName}
            />
          </div>
          <div className="lg:w-[70%] w-[65%] h-[90%] bg-white z-50 text-black flex rounded-md mr-2 pr-1 pt-1">
            <div className="w-1/2 h-full flex flex-col justify-center items-center text-[0.75rem] sm:text-[0.8rem] md:text-[0.7rem] lg:text-[1.1rem] pl-3 lg:pl-6 z-10">
              <span className="w-full h-1/3 flex font-semibold justify-start items-center overflow-hidden whitespace-nowrap">
                {criminalName}
              </span>
              <span className="w-full h-1/3 flex justify-start items-center">
                Age: {criminalAge}
              </span>
              <span className="w-full h-1/3 flex justify-start items-center">
                For {criminalDuration} Years
              </span>
            </div>
            <div className="w-2/4 h-full text-ellipsis overflow-hidden text-[0.7rem] sm:text-[0.6rem] md:text-[0.7rem]  lg:text-[1rem] lg:mb-1">
              {crime}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* {Criminal.map((criminal) => {
            return ( */}

          {selectedCriminal === criminalName && (
            <CriminalBoxModal
              isOpen={isCriminalBoxOpen && isWantedBoxOpen}
              onClose={() => setCriminalBoxOpen(false)}
              // Key={key}
              Name={criminalName}
              Age={criminalAge}
              Duration={criminalDuration}
              Img={img}
              Crime={crime}
              Height={Height}
              DOB={DOB}
              Sex={Sex}
              City={City}
              Committed={Committed}
              Rank={Rank}
            />
          )}
          {/* );
          })} */}
        </div>
      )}
    </>
  );
};

export default WantedBox;
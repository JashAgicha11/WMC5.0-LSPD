import React, { useEffect, useState, useMemo } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { Dark, LSPD, LSPD1, Person, Star } from "../../assets";
import WantedBox from "./WantedBox";

const WantedListModal = ({ isOpen, onClose }) => {
  const [wantedList, setWantedList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://lspd-project.onrender.com/most_wanted_list', {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setWantedList(data);
        } else {
          console.error('Failed to fetch wanted list');
        }
      } catch (error) {
        console.error('Error fetching wanted list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const starCounts = useMemo(() => {
    const counts = { Star1: 0, Star2: 0, Star3: 0, Star4: 0, Star5: 0 };

    wantedList.forEach(({ rank }) => {
      if (counts[`Star${rank}`] !== undefined) {
        counts[`Star${rank}`]++;
      }
    });

    return counts;
  }, [wantedList]);


  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 justify-center items-center flex z-50 font-technor h-screen w-screen">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black opacity-50 "
      ></div>
      <div className="bg-white w-4/5 h-[90%] rounded-md z-20 p-4  ">
        <div className=" w-full h-[7%] lg:h-[10%] font-pricedown flex justify-end static bg-[#b392ac] rounded-2xl">
          <h2 className="text-black flex justify-center items-center w-full h-full text-2xl lg:text-4xl ">
            Most Wanted List
          </h2>

          <Button onClick={onClose}>
            <CloseIcon className="text-black" />
          </Button>
        </div>
        <div className="h-[90%] rounded-b-2xl w-full  px-5 py-2 gap-3 flex flex-col overflow-y-auto ">
          <div
            style={{ backgroundImage: `url(${Dark})` }}
            className="w-full lg:h-[15%] h-[10%] bg-cover bg-center overflow-hidden border-2 border-black rounded-md  object-cover "
          >
            <div className="flex w-full h-full justify-around items-center">
              <div className="lg:w-[20%] w-[10%] h-full flex justify-center items-center ">
                <img
                  src={LSPD}
                  alt=""
                  className="w-[100%] h-[200%] object-contain "
                />
              </div>
              <span className="lg:w-[60%] w-[80%] h-full bg-transparent flex flex-col">
                <div className="w-full h-full flex text-white">
                  <div className="w-[25%] text-[0.7rem] left-2 lg:left-0 relative text-nowrap lg:text-lg h-full flex flex-col justify-center items-center lg:gap-1 sm:gap-3 gap-2 md:gap-2 ">
                    <h2 className="lg:gap-2 gap-1 flex justify-center items-center">
                      <span className="flex gap-1 justify-center items-center">
                        2 <img className="lg:size-full w-[70%] flex justify-center items-center" src={Star} alt="Star" />
                      </span>{" "}
                      :-
                      <span className="Rank flex gap-1 justify-center items-center">
                        {starCounts.Star2} <img className="lg:size-full flex justify-center items-center w-[60%] " src={Person} alt="Person" />
                      </span>
                    </h2>
                    <h2 className="lg:gap-2 gap-1  flex justify-center items-center">
                      <span className="flex gap-1  justify-center items-center">
                        3 <img className="lg:size-full w-[70%] flex justify-center items-center" src={Star} alt="Star" />
                      </span>{" "}
                      :-
                      <span className="Rank flex gap-1 justify-center items-center">
                        {starCounts.Star3} <img className="lg:size-full w-[60%] flex justify-center items-center" src={Person} alt="Person" />
                      </span>
                    </h2>
                  </div>
                  <div className="w-2/4 gap-1 h-full  font-technor font-bold tracking-wider text-[0.8rem] sm:text-[0.8rem] md:text-[1rem] text-nowrap lg:text-xl  text-white flex justify-center items-center">
                    Total Criminals :- {wantedList.length}
                    <img className="lg:w-[25px] w-[15 px] sm:[15px] md:w-[20px] lg:h-[25px]" src={Person} alt="" />
                  </div>
                  <div className="w-1/4 relative right-2 lg:right-0 text-[0.7rem] lg:text-lg h-full flex flex-col justify-center items-center gap-2 lg:gap-1 md:gap-2 sm:gap-3">
                    <h2 className="lg:gap-2 gap-1 flex justify-center items-center">
                      <span className="flex gap-1  justify-center items-center">
                        4 <img className="lg:size-full w-[70%] flex justify-center items-center" src={Star} alt="Star" />
                      </span>{" "}
                      :-
                      <span className="Rank flex gap-1  justify-center items-center">
                        {starCounts.Star4} <img className="flex justify-center items-center lg:size-full w-[70%] " src={Person} alt="Person" />
                      </span>
                    </h2>
                    <h2 className="lg:gap-2  gap-1 flex justify-center items-center">
                      <span className="flex gap-1  justify-center items-center">
                        5 <img className="lg:size-full flex justify-center items-center w-[70%] " src={Star} alt="Star" />
                      </span>{" "}
                      :-
                      <span className="Rank flex gap-1  justify-center items-center">
                        {starCounts.Star5} <img src={Person} className="lg:size-full flex justify-center items-center w-[70%] " alt="Person" />
                      </span>
                    </h2>
                  </div>
                </div>
              </span>
              <div className="lg:w-[20%] w-[10%] h-full flex justify-center items-center ">
                <img
                  src={LSPD1}
                  alt=""
                  className="w-[100%] h-[200%] object-contain "
                />
              </div>
            </div>
          </div>
          <div className="h-[100%] text-wrap flex-wrap z-30 w-full flex sm:gap-4 md:gap-4 gap-4 p-1 justify-around items-start overflow-y-auto">
            {wantedList.map((criminal) => {
              return (
                <WantedBox
                key={criminal.name}
                {...criminal} 
                criminalAge={criminal.age}
                criminalDuration={criminal.duration}
                criminalName={criminal.name}
                crime={criminal.description}
                img={criminal.img}
                City={criminal.city}
                Sex={criminal.sex}
                DOB={criminal.dob}
                Committed={criminal.commited}
                Height={criminal.height}
                Rank = {criminal.rank}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WantedListModal;

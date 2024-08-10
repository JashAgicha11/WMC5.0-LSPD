import React from "react";
import useStore from "../../Store/store";
import CareerDetailModal from "./CareerDetailModal";

const CareerBox = ({jobName, salary,requirement ,description, deadline, vacancy, status  }) => {
  const {
    setCareerBoxOpen,
    isCareerBoxOpen, 
    setCareerOpen,
    selectedJob,
    isCareerModalOpen
  } = useStore();


  const handleClick = () =>{
    setCareerBoxOpen(true);
    setCareerOpen(jobName)
  }
  return (
    <>
      {!isCareerBoxOpen ? (
        <div
          // Key={key}
          onClick={handleClick}
          className="static cursor-pointer bg-cover lg:w-[30%] max-w-[220px] sm:max-w-[200px] md:max-w-[200px]  lg:max-w-[300px] w-[80%] h-[60px] lg:h-[80px] bg-[#52b69a] bg-opacity-30 border-black border-[3px] lg:border-4 rounded-md lg:rounded-xl text-white flex justify-center items-center"
        >
          <div className="w-[97%] lg:w-[97%] md:w-[97%]  h-[90%] bg-white z-50 text-black flex rounded-md">
            <div className="w-1/2 h-full flex flex-col justify-center items-center text-xs md:text-[0.8rem] lg:text-[0.9rem] pl-3 z-10">
              <span className="w-full h-1/3 flex font-semibold justify-start items-center overflow-hidden whitespace-nowrap">
                {jobName}
              </span>
              <span className="w-full h-1/3 flex justify-start items-center lg:text-nowrap text-nowrap lg:overflow-visible overflow-hidden gap-1">
                Vacancy: {vacancy} 
              </span>
              <span className="w-full h-1/3 flex justify-start items-center text-nowrap overflow-hidden">
                <h3 className="hidden lg:flex md:hidden">Deadline : </h3>{deadline}
              </span>
            </div>
            <div className="w-2/4 h-[90%] lg:overflow-hidden overflow-hidden text-xs md:text-md lg:text-[1rem]  pl-4 mr-1 lg:mt-1 lg:pb-4 justify-center items-center text-ellipsis  whitespace-pre-wrap">
              {description}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* {Criminal.map((criminal) => {
          return ( */}

          {selectedJob === jobName && (
            <CareerDetailModal
              isOpen={isCareerBoxOpen && isCareerModalOpen}
              onClose={() => setCareerBoxOpen(false)}
              Name={jobName}
              Salary={salary}
              Deadline = {deadline}
              Requirement = {requirement}
              Description = {description}
              Vacancy={vacancy}
              Status = {status}
            />
          )}
          {/* );
        })} */}
        </div>
      )}
    </>
  );
};

export default CareerBox;
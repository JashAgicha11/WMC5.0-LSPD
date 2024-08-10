import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import React from "react";
import useStore from "../../Store/store";

const CareerDetailModal = ({
  Name,
  onClose,
  isOpen,
  Vacancy,
  Deadline,
  Salary,
  Requirement,
  Description,
  Status,
}) => {

  const {setToastr} = useStore()

  const handleSubmit = () =>{
    console.log("Applied");
    setToastr("Applied for Job")
    onClose()
  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 justify-center items-center flex z-50 font-technor h-screen w-screen">
      <div onClick = { onClose} className="absolute inset-0"></div>
      <div className=" w-[80%] h-[90%] bg-white p-4 rounded-2xl flex flex-col gap-4 z-10">
        <div className=" w-full h-[6.5%] lg:h-[10%] flex justify-end static bg-[#52b69a] rounded-2xl">
          <h2 className="text-black flex justify-center items-center w-full h-full text-3xl lg:text-4xl font-pricedown ">
            Job Details
          </h2>

          <Button onClick={onClose}>
            <CloseIcon className="text-black"sx={{ fontSize: 22 }} />
          </Button>
        </div>
        <div className="w-full h-[90%] lg:h-[80%] flex">
          <div className="w-full h-full justify-center items-center flex flex-col gap-3 text-lg overflow-hidden overflow-y-auto ">
            {/* <div className="w-full h-fll flex flex-col gap-2"> */}
            <div className="w-full h-1/2 flex-col lg:flex-row flex overflow-hidden">
              <div className="lg:w-1/2 w-full h-full flex flex-col justify-center items-center">
                {/* <div className="w-full h-full flex flex-col justify-center items-center"> */}
                <h2 className="w-full gap-1 h-1/3  pl-3 lg:justify-center items-center flex">
                  {" "}
                  <strong>Job Title :</strong> {Name}
                </h2>
                <h2 className="w-full gap-1 h-1/3 pl-3 lg:justify-center items-center flex">
                  <strong>Vaccancy : </strong>
                  {Vacancy} Candidates
                </h2>
                <h2 className="w-full gap-1 h-1/3 pl-3 lg:justify-center items-center flex">
                  <strong>Deadline</strong> : {Deadline}
                </h2>

                {/* </div> */}
              </div>
              <div className="lg:w-1/2 w-full h-full flex flex-col justify-center items-center ">
                <h2 className="w-full gap-1 h-1/3   pl-3 lg:justify-center items-center flex">
                  <strong>Requirement : </strong> {Requirement}{" "}
                </h2>
                <h2 className="w-full gap-1 h-1/3  pl-3 items-center lg:justify-center flex">
                  <strong>Status : </strong> {Status}
                </h2>
                <h2 className="w-full gap-1 h-1/3  pl-3 items-center lg:justify-center flex">
                  <strong>Salary : </strong> {Salary} $
                </h2>
              </div>
            </div>
            <div className="lg:w-[80%] w-full h-[30%] p-3 items-center flex gap-1 lg:overflow-y-hidden overflow-y-auto flex-col">
              <strong className="text-nowrap w-full lg:flex justify-center items-center">Description : </strong>
              <p>{Description}</p>  
              
            </div>

            <div className="w-full h-[20%] flex justify-center items-center">
              
              <button
                onClick={handleSubmit}
                className="lg:w-[15%] w-[40%] h-[50%] flex justify-center items-center border-2 font-bold text-xl border-blue-500 bg-white text-blue-500 hover:text-white hover:bg-blue-500 transition-all duration-150 ease-linear rounded-md"
              >
                Apply Now 
              </button>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default CareerDetailModal;
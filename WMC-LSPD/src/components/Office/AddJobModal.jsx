import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import "./btn.css";
import useStore from "../../Store/store";

const AddJobModal = ({ isOpen, onClose }) => {
  const { setToastr } = useStore();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    vacancy: "",
    salary: "",
    department: "",
    status: "",
    deadline: "",
    requirement: "",
  });

  const dataEmpty = () => {
    setJobData({
      title: "",
      description: "",
      vacancy: "",
      salary: "",
      department: "",
      status: "",
      deadline: "",
      requirement: "",
    });
  };

  const handleClose = () => {
    dataEmpty();
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(jobData);
    const { title, description, vacancy, salary, department, status, deadline, requirement } = jobData;
    const datestr = new Date(deadline).toISOString();
    const response = await fetch('https://lspd-project.onrender.com/Jobs', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title:title, description:description, vacancy: vacancy, salary: salary, department: department, status: status,deadline: datestr,requirements: requirement }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    if (!/^[a-zA-Z\s]{1,30}$/.test(title)) {
      return setToastr("Invalid Name or Exceeding characters");
    }
    if (!/^[0-9\s]{1,2}$/.test(vacancy)) {
      return setToastr("Vacancy Should be in Numbers");
    }
    if (!/^[a-zA-Z\s]{1,10}$/.test(status)) {
      return setToastr("Invalid Status");
    }
    if (!/^[a-zA-Z0-9\s]{1,1000}$/.test(description)) {
      return setToastr("Exceeding 500 Words or Unknown characters");
    }
    if (!/^[0-9\s]{1,6}$/.test(salary)) {
      return setToastr("Invalid Salary");
    }
    if (!/^[a-zA-Z0-9\s]{1,1000}$/.test(requirement)) {
      return setToastr("Exceeding 200 Words or Unknown characters");
    }
    if (!/^[a-zA-Z\s]{1,30}$/.test(department)) {
      return setToastr("Invalid Department");
    } else {
      handleClose();
      setToastr("Job Added Successfully");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 justify-center items-center flex z-30 font-technor">
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-black opacity-50"
      ></div>
      <div className="w-[80%] h-[90%] bg-white p-4 rounded-lg flex flex-col gap-4 z-20">
        <div className="w-full h-[10%] flex justify-end static bg-[#a98467] rounded-2xl">
          <h2 className="text-black flex justify-center items-center w-full h-full text-4xl font-pricedown">
            Add Job
          </h2>
          <Button className="w-[5%]" onClick={handleClose}>
            <CloseIcon className="text-black" />
          </Button>
        </div>
        <div className="w-full h-[90%] flex flex-col justify-center items-center text-2xl">
          <form onSubmit={handleSubmit} className="w-full h-full">
            <div className="h-4/5 w-full flex flex-col">
              <div className="w-full h-1/3 flex">
                <div className="w-[40%] h-full flex items-center flex-col">
                  <label className="text-md text-nowrap w-[100%] h-2/5 font-semibold flex justify-center items-center">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={jobData.title}
                    onChange={handleInputChange}
                    placeholder="Enter the title"
                    className="p-2 border border-gray-400 w-[80%] text-lg h-2/5 rounded-lg"
                    required
                  />
                </div>
                <div className="w-[20%] h-full flex items-center flex-col">
                  <label className="text-md text-nowrap w-[100%] h-2/5 font-semibold flex justify-center items-center">
                    Vacancy
                  </label>
                  <input
                    type="int"
                    name="vacancy"
                    value={jobData.vacancy}
                    onChange={handleInputChange}
                    placeholder="Enter the vacancy"
                    className="p-2 border placeholder:text-base border-gray-400 text-lg w-[80%] h-2/5 rounded-lg"
                    required
                  />
                </div>
                <div className="w-[40%] h-full flex items-center flex-col">
                  <label className="text-md text-nowrap w-[100%] h-2/5 font-semibold flex justify-center items-center">
                    Requirements
                  </label>
                  <textarea
                    type="text"
                    name="requirement"
                    value={jobData.requirement}
                    onChange={handleInputChange}
                    placeholder="Enter the Requirement"
                    className="p-2 border border-gray-400 text-lg w-[80%] min-h-[40%] max-h-[40%] rounded-lg overflow-hidden overflow-y-auto"
                    required
                  />
                </div>
              </div>
              <div className="w-full h-1/3 flex">
                <div className="w-1/3 h-full flex flex-col items-center">
                  <label className="text-md text-nowrap w-[100%] h-2/5 font-semibold flex justify-center items-center">
                    Status
                  </label>
                  <input
                    type="text"
                    name="status"
                    value={jobData.status}
                    onChange={handleInputChange}
                    placeholder="Enter the Status"
                    className="p-2 border border-gray-400 text-lg w-[80%] h-2/5 rounded-lg"
                  />
                </div>
                <div className="w-1/3 h-full flex items-center flex-col">
                  <label className="text-md text-nowrap w-[100%] h-2/5 font-semibold flex justify-center items-center">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={jobData.department}
                    onChange={handleInputChange}
                    placeholder="Enter the Department"
                    className="p-2 border border-gray-400 text-lg w-[80%] h-2/5 rounded-lg"
                    required
                  />
                </div>
                <div className="w-1/3 h-full flex items-center flex-col">
                  <label className="text-md text-nowrap w-[100%] h-2/5 font-semibold flex justify-center items-center">
                    Expected Salary
                  </label>
                  <input
                    type="int"
                    name="salary"
                    value={jobData.salary}
                    onChange={handleInputChange}
                    placeholder="Enter the Salary"
                    className="p-2 border border-gray-400 text-lg w-[80%] h-2/5 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div className="w-full h-1/3 flex">
                <div className="w-4/5 h-full flex justify-center items-center">
                  <label className="text-2xl w-[20%] font-semibold flex justify-center items-center">
                    Description :-{" "}
                  </label>
                  <textarea
                    name="description"
                    value={jobData.description}
                    placeholder="Enter the description of the Job"
                    onChange={handleInputChange}
                    className="p-2 mr-2 border border-gray-400 text-xl w-[80%] rounded-lg min-h-[85%] max-h-[85%] overflow-y-auto"
                    rows="4"
                    required
                  />
                </div>
                <div className="w-1/5 h-full flex flex-col items-center text-sm">
                  <label className="text-2xl text-nowrap w-[100%] h-2/5 font-semibold flex justify-center items-center">
                    Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={jobData.deadline}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-400 text-lg w-[80%] h-2/5 rounded-lg"
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-1/5 flex justify-center items-center">
              <button
                className="button font-poppins w-[15%] h-[40%] text-xl flex justify-center items-center"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddJobModal;

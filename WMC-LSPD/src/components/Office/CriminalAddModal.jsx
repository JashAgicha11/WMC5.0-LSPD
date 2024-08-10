import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { upload } from "../../assets";
import { useEffect, useState } from "react";
import useStore from "../../Store/store";

const CriminalAddModal = ({ isOpen, onClose }) => {
  const { setToastr } = useStore();
  const [formData, setFormData] = useState({
    name: "",
    img: null,
    dob: "",
    city: "",
    committed: "",
    crime: "",
    age: "",
    rank: "",
    sex: "",
    duration: "",
    height: "",
  });

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      setFormData({ ...formData, img: files[0] });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!/^[a-zA-Z0-9\s]{1,20}$/.test(formData.name)) {
      return setToastr("Invalid Name or Exceeding characters");
    }
    if (!/^[0-9\s]{1,3}$/.test(formData.age)) {
      return setToastr("Age Should be in Numbers");
    }
    if (!/^[a-zA-Z\s]{1,10}$/.test(formData.sex)) {
      return setToastr("Invalid String");
    }
    if (!/^[a-zA-Z\s]{1,30}$/.test(formData.city)) {
      return setToastr("Invalid String or Exceeding characters");
    }
    if (!/^[a-zA-Z\s]{1,30}$/.test(formData.committed)) {
      return setToastr("Invalid String or Exceeding characters");
    }
    if (!/^[a-zA-Z0-9\s]{1,3}$/.test(formData.duration)) {
      return setToastr("Invaild Duration");
    }
    if (!/^\d+(\.\d+)?$/.test(formData.height)) {
      return setToastr("Invalid Height");
    }
    if (!/^[0-5\s]{1,50}$/.test(formData.rank)) {
      return setToastr("Invalid Rank ");
    } else {
      onClose();
      setToastr("Criminal Added Succesfully");
    }
    console.log(formData);
    const{ name,img, dob, city, committed, crime, age,rank,
      sex,duration,height} = formData;
      const datestr = new Date(dob).toISOString();
      const formDataObj = new FormData();
    formDataObj.append("file", img);
    formDataObj.append("name", name);
    formDataObj.append("dob", datestr);
    formDataObj.append("city",city);
    formDataObj.append("commited",committed);
    formDataObj.append("description",crime);
    formDataObj.append("age",age);
    formDataObj.append("rank",rank);
    formDataObj.append("sex",sex);
    formDataObj.append("duration",duration);
    formDataObj.append("height",height);

      const response = await fetch('https://lspd-project.onrender.com/most_wanted_person', {
      method: 'POST',
      mode: 'cors',
      body: formDataObj,  
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
  };

  const dataEmpty = () => {
    setFormData({
      name: "",
      img: null,
      dob: "",
      city: "",
      committed: "",
      crime: "",
      age: "",
      rank: "",
      sex: "",
      duration: "",
      height: "",
    });
  };

  const handleClose = () => {
    onClose();
    dataEmpty();
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
        <div className="w-full static min-h-[10%] flex justify-end items-center bg-amber-600  rounded-2xl">
          <h2 className=" text-black flex justify-center items-center w-full h-full text-4xl font-thin text font-pricedown">
            Add Criminal
          </h2>
          <Button onClick={handleClose}>
            <CloseIcon className="text-black" />
          </Button>
        </div>

        <div className="w-full h-[90%] pl-6">
          <form
            className="flex lg:flex-row flex-col w-full h-full overflow-auto  gap-6"
            onSubmit={handleSubmit}
          >
            <div className="lg:w-1/4 lg:h-full h-1/4 w-full flex flex-col justify-center items-center gap-2 lg:gap-0">
              <div className="flex justify-center lg:w-full w-[40%] h-[70%] lg:h-[60%]">
                <label
                  htmlFor="file"
                  className="cursor-pointer bg-gray-200 lg:w-full md:w-[70%] sm:w-[70%]  p-8 rounded-2xl border-2 border-dashed border-gray-600 shadow-lg  items-center justify-center"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="flex h-[100%] flex-col items-center justify-center gap-2">
                    <img
                      className="w-[60%] lg:h-[40%] h-[40%]"
                      src={upload}
                      alt=""
                    />
                    {!formData.img && (
                      <div className="flex h-[60%] justify-center flex-col items-center text-[0.7rem] lg:text-[1rem] lg:text-lg text-nowrap">
                        <p>Drag and Drop</p>
                        <p>or</p>
                      </div>
                    )}

                    {formData.img && (
                      <div className="mt-4 text-center">
                        <p className="text-lg font-semibold">Selected file:</p>
                        <p>{formData.img.name}</p>
                      </div>
                    )}

                    <span className="bg-gray-600 lg:w-[70%] lg:text-[1rem] text-[0.8rem] text-nowrap  text-white px-4 p-2 rounded-lg transition duration-300 hover:bg-gray-800 flex justify-center items-center">
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

              <div className="lg:w-full w-[50%] h-[20%] flex justify-center gap-2 items-center">
                <label className="text-md text-nowrap w-[20%] font-semibold">
                  Rank :-
                </label>

                <input
                  type="number"
                  name="rank"
                  value={formData.rank}
                  onChange={handleInputChange}
                  placeholder="Enter the Rank"
                  className="p-2 border border-gray-400 w-[80%] rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="lg:w-3/4 lg:h-full w-full h-3/4 flex flex-col gap-2">
              <div className="w-full flex lg:flex-row gap-5 flex-col h-3/5 lg:gap-2">
                <div className="lg:w-1/2 w-[80%] flex flex-col h-full gap-3 lg:gap-0 ">
                  <div className="flex w-full justify-center items-center gap-2 h-1/4 ">
                    <label className="text-sm text-nowrap w-[15%] font-semibold">
                      Name :-
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter the Name"
                      className="p-2 border w-4/5  border-gray-400 rounded-lg"
                      required
                    />
                  </div>
                  <div className="flex w-full justify-center items-center gap-2 h-1/4 ">
                    <label className="text-sm text-nowrap w-[15%] font-semibold">
                      Age :-
                    </label>

                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Enter the Age"
                      className="p-2 border w-4/5  border-gray-400 rounded-lg"
                      required
                    />
                  </div>
                  <div className="flex w-full justify-center items-center gap-2 h-1/4 ">
                    <label className="text-sm text-nowrap w-[15%]  font-semibold">
                      Dob :-
                    </label>

                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      placeholder="Enter the DOB"
                      className="p-2 border w-4/5  border-gray-400 rounded-lg"
                      required
                    />
                  </div>
                  <div className="flex w-full justify-center items-center gap-2 h-1/4 ">
                    <label className="text-sm text-nowrap w-[15%] font-semibold">
                      Sex :-
                    </label>

                    <input
                      type="text"
                      name="sex"
                      value={formData.sex}
                      onChange={handleInputChange}
                      placeholder="Enter the Sex"
                      className="p-2 border w-4/5  border-gray-400 rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div className="lg:w-1/2 w-[80%] flex flex-col h-full gap-3 lg:gap-0">
                  <div className="flex w-full justify-center items-center gap-2 h-1/4 ">
                    <label className="text-sm text-nowrap w-[15%]  font-semibold">
                      City :-
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter the City"
                      className="p-2 border w-4/5  border-gray-400 rounded-lg"
                      required
                    />
                  </div>
                  <div className="flex w-full justify-center items-center h-1/4 ">
                    <label className="text-sm text-nowrap w-[27%] font-semibold">
                      Committed :-
                    </label>

                    <input
                      type="text"
                      name="committed"
                      value={formData.committed}
                      onChange={handleInputChange}
                      placeholder="Enter the crime Comitted City"
                      className="p-2 border w-[73%]  border-gray-400 rounded-lg"
                      required
                    />
                  </div>
                  <div className="flex w-full justify-center items-center gap-2 h-1/4 ">
                    <label className="text-sm text-nowrap w-[15%]  font-semibold">
                      Duration :-
                    </label>

                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="Enter the Duration"
                      className="p-2 border w-4/5  border-gray-400 rounded-lg"
                      required
                    />
                  </div>
                  <div className="flex w-full justify-center items-center gap-2 h-1/4 ">
                    <label className="text-sm text-nowrap w-[15%] font-semibold">
                      Height :-
                    </label>

                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="Enter the Height"
                      className="p-2 border w-4/5  border-gray-400 rounded-lg"
                      required
                    />
                  </div>
                </div>

                <div className=" lg:hidden flex gap-2 justify-center items-center h-[27%]">
                  <label className="text-lg font-semibold text-nowrap">
                    Crime :-{" "}
                  </label>
                  <textarea
                    name="crime"
                    value={formData.crime}
                    placeholder="Enter the Crime Committed"
                    onChange={handleInputChange}
                    className="p-2  border border-gray-400 w-full rounded-lg min-h-[90%] max-h-[90%] overflow-y-auto"
                    rows="4"
                    required
                  />
                </div>

                <div className=" lg:hidden w-[99%] h-[10%] overflow-visible flex justify-center items-start">
                  <button
                    className="button font-poppins w-[15%] h-[70%] text-xl flex justify-center items-center"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>

              <div className=" hidden lg:flex gap-2 justify-center items-center h-[27%]">
                  <label className="text-lg font-semibold text-nowrap">
                    Crime :-{" "}
                  </label>
                  <textarea
                    name="crime"
                    value={formData.crime}
                    placeholder="Enter the Crime Committed"
                    onChange={handleInputChange}
                    className="p-2  border border-gray-400 w-full rounded-lg min-h-[90%] max-h-[90%] overflow-y-auto"
                    rows="4"
                    required
                  />
                </div>

                <div className=" hidden  w-[99%] h-[10%] overflow-visible lg:flex justify-center items-start">
                  <button
                    className="button font-poppins w-[15%] h-[70%] text-xl flex justify-center items-center"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              {/* <Button
                type="submit"
                className="self-end mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Submit
              </Button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CriminalAddModal;
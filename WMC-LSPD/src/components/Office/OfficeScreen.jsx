import React, { useEffect, useState } from "react";
import { Admin } from "../../assets";
import { useNavigate } from "react-router-dom";
import DotBtn from "../../buttons/DotBtn";
import { animateScroll as scroll } from "react-scroll";
import ArrowBtn from "../../buttons/arrowBtn";

// Modals
import CriminalAddModal from "./CriminalAddModal";
import AddJobModal from "./AddJobModal";
import AdminAddModal from "./AdminAddModal";
import CreateNewsModal from "./CreateNewsModal";
import ViewTipModal from "./ViewTipModal";

//

const OfficeScreen = () => {
  const navigate = useNavigate();
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);
  const [isCreateNewsOpen, setIsCreateNewsOpen] = useState(false);
  const [isAdminAddOpen, setIsAdminAddOpen] = useState(false);
  const [isViewTipOpen, setIsViewTipOpen] = useState(false);
  const [isAddCriminalOpen, setIsAddCriminalOpen] = useState(false);

  const handleArrowClick = () => {
    scroll.scrollToBottom({
      duration: 1000,
      smooth: true,
    });
  };
  const handleArrowTopClick = () => {
    scroll.scrollToTop({
      duration: 1000,
      smooth: true,
    });
  };

  useEffect(() => {
    handleArrowTopClick();
  }, []);

  return (
    <div className="absolute md:min-w-[100%] lg:max-h-[220vh] lg:min-h-[220vh] lg:min-w-[100%] max-w-[200%] h-[100vh] overflow-hidden overflow-x-auto overflow-y-hidden">
      <div className="w-full h-full lg:overflow-y-auto lg:min-w-[100%] min-w-[200%] overflow-hidden object-cover overflow-x-auto">
        <img
          className="lg:w-full min-h-screen lg:object-fill md:object-fill lg:h-full lg:min-w-[100%] md:min-w-[100%] h-[100vh] overflow-hidden sm:min-w-[100%] sm:object-fill  min-w-[100%] overflow-x-auto object-cover"
          src={Admin}
          alt="Jail"
        />
      </div>
      <div
        className="absolute hidden lg:flex left-[3%] top-[3%]"
        onClick={handleArrowClick}
      >
        <ArrowBtn />
      </div>
      <div
        className="absolute hidden lg:flex  right-[3%] bottom-[3%] "
        onClick={handleArrowTopClick}
      >
        <ArrowBtn rotate={"rotate-180"} />
      </div>

      <div
        className="absolute sm:top-[25%] sm:right-[0%] md:top-[25%] md:right-[0%] lg:right-[50%] lg:top-[25%] top-[25%] right-[0%] flex flex-col  justify-center items-center"
        onClick={() => {
          navigate("/station");
        }}
      >
        <h2 className="lg:hidden text-black bg-white bg-opacity-[50%] rounded-md px-3">Exit</h2>
        <DotBtn gate={true} nav={"Exit"} />
      </div>

      <div
        onClick={() => setIsCreateNewsOpen(true)}
        className="absolute lg:top-[60%] lg:right-[80%] md:top-[60%] md:right-[70%] sm:top-[60%] sm:right-[65%] top-[60%] right-[65%] flex flex-col  justify-center items-center"
      >
        <h2 className="lg:hidden text-black bg-white bg-opacity-[50%] rounded-md px-3">Create News</h2>
        <DotBtn nav={"Create News"} />
      </div>

      <div
        onClick={() => setIsAddCriminalOpen(true)}
        className="absolute lg:top-[75%] lg:right-[55%]  md:top-[75%] md:right-[5%] sm:top-[75%] sm:right-[0%] top-[75%] right-[0%] flex flex-col  justify-center items-center"
      >
        <h2 className="lg:hidden text-black bg-white bg-opacity-[50%] rounded-md px-3">Add Criminal</h2>
        <DotBtn nav={"Add Criminal"} />
      </div>

      <div
        onClick={() => setIsViewTipOpen(true)}
        className="absolute lg:top-[75%] lg:right-[30%] md:top-[77%] md:right-[-40%] sm:top-[77%] sm:right-[-40%] top-[80%] right-[-45%] flex flex-col  justify-center items-center"
      >
        <h2 className="lg:hidden text-black bg-white bg-opacity-[50%] rounded-md px-3">View Tips</h2>
        <DotBtn nav={"View Tips"} />
      </div>

      <div
        onClick={() => setIsAddJobOpen(true)}
        className="absolute lg:top-[55%] lg:right-[28%]  md:top-[55%] md:right-[-43%] sm:top-[55%] sm:right-[-43%] top-[55%] right-[-43%] flex flex-col  justify-center items-center"
      >
        <h2 className="lg:hidden text-black bg-white bg-opacity-[50%] rounded-md px-3">Add job</h2>
        <DotBtn nav={"Add Job"} />
      </div>

      <div
        onClick={() => setIsAdminAddOpen(true)}
        className="absolute lg:top-[45%] lg:right-[75%]  md:top-[45%] md:right-[50%] sm:top-[45%] sm:right-[50%] top-[45%] right-[50%] border-white flex flex-col  justify-center items-center"
      >
        <h2 className="lg:hidden text-black bg-white bg-opacity-[50%] rounded-md px-3">Admin Hub</h2>
        <DotBtn nav={"Admin Hub"} admin={true} />
      </div>
      <div
        onClick={() => setIsAdminAddOpen(true)}
        className="absolute lg:top-[45%] lg:right-[25%]  md:top-[45%] md:right-[-50%] sm:top-[45%] sm:right-[-50%] top-[45%] right-[-50%] flex flex-col  justify-center items-center"
      >
        <h2 className="lg:hidden text-black bg-white bg-opacity-[50%] rounded-md px-3">Admin Hub</h2>
        <DotBtn nav={"Admin Hub"} admin={true} />
      </div>

      <CriminalAddModal
        isOpen={isAddCriminalOpen}
        onClose={() => setIsAddCriminalOpen(false)}
      />
      <ViewTipModal
        isOpen={isViewTipOpen}
        onClose={() => setIsViewTipOpen(false)}
      />
      <AdminAddModal
        isOpen={isAdminAddOpen}
        onClose={() => setIsAdminAddOpen(false)}
      />
      <CreateNewsModal
        isOpen={isCreateNewsOpen}
        onClose={() => setIsCreateNewsOpen(false)}
      />
      <AddJobModal
        isOpen={isAddJobOpen}
        onClose={() => setIsAddJobOpen(false)}
      />
    </div>
  );
};

export default OfficeScreen;
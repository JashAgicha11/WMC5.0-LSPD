import { useState } from "react";
import { Station } from "../../assets";
import SkipBtn from "../../buttons/SkipBtn";
import { useNavigate } from "react-router-dom";
import NewsModal from "./NewsModal";
import CareerModal from "./CareerModal";

import DotBtn from "../../buttons/DotBtn";
import TipModal from "./TipModal";
import useStore from "../../Store/store";

const StationScreen = () => {
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isTipOpen, setIsTipOpen] = useState(false);
  // const [isCareerOpen, setIsCareerOpen] = useState(false);

  const {isCareerModalOpen,setCareerModalOpen} = useStore()

  const navigate = useNavigate();

  return (
    <div className="relative lg:max-h-[220vh] lg:min-h-[220vh]  h-[100vh] md:w-[100%] lg:w-[100%] md:overflow-hidden md:overflow-y-auto overflow-y-hidden overflow-x-auto lg:overflow-hidden m-0 p-0">
      <img
        className="absolute lg:min-w-[100%] lg:min-h-[100%] md:min-w-[100%] min-h-screen min-w-[200%]  lg:w-full overflow-x-auto overflow-y-hidden lg:object-fill md:object-fill"
        src={Station}
        alt="Station"
      />
      <div
        className="absolute top-[27%] right-[73%] md:right-[85%] lg:top-[30%]  lg:right-[87%] flex flex-col  justify-center items-center"
        onClick={() => navigate("/jail")}
      >
        <h2 className="lg:hidden text-black bg-white bg-opacity-[50%] rounded-md px-3">Jail</h2>
        <DotBtn nav={"Jail"} gate={true} rotate={true} />
      </div>
      <div
        className="absolute top-[25%] right-[-55%] lg:top-[26%] md:right-[23%] lg:right-[23%] flex flex-col  justify-center items-center"
        onClick={() => navigate("/office")}
      >
        <h2 className="lg:hidden text-black bg-white bg-opacity-[50%] rounded-md px-3">Office</h2>
        <DotBtn nav={"Office"} gate={true} />
      </div>
      <div
        className="absolute top-[25%] right-[5%] lg:top-[26%] md:right-[23%] lg:right-[47%] flex flex-col  justify-center items-center"
        onClick={() => navigate("/face")}
      >
        <h2 className="lg:hidden text-black bg-white bg-opacity-[50%] rounded-md px-3">Office</h2>
        <DotBtn nav={"Face"} gate={true} />
      </div>
      <div
        className="absolute top-[20%] right-[-75%] lg:top-[22%] lg:right-[11%] md:right-[11%] flex flex-col  justify-center items-center"
        onClick={() => setIsNewsOpen(true)}
      >
        <h2 className="lg:hidden text-black bg-white bg-opacity-[50%] rounded-md px-3">News</h2>
        <DotBtn nav={"News"} />
      </div>
      <div
        className="absolute top-[55%] right-[0%]  lg:top-[55%]  lg:right-[47%] md:right-[47%] flex flex-col  justify-center items-center"
        onClick={() => setCareerModalOpen(true)}
      >
        <h2 className="lg:hidden text-black bg-white bg-opacity-[50%] rounded-md px-3">Careers</h2>
        <DotBtn nav={"Careers"} />
      </div>
      <div
        className="absolute top-[25%] right-[-27%]  lg:top-[27%] lg:right-[38%] md:right-[37%] flex flex-col  justify-center items-center"
        onClick={() => setIsTipOpen(true)}
      >
        <h2 className="lg:hidden text-black bg-white bg-opacity-[50%] rounded-md px-3">Scan Me</h2>
        <DotBtn nav={"Scan Me"} />
      </div>

      <NewsModal isOpen={isNewsOpen} onClose={() => setIsNewsOpen(false)} />
      <TipModal isOpen={isTipOpen} onClose={() => setIsTipOpen(false)}/>
      <CareerModal isOpen={isCareerModalOpen} onClose={() => setCareerModalOpen(false)}/>
    </div>
  );
};
false
export default StationScreen;
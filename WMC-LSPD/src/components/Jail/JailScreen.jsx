import { useEffect, useState } from "react";
import { Jail } from "../../assets";
import { animateScroll as scroll } from "react-scroll";
import ArrowBtn from "../../buttons/arrowBtn";
import DotBtn from "../../buttons/DotBtn";
import { useNavigate } from "react-router-dom";
import WantedListModal from "./WantedListModal";
import useStore from "../../Store/store";

const JailScreen = () => {
  // const [isWantedListOpen, setIsWantedListOpen] = useState(false);
  const { isWantedBoxOpen, setWantedOpen, setCriminalOpen } = useStore();

  const navigate = useNavigate();

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
  }, [scroll]);

  return (
    <div className="absolute md:min-w-[100%] lg:max-h-[220vh] lg:min-h-[220vh] lg:min-w-[100%] max-w-[200%] h-[100vh] overflow-hidden overflow-x-auto overflow-y-hidden">
      <div className="w-full h-full lg:overflow-y-auto lg:min-w-[100%] min-w-[200%] overflow-hidden object-cover overflow-x-auto">
        <img
          className="lg:w-full min-h-screen lg:object-fill md:object-fill lg:h-full lg:min-w-[100%] md:min-w-[100%] h-[100vh] overflow-hidden sm:min-w-[100%]  min-w-[100%] overflow-x-auto object-cover"
          src={Jail}
          alt="Jail"
        />
      </div>
      <div
        className="absolute lg:flex hidden left-[5%] top-[3%]"
        onClick={handleArrowClick}
      >
        <ArrowBtn />
      </div>
      <div
        className="absolute lg:flex hidden lg:right-[5%] lg:bottom-[3%]"
        onClick={handleArrowTopClick}
      >
        <ArrowBtn rotate={"rotate-180"} />
      </div>
      <div
        onClick={() => navigate("/station")}
        className="absolute top-[63%] right-[22%] lg:right-[61%] lg:top-[65%] flex flex-col  justify-center items-center"
      >
        <h2 className="lg:hidden text-black bg-white bg-opacity-[50%] rounded-md px-3">Exit</h2>
        <DotBtn nav={"Exit"} gate={true} rotate={true} />
      </div>
      <div
        onClick={() => setWantedOpen(true)}
        className="absolute top-[20%] right-[-60%] lg:top-[20%] lg:right-[25%] flex flex-col  justify-center items-center"
      >
        <h2 className="lg:hidden text-black bg-white bg-opacity-[50%] rounded-md px-3">Wanted List</h2>
        <DotBtn nav={"Wanted List"} />
      </div>
      <WantedListModal
        isOpen={isWantedBoxOpen}
        onClose={() => setWantedOpen(false)}
      />
    </div>
  );
};

export default JailScreen;
import { useGSAP } from "@gsap/react";
import gsap from "gsap";



const ArrowBtn = ({rotate}) => {

  const timeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 0,
    yoyo: true,
  });

  useGSAP(() => {
    timeline.fromTo(
      ".arrow",
      {
        y: 13,
        duration: 0.7,
        // opacity:0
      },
      {
        y: 0,
        duration: 0.7,
        ease: "bounce.inOut",
      }
    );
  });
  return (
    <button className= {`transform ${rotate} welcome  flex justify-center items-center arrow cursor-pointer bg-gray-800 px-3 py-2 rounded-md text-white tracking-wider shadow-xl transition-all ease-linear`}>
      <svg
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          strokeLinejoin="round"
          strokeLinecap="round"
        ></path>
      </svg>
    </button>
  );
};

export default ArrowBtn;

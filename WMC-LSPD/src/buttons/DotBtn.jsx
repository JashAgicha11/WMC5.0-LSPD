import { useState, useLayoutEffect } from "react";
import "./dot.css";
import gsap from "gsap";
import { Entry, Person } from "../assets";
import Exit from '@mui/icons-material/ExitToAppOutlined';
import { useEffect } from "react";

const DotBtn = ( {nav, gate,rotate,admin }) => {
  const [isHover, setIsHover] = useState(false);
  const [isGate, setIsGate] = useState(gate);
  const [isRotate, setIsRotate] = useState(rotate);
  const [isAdmin, setIsAdmin] = useState(admin);


  

  useLayoutEffect(() => {
    if (isHover) {
      gsap.fromTo(
        ".nav",
        {
          // width: 0,
          duration: 3,
          x: 50,
          ease: "power2.out",
          opacity: 0,
          stagger: 1,
          delay:0.2,
        },
        {
          // width: 3,
          duration: 1.5,
          x: -0,
          ease: "power2.out",
          opacity: 1,
          stagger: 1,
          delay:0.2
        }
      );
    }
  }, [isHover]);

  useEffect(() => {
    setIsGate(gate)
    setIsRotate(rotate)
    setIsAdmin(admin)
  }, []);

  return (
    <div
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="hover:bg-white hover:bg-opacity-35 cursor-pointer  hover:border-2 border-black hover:backdrop-blur-sm h-[30%] rounded-2xl  w-fit transition-width hover:w-fit transition-all duration-700 ease-linear flex justify-end  text-nowrap"
    >
      {isHover && (
        <h4 className="nav text-black opacity-100 font-poppins text-lg border-none ml-5">{nav}</h4>
      )}
      {isGate && !isAdmin && (
        <div className="ml-3">
          {isRotate && (<img className="max-h-[30px] max-w-[30px] text-white transform rotate-180" src={Entry} alt="Entry" />)}
          {!isRotate && (<img className="max-h-[30px] max-w-[30px] text-white" src={Entry} alt="Entry" />)}
        </div>
      )}

      {!isGate && isAdmin &&(
        <div className="ml-3 flex justify-center items-center">
        <img className="min-h-[30px] min-w-[30px] text-white" src={Person} alt="Entry"/>
      </div>
      )}

      {!isGate && !isAdmin && (<div className="loader h-[30px]">
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
      </div>)}
    </div>
  );
};

export default DotBtn;



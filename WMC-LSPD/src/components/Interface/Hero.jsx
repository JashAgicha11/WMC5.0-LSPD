import { IntroVideo, IntroImg } from "../../assets/index";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "../../buttons/btnStyle.css";
import { animateScroll as scroll } from "react-scroll";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SkipBtn from "../../buttons/SkipBtn";

const Hero = () => {
  const [play, setPlay] = useState(false);

  const navigate = useNavigate();

  const timeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 0,
    yoyo: true,
    delay: 5,
  });

  const handleArrowClick = () => {
    scroll.scrollToBottom({
      duration: 1000, // adjust the duration to your liking
      smooth: true,
    });
  };
  useEffect(() => {
    scroll.scrollToTop({
      duration: 1000,
      smooth: true,
    });
  }, []);

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
    ),
      gsap.fromTo(
        ".arrow",
        {
          x: -250,
          y: 0,
          rotate: 1440,
          borderRadius: "50%",
          duration: 2,
          ease: "ease.inOut",
          opacity: 0,
          delay: 2,
        },
        {
          x: 0,
          y: 0,
          rotate: 0,
          borderRadius: "20%",
          duration: 4,
          ease: "power1.inOut",
          opacity: 1,
          // delay:2
        }
      ),
      gsap.fromTo(
        ".welcome",
        {
          opacity: 0,
          y: -20,
          ease: "power1.inOut",
        },
        {
          opacity: 1,
          y: 0,
          delay: 1,
          stagger: 0.2,
        }
      );
  }, []);
  const handlePlay = () => {
    setPlay(true);
  };

  return (
    <div>
      {!play && (
        <div>
          <div className=" absolute flex justify-center z-10 items-center w-full flex-col top-[10%] gap-3">
            <p className="font-pricedown text-lg gap-1 text-yellow-200  welcome ">
              Welcome to the
            </p>
            <p className="text-white font-pricedown gap-1 text-2xl  sm:text-5xl welcome">
              Los Santos Police Department
            </p>
            <button
              onClick={handleArrowClick}
              className="welcome arrow cursor-pointer bg-gray-800 px-3 py-2 rounded-md text-white tracking-wider shadow-xl transition-all ease-linear"
            >
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
          </div>

          <div>
            <img
              src={IntroImg}
              className="absolute w-full h-[180vh] object-cover z-2 sm:transition ease-in duration-300"
            />
          </div>
          <button
            onClick={handlePlay}
            className="absolute top-[140vh] sm:left-[43.5%] left-[31%] flex justify-center items-center"
          >
            <a className="create h-fit  flex justify-center items-center flex-nowrap text-nowrap ">
              <span className="text-lg sm:text-[1.3rem]">Let's Go Inside</span>
            </a>
          </button>
        </div>
      )}

      {play && (
        <div className="sm:min-w-[100vh] sm:h-screen sm:object-fill">
          <video
            src={IntroVideo}
            className="absolute w-[100vh] h-[100vh]  object-cover sm:w-full sm:h-full sm:object-fill"
            autoPlay
            controls={false}
            onEnded={()=>{navigate("/station")}}
            
          />
          <div onClick={() => {navigate("/station")}} className="absolute bottom-[5%] right-[5%]">
            <SkipBtn text={"SKIP"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
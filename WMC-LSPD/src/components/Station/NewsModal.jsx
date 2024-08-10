import NewsBox from "./NewsBox";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useStore from "../../Store/store"; 

const NewsModal = ({ isOpen, onClose }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { setToastr } = useStore(); 

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("https://lspd-project.onrender.com/checkAuthentication", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (response.status === 200) {
          setAuthenticated(true);
        } else {
          console.error("Authentication failed:", data.message);
          setToastr("Authentication failed. Login Required.");
          setTimeout(() => {
            navigate("/login"); 
          }, 1500); 
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setToastr("Authentication failed. Login Required."); 
        setTimeout(() => {
          navigate("/login"); 
        }, 1500); 
      }
    };

    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("https://lspd-project.onrender.com/announcements/list", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setAnnouncements(data);
        } else {
          console.error("Failed to fetch announcements");
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      checkAuthentication();
    }
  }, [isOpen, navigate, setToastr]);

  useEffect(() => {
    if (authenticated) {
      const fetchAnnouncements = async () => {
        try {
          const response = await fetch("https://lspd-project.onrender.com/announcements/list", {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          if (response.ok) {
            const data = await response.json();
            setAnnouncements(data);
          } else {
            console.error("Failed to fetch announcements");
          }
        } catch (error) {
          console.error("Error fetching announcements:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchAnnouncements();
    }
  }, [authenticated]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div onClick={onClose} className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-gray-200 w-[80%] h-[90%] z-10 flex justify-around items-center flex-col p-4 rounded-2xl">
        <div className="w-full h-[7%] sm:h-[10%] mb-4 font-pricedown flex justify-end static bg-[#b392ac] rounded-2xl">
          <h2 className="text-black flex justify-center items-center w-full h-full text-xl text-nowrap sm:text-4xl">
            News & Announcements
          </h2>

          <Button onClick={onClose} size="small">
            <CloseIcon sx={{ fontSize: 22 }} className="text-black" />
          </Button>
        </div>

        <div className="w-full h-[90%] px-5 py-2 gap-3 flex flex-col overflow-y-auto">
          {announcements.map((news) => (
            <div key={news.header} className="w-full h-full">
              <NewsBox
                img={news.img}
                by={news.by}
                content={news.content}
                header={news.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsModal;

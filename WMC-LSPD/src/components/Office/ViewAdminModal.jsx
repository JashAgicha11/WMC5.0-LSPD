import React, { useState, useEffect } from 'react';
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import AdminViewBox from "./AdminViewBox";

const ViewAdminModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [role, setRole] = useState('admin');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://lspd-project.onrender.com/list', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
        credentials: "include",
      });
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen, role]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 justify-center items-center flex z-30 font-technor">
      <div onClick={onClose} className="absolute inset-0 "></div>
      <div className=" w-[80%] h-[90%] bg-white p-4 rounded-lg flex flex-col gap-4 z-20">
        <div className=" w-full h-[10%] flex justify-end static bg-[#a8dadc] rounded-2xl">
          <h2 className="text-black flex justify-center items-center w-full h-full text-2xl lg:text-4xl font-pricedown ">
            View Admin's
          </h2>

          <Button onClick={onClose}>
            <CloseIcon className="text-black" />
          </Button>
        </div>

        <div className="w-full h-[90%] flex flex-wrap gap-4  justify-center items-start text-2xl overflow-y-auto overflow-hidden">                                      
          {data.map((admin) => {
            return (
              <AdminViewBox
                key={admin.name}
                name={admin.name}
                email={admin.email}
                img={admin.img}
                // contact={admin.contact}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewAdminModal;

import React, { useState, useEffect } from 'react';
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import CareerBox from "./CareerBox";

const CareerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [jobs, setjobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://lspd-project.onrender.com/Jobs/list", {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setjobs(data);
        } else {
          console.error("Failed to fetch announcements");
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 h-screen w-screen ">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black opacity-50"
      ></div>
      <div className=" bg-white w-[80%] h-[90%] z-10 flex  justify-around items-center flex-col p-4 rounded-2xl">
        <div className=" w-full min-h-[6.5%] sm:h-[10%] font-pricedown flex justify-end static mb-4 bg-[#52b69a] rounded-2xl">
          <h2 className="text-black flex justify-center items-center w-full h-full text-2xl sm:text-4xl text-nowrap  ">
            Careers at LSPD
          </h2>

          <Button onClick={onClose}>
            <CloseIcon className="text-black" sx={{ fontSize: 22 }}  />
          </Button>
        </div>
        <div className="w-full h-full overflow-hidden overflow-y-auto  ">
          <div className="text-wrap   sm:max-h-max lg:max-h-full flex-grow flex-wrap w-[98%] static flex gap-3 p-1 justify-center items-center">
            {jobs.map((career) => {
              return (
                <CareerBox
                  key={career.title}
                  jobName={career.title}
                  requirement={career.requirements}
                  {...career}
                />
              );
            })}
          </div>

          <span className="w-full h-full flex items-center flex-col">
            <div className="max-w-[90%] mx-auto px-4 py-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Eligibility Requirements
                </h2>
                <ul className="list-disc pl-6">
                  <li className="mb-2">
                    Applicants must be at least 21 years old.
                  </li>
                  <li className="mb-2">
                    A high school diploma or GED is required. Some positions may
                    require a college degree.
                  </li>
                  <li className="mb-2">
                    Applicants must be U.S. citizens or permanent residents.
                  </li>
                  <li className="mb-2">
                    A valid driver’s license is required.
                  </li>
                  <li className="mb-2">
                    Applicants must pass a comprehensive background check,
                    including criminal history and credit check.
                  </li>
                  <li className="mb-2">
                    Applicants must meet physical fitness standards, which
                    typically include strength, endurance, and agility tests.
                  </li>
                  <li className="mb-2">
                    Applicants must pass a medical examination and psychological
                    evaluation to ensure they are fit for duty.
                  </li>
                  <li className="mb-2">
                    Some positions may require applicants to live within a
                    certain distance of the department.
                  </li>
                </ul>
              </div>

              {/* Application Procedures */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Application Procedures
                </h2>
                <ul className="list-disc pl-6">
                  <li className="mb-2">
                    Fill out the application form available on the LSPD website
                    or at their recruitment office.
                  </li>
                  <li className="mb-2">
                    Pass a written examination that tests general knowledge,
                    reasoning, and comprehension skills.
                  </li>
                  <li className="mb-2">
                    Pass a physical agility test to demonstrate fitness levels.
                  </li>
                  <li className="mb-2">
                    Participate in an oral interview with a panel of LSPD
                    officers.
                  </li>
                  <li className="mb-2">
                    Undergo a thorough background investigation.
                  </li>
                  <li className="mb-2">
                    Complete medical and psychological evaluations.
                  </li>
                  <li className="mb-2">
                    Some positions may require a polygraph test.
                  </li>
                  <li className="mb-2">
                    If selected, complete training at the LSPD Academy.
                  </li>
                </ul>
              </div>

              {/* Benefits of Joining the Force */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Benefits of Joining the Force
                </h2>
                <ul className="list-disc pl-6">
                  <li className="mb-2">
                    LSPD offers a competitive salary with opportunities for
                    raises and promotions.
                  </li>
                  <li className="mb-2">
                    Comprehensive health insurance, including medical, dental,
                    and vision coverage.
                  </li>
                  <li className="mb-2">
                    A robust pension plan and retirement benefits.
                  </li>
                  <li className="mb-2">
                    Generous paid time off, including vacation, sick leave, and
                    holidays.
                  </li>
                  <li className="mb-2">
                    Ongoing training and professional development opportunities.
                  </li>
                  <li className="mb-2">
                    Opportunities for career advancement and specialized units
                    such as SWAT, K9, and Detective Division.
                  </li>
                  <li className="mb-2">
                    Job security in a stable and respected profession.
                  </li>
                  <li className="mb-2">
                    The opportunity to make a positive impact on the community
                    by ensuring public safety and justice.
                  </li>
                  <li className="mb-2">
                    Provision of uniforms, equipment, and other necessary gear.
                  </li>
                </ul>
              </div>

              {/* Specialized Units and Roles */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Specialized Units and Roles
                </h2>
                <ul className="list-disc pl-6">
                  <li className="mb-2">
                    Special Weapons and Tactics team members handle high-risk
                    operations (SWAT).
                  </li>
                  <li className="mb-2">
                    Detectives investigate serious crimes and gather evidence.
                  </li>
                  <li className="mb-2">
                    Officers work with trained police dogs for various tasks,
                    including search and rescue, drug detection, and
                    apprehension of suspects (K9 Unit).
                  </li>
                  <li className="mb-2">
                    Officers focus on enforcing traffic laws and investigating
                    accidents (Traffic Division).
                  </li>
                  <li className="mb-2">
                    Officers work closely with community members to build
                    relationships and solve local issues (Community Policing).
                  </li>
                </ul>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CareerModal;
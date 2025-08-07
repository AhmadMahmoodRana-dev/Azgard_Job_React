import axios from "axios";
import { useEffect, useState } from "react";
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaUsers } from "react-icons/fa";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { MdOutlinePeople } from "react-icons/md";
import { Link } from "react-router-dom";

const JobList = () => {
  const [jobList,setJobList] = useState([]);
  
  
  const fetchList = async () =>{
    try {
      const {data} = await axios.get("https://adt.azgard9.com:8443/ords/azhcm/Get_Job_Postings_Careers/GET");
      console.log("Job List Data:", data);
      setJobList(data?.Job_Posting)
      
      // setJobList(data)
    } catch (error) {
      console.error("Error fetching job list:", error);
    }
  }
  
  useEffect(() =>{
  fetchList()
  },[])
  return (
    <div className="bg-[#f5f5f3] min-h-screen flex flex-col items-center py-10 px-4">
      {/* Header */}
      <header className="w-full max-w-7xl flex justify-between items-center mb-6">
        <div className="text-2xl font-bold flex items-center space-x-2">
          {/* <div className="bg-black text-white px-3 py-2 rounded">DigiU</div> */}
        </div>
        <div className="flex space-x-3">
          <button className="py-3 px-4 border rounded-full border-[#48413f]">
            <FaLinkedinIn />
          </button>
          <button className="py-3 px-4 border rounded-full border-[#48413f]">
            <FaTwitter />
          </button>
          <button className="py-3 px-4 border rounded-full border-[#48413f]">
            <FaFacebookF />
          </button>
        </div>
      </header>

      {/* Job Listings */}
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-serif tracking-wide font-semibold text-[#2e7918] mb-2">
          Current Openings
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Thanks for checking out our job openings. See something that interests you? Apply here.
        </p>

        <hr className="border-gray-300 mb-2" />

        <div className="divide-y divide-gray-200">
          {jobList.map((job, idx) => (
            <div key={idx} className="py-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Title */}
              <div>
                <Link
                  to={`/jobdetail/${job?.ID}`}
                  className="text-[#0b4fd1] font-medium text-[16px] hover:underline capitalize"
                >
                  {job?.TITLE}
                </Link>
              </div>

              {/* Location */}
              <div className="flex flex-col items-start ">
                <div className="flex items-center gap-1 text-gray-700 text-md">
                  <HiOutlineDesktopComputer size={18} />
                  <span>{job?.JOB_TYPE}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1 ml-6">{job?.LOCATION} ({job?.JOB_TYPE})</div>
              </div>

              {/* Job Type */}
              <div className="flex justify-start">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MdOutlinePeople size={18} />
                  <span>{job?.WORK_SCHEDULE}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-xs text-gray-500">
        <p>Privacy Policy • Terms of Service • © Azgard9 All rights reserved.</p>
      </footer>
    </div>
  );
};

export default JobList;

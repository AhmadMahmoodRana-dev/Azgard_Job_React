import React from "react";
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaUsers } from "react-icons/fa";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { MdOutlinePeople } from "react-icons/md";


const jobs = [
  {
    title: "Customer Service Representative",
    location: "Lahore (Remote)",
    type: "Full-Time",
  },
  {
    title: "Digital Business Analyst",
    location: "Lahore, Punjab (Remote)",
    type: "Full-Time",
  },
  {
    title: "Operations Analyst",
    location: "Lahore, Punjab (Remote)",
    type: "Full-Time",
  },
  {
    title: "Quality Assurance Tester",
    location: "Lahore (Remote)",
    type: "Full-Time",
  },
  {
    title: "Software Engineer (Full Stack)",
    location: "Lahore (Remote)",
    type: "Full-Time",
  },
];

const JobList = () => {
  return (
    <div className="bg-[#f5f5f3] min-h-screen flex flex-col items-center py-10 px-4">
      {/* Header */}
      <header className="w-full max-w-7xl flex justify-between items-center mb-6">
        <div className="text-2xl font-bold flex items-center space-x-2">
          <div className="bg-black text-white px-3 py-2 rounded">DigiU</div>
        </div>
        <div className="flex space-x-3">
          <button className="p-2 border rounded-full">
            <FaLinkedinIn />
          </button>
          <button className="p-2 border rounded-full">
            <FaTwitter />
          </button>
          <button className="p-2 border rounded-full">
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
          {jobs.map((job, idx) => (
            <div key={idx} className="py-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Title */}
              <div>
                <a
                  href="/"
                  className="text-[#0b4fd1] font-medium text-[16px] hover:underline"
                >
                  {job.title}
                </a>
              </div>

              {/* Location */}
              <div className="flex flex-col items-start ">
                <div className="flex items-center gap-1 text-gray-700 text-md">
                  <HiOutlineDesktopComputer size={18} />
                  <span>Remote</span>
                </div>
                <div className="text-sm text-gray-600 mt-1 ml-6">{job.location}</div>
              </div>

              {/* Job Type */}
              <div className="flex justify-start">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MdOutlinePeople size={18} />
                  <span>{job.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-xs text-gray-500">
        <p>Privacy Policy • Terms of Service • © BambooHR All rights reserved.</p>
      </footer>
    </div>
  );
};

export default JobList;

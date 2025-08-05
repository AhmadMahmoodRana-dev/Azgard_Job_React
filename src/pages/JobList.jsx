// JobListPage.jsx
import React from "react";
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaUserFriends,
} from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import { HiOutlineDesktopComputer } from "react-icons/hi";

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
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-10 px-4">
      {/* Header */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-6">
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

      {/* Job Section */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-2">
          Current Openings
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Thanks for checking out our job openings. See something that interests you? Apply here.
        </p>
        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="border-t pt-4 flex justify-between items-start text-sm"
            >
              <a href="#" className="text-blue-600 hover:underline font-medium">
                {job.title}
              </a>
              <div className="text-gray-500 flex flex-col sm:flex-row sm:space-x-6 text-xs">
                <div className="flex items-center space-x-1">
                  <HiOutlineDesktopComputer />
                  <span>Remote</span>
                </div>
                <div>{job.location}</div>
                <div className="flex items-center space-x-1">
                  <FaUserFriends />
                  <span>{job.type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-xs text-gray-500">
        <p>
          Privacy Policy • Terms of Service • © BambooHR All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default JobList;
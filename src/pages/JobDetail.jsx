// import { FaLinkedin } from "react-icons/fa6";
// import { FaTwitter,FaFacebookF  } from "react-icons/fa";

// const JobDetail = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
//       <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Main Content */}
//         <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
//           <h2 className="text-2xl font-bold tracking-wide font-serif text-[#2e7918] mb-2">
//             Customer Service Representative
//           </h2>
//           <p className="text-gray-600 mb-6">Lahore (Remote)</p>

//           <hr className="mb-6" />

//           <div className="mb-6">
//             <h3 className="font-semibold text-gray-800 mb-2">
//               What you'll be doing
//             </h3>
//             <ul className="list-disc list-inside space-y-2 text-gray-700 md:text-sm text-xs  md:pl-12">
//               <li>
//                 Contact customers via phone, email and letter to identify them &
//                 collect outstanding payments.
//               </li>
//               <li>
//                 Trace individuals who have skipped on their financial
//                 obligations using various research techniques
//               </li>
//               <li>Negotiate payment plans and settlements with customers</li>
//               <li>
//                 Trace individuals/businesses and call them to confirm their
//                 current addresses and notify them about illegal use of energy
//               </li>
//               <li>
//                 Maintain accurate records and documentation of all customer
//                 interactions
//               </li>
//               <li>Escalate unresolved cases to the relevant stakeholders</li>
//               <li>
//                 Provide excellent customer service and maintain a professional
//                 demeanor at all times
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-semibold text-gray-800 mb-2">
//               What we're looking for
//             </h3>
//             <ul className="list-disc list-inside space-y-2 text-gray-700 md:text-sm text-xs md:pl-12">
//               <li>
//                 Proven experience in a collections or skip tracing role,
//                 preferably in the call center or customer service industry
//               </li>
//               <li>Energy industry experience is a bonus</li>
//               <li>Strong negotiation and conflict resolution skills</li>
//               <li>Excellent communication and interpersonal abilities</li>
//               <li>
//                 Attention to detail and the ability to accurately maintain
//                 records
//               </li>
//               <li>
//                 Familiarity with debt collection legislation and regulations
//               </li>
//               <li>Proficient in using various research tools and databases</li>
//             </ul>
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div>
//           <div className="bg-white rounded-xl shadow p-10 flex flex-col justify-between">
//             <button className="w-full bg-green-700 text-white text-xl py-3 rounded-full font-medium hover:bg-green-800 transition mb-6">
//               Apply for This Job
//             </button>
//             <hr className="mb-6" />

//             <div className="mb-6">
//               <p className="text-sm font-medium text-gray-600 mb-1">
//                 Link to This Job
//               </p>
//               <input
//                 type="text"
//                 value="https://digiu.bamboohr.com/careers/32"
//                 readOnly
//                 className="w-full border border-gray-300 rounded-full px-3 py-2 text-sm text-gray-700"
//               />
//             </div>
//             <div className="flex space-x-8 justify-center mb-6">
//               <button className="text-gray-500 border border-gray-400 hover:border-black transition-all ease-in-out duration-300 px-4 py-3 rounded-full hover:text-black">
//                 <i className="fab fa-linkedin"><FaLinkedin/></i>
//               </button>
//               <button className="text-gray-500 border border-gray-400 hover:border-black transition-all ease-in-out duration-300 px-4 py-3 rounded-full hover:text-black">
//                 <i className="fab fa-twitter"><FaTwitter/></i>
//               </button>
//               <button className="text-gray-500 border border-gray-400 hover:border-black transition-all ease-in-out duration-300 px-4 py-3 rounded-full hover:text-black">
//                 <i className="fab fa-facebook"><FaFacebookF/></i>
//               </button>
//             </div>
//           </div>
//           <div className="rounded-xl  p-6 flex flex-col justify-between">
//             <div>
//                 <h1 className="text-gray-500 text-sm">Location</h1>
//                 <p className="text-gray-700 text-md  font-semibold">Lahore (Remote)</p>
//                 <hr className="my-2 border-gray-300" />
//             </div>
//             <div>
//                 <h1 className="text-gray-500 text-sm">Employment Type</h1>
//                 <p className="text-gray-700 text-md  font-semibold">Full-Time</p>
//                 <hr className="my-2 border-gray-300" />
//             </div>
//             <div>
//                 <h1 className="text-gray-500 text-sm">Minimum Experience</h1>
//                 <p className="text-gray-700 text-md  font-semibold">Mid-level</p>
//                 <hr className="my-2 border-gray-300" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobDetail;

import { useState } from "react";
import { FaLinkedin, FaTwitter, FaFacebookF } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineCheckCircleOutline } from "react-icons/md";

const JobDetail = () => {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  console.log("Current Path:", location.pathname); // e.g. /dashboard
  console.log("Search Params:", location.search); // e.g. ?query=abc
  console.log("Hash:", location.hash); // e.g. #section
  console.log("Full URL:", location.pathname + location.search + location.hash);

  return (
    <div className="min-h-screen bg-gray-100 m-6">
      <div className="flex justify-center py-12">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6 relative overflow-hidden min-h-[600px]">
            <Link
              to={`/joblist`}
              className="flex items-center gap-3 text-[#676260] text-[15px] font-medium mb-3"
            >
              <IoIosArrowBack />
              <h1 className="hover:text-[#2e7918] hover:underline cursor-pointer">
                Job Openings
              </h1>
            </Link>
            <h2 className="text-2xl font-bold tracking-wide font-serif text-[#2e7918] mb-2">
              Customer Service Representative
            </h2>
            <p className="text-[#48413f] mb-6">Lahore (Remote)</p>
            <hr className="mb-6" />
            <AnimatePresence mode="wait">
              {!showForm ? (
                <motion.div
                  key="description"
                  initial={{ x: 0, opacity: 1 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -500, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      What you'll be doing
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-[#48413f] text-sm pl-12">
                      <li>
                        Contact customers via phone, email and letter to
                        identify them & collect outstanding payments.
                      </li>
                      <li>
                        Trace individuals who have skipped on their financial
                        obligations using various research techniques
                      </li>
                      <li>
                        Negotiate payment plans and settlements with customers
                      </li>
                      <li>
                        Trace individuals/businesses and call them to confirm
                        their current addresses and notify them about illegal
                        use of energy
                      </li>
                      <li>
                        Maintain accurate records and documentation of all
                        customer interactions
                      </li>
                      <li>
                        Escalate unresolved cases to the relevant stakeholders
                      </li>
                      <li>
                        Provide excellent customer service and maintain a
                        professional demeanor at all times
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      What we're looking for
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-[#48413f] text-sm pl-12">
                      <li>
                        Proven experience in a collections or skip tracing role,
                        preferably in the call center or customer service
                        industry
                      </li>
                      <li>Energy industry experience is a bonus</li>
                      <li>Strong negotiation and conflict resolution skills</li>
                      <li>
                        Excellent communication and interpersonal abilities
                      </li>
                      <li>
                        Attention to detail and the ability to accurately
                        maintain records
                      </li>
                      <li>
                        Familiarity with debt collection legislation and
                        regulations
                      </li>
                      <li>
                        Proficient in using various research tools and databases
                      </li>
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ x: 500, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 500, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <form className="space-y-6 max-w-3xl mx-auto">
                    {/* First + Last Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[70%]">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          First Name*
                        </label>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md outline-none text-gray-500 px-3 py-2 w-[100%]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Last Name*
                        </label>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md outline-none text-gray-500 px-3 py-2 w-[100%]"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email*
                      </label>
                      <input
                        type="email"
                        className="border border-gray-300 rounded-md outline-none text-gray-500 px-3 py-2 w-[45%]"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone*
                      </label>
                      <input
                        type="tel"
                        className="border border-gray-300 rounded-md outline-none text-gray-500 px-3 py-2 w-[45%]"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Address*
                      </label>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md outline-none text-gray-500 px-3 py-2 w-[45%]"
                      />
                    </div>

                    {/* City, Province, Postal Code */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[80%]">
                      <div className="w-[80%]">
                        <label className="block text-sm font-medium mb-1">
                          City*
                        </label>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md outline-none text-gray-500 px-3 py-2"
                        />
                      </div>
                      <div className="w-[80%]">
                        <label className="block text-sm font-medium mb-1">
                          Province*
                        </label>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md outline-none text-gray-500 px-3 py-2 "
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Postal Code*
                        </label>
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md outline-none text-gray-500 px-3 py-2 w-[50%]"
                        />
                      </div>
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Country*
                      </label>
                      <select className="w-[45%] border border-gray-300 rounded-md outline-none text-gray-500 px-3 py-2">
                        <option>Pakistan</option>
                      </select>
                    </div>

                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Upload Resume
                      </label>
                      <input
                        type="file"
                        className="w-[45%] border border-gray-300 rounded-md outline-none text-gray-500 px-3 py-2"
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Available From
                      </label>
                      <input
                        type="date"
                        className="w-[45%] border border-gray-300 rounded-md outline-none text-gray-500 px-3 py-2"
                      />
                    </div>

                    {/* Desired Pay */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Desired Pay*
                      </label>
                      <input
                        type="text"
                        className="w-[45%] border border-gray-300 rounded-md outline-none text-gray-500 px-3 py-2"
                      />
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-xl shadow p-10 flex flex-col justify-between">
              {showForm ? (
                <button
                  className="cursor-pointer w-full flex justify-center items-center bg-white border border-green-700 text-green-700 text-lg tracking-wider gap-4 py-3 rounded-full font-medium hover:bg-[#f4fef1] transition mb-6"
                  onClick={() => setShowForm(!showForm)}
                >
                  <IoIosArrowBack size={22} />
                  View Job Description
                </button>
              ) : (
                <button
                  className="cursor-pointer w-full bg-green-700 text-white text-lg py-3 rounded-full font-medium hover:bg-green-800 transition mb-6"
                  onClick={() => setShowForm(!showForm)}
                >
                  Apply for This Job
                </button>
              )}
              <hr className="mb-6" />

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Link to This Job
                </p>
                <input
                  type="text"
                  value="https://digiu.bamboohr.com/careers/32"
                  readOnly
                  className="w-full border border-gray-300 rounded-full px-3 py-2 text-sm text-gray-700"
                />
              </div>
              <div className="flex space-x-8 justify-center mb-6">
                <button className="text-gray-500 border border-gray-400 hover:border-black transition-all ease-in-out duration-300 px-4 py-3 rounded-full hover:text-black">
                  <FaLinkedin />
                </button>
                <button className="text-gray-500 border border-gray-400 hover:border-black transition-all ease-in-out duration-300 px-4 py-3 rounded-full hover:text-black">
                  <FaTwitter />
                </button>
                <button className="text-gray-500 border border-gray-400 hover:border-black transition-all ease-in-out duration-300 px-4 py-3 rounded-full hover:text-black">
                  <FaFacebookF />
                </button>
              </div>
            </div>
            <div className="rounded-xl p-6 flex flex-col justify-between">
              <div>
                <h1 className="text-gray-500 text-sm">Location</h1>
                <p className="text-gray-700 text-md font-semibold">
                  Lahore (Remote)
                </p>
                <hr className="my-2 border-gray-300" />
              </div>
              <div>
                <h1 className="text-gray-500 text-sm">Employment Type</h1>
                <p className="text-gray-700 text-md font-semibold">Full-Time</p>
                <hr className="my-2 border-gray-300" />
              </div>
              <div>
                <h1 className="text-gray-500 text-sm">Minimum Experience</h1>
                <p className="text-gray-700 text-md font-semibold">Mid-level</p>
                <hr className="my-2 border-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showForm ? (
        <div className="fotter px-8 w-full h-[100px] bg-[#38312f] rounded-bl-2xl rounded-br-2xl flex items-center justify-between">
          <div className="flex gap-4">
            <button
              className="flex bg-white px-6 py-3 rounded-full border hover:bg-[#f4fef1] cursor-pointer border-green-700 text-green-700 gap-2 font-medium text-lg justify-center items-center"
              onClick={() => setShowForm(!showForm)}
            >
              <MdOutlineCheckCircleOutline size={22} />
              Submit Application
            </button>
            <button className="text-white underline text-lg font-semibold">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="fotter px-36 pb-4 w-full  rounded-bl-2xl rounded-br-2xl flex items-center justify-between">
          <div className="flex gap-4 text-gray-600">
            <span className="hover:underline cursor-pointer">
              Privacy Policy •
            </span>
            <span className="hover:underline cursor-pointer">
            Terms of Service •
            </span>
            <span>
             © BambooHR All rights reserved.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;

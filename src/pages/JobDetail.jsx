import { useState, useEffect } from "react";
import { FaLinkedin, FaTwitter, FaFacebookF } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation, useParams } from "react-router-dom";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import Select from "react-select";
import axios from "axios";
import DOMPurify from "dompurify";
import FormatDate from "../services/FormatDate";
import formatCnic from "../services/formatCnic";

const JobDetail = () => {
  const [showForm, setShowForm] = useState(false);
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    experience: "",
    cnic: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    province: "",
    postalCode: "",
    highestEducation: "",
    currentEmployer: "",
    currentDesignation: "",
    currentSalary: "",
    expectedSalary: "",
    reference: "",
  });
  const [errors, setErrors] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const [availableFrom, setAvailableFrom] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // NEW: Prevent double submission
  const [hasReference, setHasReference] = useState(false);
  const [referenceFields, setReferenceFields] = useState({
    referenceName: "",
    referenceDesignation: "",
    referenceDepartment: "",
  });
  const { id } = useParams();

  const fetchCountryOptions = async () => {
    try {
      const { data } = await axios.get(
        `https://countriesnow.space/api/v0.1/countries/flag/images`
      );
      const formattedOptions = data.data.map((country) => ({
        value: country.name,
        label: (
          <div className="flex items-center gap-2">
            <img src={country.flag} alt={country.name} className="w-5 h-5" />
            {country.name}
          </div>
        ),
      }));

      setCountryOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching country options:", error);
    }
  };

  useEffect(() => {
    fetchCountryOptions();
  }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cnic") {
      const formatted = formatCnic(value);
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else if (name === "phone") {
      let phone = value.replace(/[^\d+]/g, "");
      if (phone.includes("+")) {
        phone = "+" + phone.replace(/\+/g, "").slice(0, 15);
      }
      setFormData((prev) => ({ ...prev, [name]: phone }));
    } else if (name === "currentSalary" || name === "expectedSalary") {
      const numericValue = value.replace(/\D/g, "");
      const formattedValue = new Intl.NumberFormat().format(numericValue);
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // NEW: Enhanced file validation function
  const validateFile = (file) => {
    if (!file) return "Resume is required";
    
    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      return "Only PDF, DOC, and DOCX files are allowed";
    }
    
    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }
    
    return null;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
    
    // Clear previous file errors
    if (errors.resumeFile) {
      setErrors((prev) => ({ ...prev, resumeFile: "" }));
    }
    
    // Validate file immediately
    if (file) {
      const fileError = validateFile(file);
      if (fileError) {
        setErrors((prev) => ({ ...prev, resumeFile: fileError }));
        setResumeFile(null); // Clear invalid file
        e.target.value = ''; // Clear input
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;

    // Required fields validation
    const requiredFields = [
      "firstName",
      "lastName",
      "dob",
      "gender",
      "maritalStatus",
      "experience",
      "cnic",
      "email",
      "phone",
      "address",
      "city",
      "highestEducation",
      "currentEmployer",
      "currentDesignation",
      "currentSalary",
      "expectedSalary",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    // Notice Period validation
    if (!availableFrom.trim()) {
      newErrors.availableFrom = "Notice period is required";
    }

    // Enhanced resume file validation
    const fileError = validateFile(resumeFile);
    if (fileError) {
      newErrors.resumeFile = fileError;
    }

    // CNIC validation
    if (formData.cnic && !cnicRegex.test(formData.cnic)) {
      newErrors.cnic = "CNIC must be in format XXXXX-XXXXXXX-X";
    }

    // Email validation
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone validation
    if (formData.phone && !formData.phone.startsWith("+")) {
      newErrors.phone = "Phone must start with '+'";
    }

    // Reference validation
    if (hasReference) {
      if (!referenceFields.referenceName.trim()) {
        newErrors.referenceName = "Reference name is required";
      }
      if (!referenceFields.referenceDesignation.trim()) {
        newErrors.referenceDesignation = "Reference designation is required";
      }
      if (!referenceFields.referenceDepartment.trim()) {
        newErrors.referenceDepartment = "Reference department is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle reference radio change
  const handleReferenceChange = (value) => {
    setHasReference(value === "yes");
    if (value === "no") {
      setReferenceFields({
        referenceName: "",
        referenceDesignation: "",
        referenceDepartment: "",
      });
      const newErrors = { ...errors };
      delete newErrors.referenceName;
      delete newErrors.referenceDesignation;
      delete newErrors.referenceDepartment;
      setErrors(newErrors);
    }
  };

  // Handle reference input changes
  const handleReferenceInputChange = (e) => {
    const { name, value } = e.target;
    setReferenceFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // console.log(resumeFile, "resumeFile");

  const sendAttachement = async (temp) => {
    try {
      const formData = new FormData();
      formData.append('body', resumeFile);
      formData.append('P_FILE_NAME', resumeFile?.name);
      formData.append('P_MIME_TYPE', resumeFile?.type);
      formData.append('P_TEMP_PK', temp);

      const response = await axios.post(
        `https://adt.azgard9.com:8443/ords/azhcm/upload_files_Api/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      // console.log("Attachment Response:", response);
      return response;
    } catch (error) {
      console.error("Error uploading attachment:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // NEW: Prevent double submission
    if (isSubmitting) {
      return;
    }
    
    if (validateForm()) {
      setIsSubmitting(true); // NEW: Set submitting state
      
      try {
        const response = await axios.post(
          `https://adt.azgard9.com:8443/ords/azhcm/Job_Detail_Form/Insert`,
          {
            P_FIRST_NAME: formData?.firstName,
            P_LAST_NAME: formData?.lastName,
            P_CNIC: formData?.cnic,
            P_EMAIL: formData?.email,
            P_PHONE: formData?.phone,
            P_BIRTH_DATE: FormatDate(formData?.dob),
            P_GENDER: formData?.gender,
            P_MARITAL_STATUS: formData?.maritalStatus,
            P_EXPERIENCE: `${formData?.experience}Year`,
            P_ADDRESS: formData?.address,
            P_CITY: formData?.city,
            P_PROVINCE: formData?.province,
            P_POSTAL_CODE: formData?.postalCode,
            P_CURRENT_EMPLOYER: formData?.currentEmployer,
            P_CURRENT_DESIGNATION: formData?.currentDesignation,
            P_CURRENT_SALARY: formData?.currentSalary,
            P_EXPECTED_SALARY: formData?.expectedSalary,
            P_HIGHEST_EDUCATION: formData?.highestEducation,
            P_REFERENCE: referenceFields?.referenceName,
            P_AVAILABLE_FROM:availableFrom,
            P_COUNTRY: selectedCountry?.value,
            P_REF_DEPARTMENT: referenceFields?.referenceDepartment,
            P_REF_DESIGNATION: referenceFields?.referenceDesignation,
            P_JOB_ID: id,
          }
        );
        console.log( {
            P_FIRST_NAME: formData?.firstName,
            P_LAST_NAME: formData?.lastName,
            P_CNIC: formData?.cnic,
            P_EMAIL: formData?.email,
            P_PHONE: formData?.phone,
            P_BIRTH_DATE: FormatDate(formData?.dob),
            P_GENDER: formData?.gender,
            P_MARITAL_STATUS: formData?.maritalStatus,
            P_EXPERIENCE: `${formData?.experience}Year`,
            P_ADDRESS: formData?.address,
            P_CITY: formData?.city,
            P_PROVINCE: formData?.province,
            P_POSTAL_CODE: formData?.postalCode,
            P_CURRENT_EMPLOYER: formData?.currentEmployer,
            P_CURRENT_DESIGNATION: formData?.currentDesignation,
            P_CURRENT_SALARY: formData?.currentSalary,
            P_EXPECTED_SALARY: formData?.expectedSalary,
            P_HIGHEST_EDUCATION: formData?.highestEducation,
            P_REFERENCE: referenceFields?.referenceName,
            P_AVAILABLE_FROM:availableFrom,
            P_COUNTRY: selectedCountry?.value,
            P_REF_DEPARTMENT: referenceFields?.referenceDepartment,
            P_REF_DESIGNATION: referenceFields?.referenceDesignation,
            P_JOB_ID: id,
          })

        // console.log(response, "Response from backend");
        
        if (response.status === 200 && response.data?.P_TEMP_PK) {
          await sendAttachement(response.data?.P_TEMP_PK);
          setSubmitted(true);
          
          setTimeout(() => {
            setShowForm(false);
            // Reset all form data
            setFormData({
              firstName: "",
              lastName: "",
              dob: "",
              gender: "",
              maritalStatus: "",
              experience: "",
              cnic: "",
              email: "",
              phone: "",
              address: "",
              city: "",
              province: "",
              postalCode: "",
              highestEducation: "",
              currentEmployer: "",
              currentDesignation: "",
              currentSalary: "",
              expectedSalary: "",
              reference: "",
              country: "",
            });
            setResumeFile(null);
            setReferenceFields({
              referenceName: "",
              referenceDesignation: "",
              referenceDepartment: "",
            });
            setAvailableFrom("");
            setErrors({});
            setSubmitted(false);
            setIsSubmitting(false); // NEW: Reset submitting state
          }, 2000);
        } else {
          alert("Error submitting form - Invalid response");
          setIsSubmitting(false); // NEW: Reset on error
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form. Please try again.");
        setIsSubmitting(false); // NEW: Reset on error
      }
    }
  };

  useEffect(() => {
    if (!showForm) {
      setFormData({
        firstName: "",
        lastName: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        experience: "",
        cnic: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        highestEducation: "",
        currentEmployer: "",
        currentDesignation: "",
        currentSalary: "",
        expectedSalary: "",
        reference: "",
      });
      setReferenceFields({
        referenceName: "",
        referenceDesignation: "",
        referenceDepartment: "",
      });
      setResumeFile(null);
      setAvailableFrom("");
      setErrors({});
      setIsSubmitting(false); // NEW: Reset submitting state when form closes
    }
  }, [showForm]);

  // FETCH JOB DETAIL
  const [jobDetail, setJobDetail] = useState([]);
  const location = useLocation();

  const fetchJobDetail = async () => {
    try {
      const { data } = await axios.get(
        `https://adt.azgard9.com:8443/ords/azhcm/Get_Job_Posting_Detail/GET`,
        {
          params: {
            X_JOB_ID: id,
          },
        }
      );
      // console.log("Job Detail Data:", data?.Job_Details);
      setJobDetail(data?.Job_Details);
    } catch (error) {
      console.error;
    }
  };

  useEffect(() => {
    fetchJobDetail();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 m-6">
      <div className="flex justify-center py-12">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6 relative overflow-hidden">
            <Link
              to={`/`}
              className="flex items-center gap-3 text-[#676260] text-[15px] font-medium mb-3"
            >
              <IoIosArrowBack />
              <h1 className="hover:text-[#2e7918] hover:underline cursor-pointer">
                Job Openings
              </h1>
            </Link>
            <h2 className="text-2xl font-bold tracking-wide font-serif text-[#2e7918] mb-2">
              {jobDetail[0]?.TITLE}
            </h2>
            <p className="text-[#48413f] mb-6">
              {jobDetail[0]?.LOCATION} ({jobDetail[0]?.JOB_TYPE})
            </p>
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
                  <div
                    className="text-gray-700 text-sm leading-relaxed description-content"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(jobDetail[0]?.JOB_DESCRIPTION),
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ x: 500, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 500, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {submitted ? (
                    <div className="text-center py-10">
                      <MdOutlineCheckCircleOutline className="text-green-600 text-5xl mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Application Submitted!
                      </h3>
                      <p className="text-gray-600">
                        Thank you for applying. We'll review your application
                        shortly.
                      </p>
                    </div>
                  ) : (
                    <form
                      className="space-y-6 max-w-3xl mx-auto"
                      onSubmit={handleSubmit}
                    >
                      {/* First + Last Name */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[70%]">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            First Name*
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className={`border ${
                              errors.firstName
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md outline-none text-gray-500 px-3 py-2 w-[100%]`}
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.firstName}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Last Name*
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className={`border ${
                              errors.lastName
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md outline-none text-gray-500 px-3 py-2 w-[100%]`}
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* CNIC */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[70%]">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            CNIC*
                          </label>
                          <input
                            type="text"
                            name="cnic"
                            value={formData.cnic}
                            onChange={handleInputChange}
                            placeholder="35202-2394453-3"
                            className={`border ${
                              errors.cnic ? "border-red-500" : "border-gray-300"
                            } rounded-md outline-none text-gray-500 px-3 py-2 w-full`}
                          />
                          {errors.cnic && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.cnic}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Date of Birth*
                          </label>
                          
                            <input
                              type="date"
                              name="dob"
                              value={formData.dob}
                              onChange={handleInputChange}
                              className={`border ${
                                errors.dob
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-md outline-none text-gray-500 px-3 py-2 w-[100%]`}
                            />
                         
                          {errors.dob && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.dob}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Email*
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`border ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          } rounded-md outline-none text-gray-500 px-3 py-2 w-[45%]`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Phone*
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+[Country Code][Number]"
                          className={`border ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          } rounded-md outline-none text-gray-500 px-3 py-2 w-[45%]`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Gender + Marital Status + Experience */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[80%]">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Gender*
                          </label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className={`border ${
                              errors.gender
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md outline-none text-gray-500 px-3 py-2 w-[100%]`}
                          >
                            <option value="">Select Gender</option>
                            <option value="M">MALE</option>
                            <option value="F">FEMALE</option>
                            <option value="O">OTHER</option>
                          </select>
                          {errors.gender && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.gender}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Marital Status*
                          </label>
                          <select
                            name="maritalStatus"
                            value={formData.maritalStatus}
                            onChange={handleInputChange}
                            className={`border ${
                              errors.maritalStatus
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md outline-none text-gray-500 px-3 py-2 w-[100%]`}
                          >
                            <option value="">Select Status</option>
                            <option value="04">SEPARATED</option>
                            <option value="01">MARRIED</option>
                            <option value="02">SINGLE</option>
                            <option value="03">DIVORCED</option>
                            <option value="05">WIDOW</option>
                          </select>
                          {errors.maritalStatus && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.maritalStatus}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Experience*
                          </label>
                          <input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            min={0}
                            className={`border ${
                              errors.experience
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md outline-none text-gray-500 px-3 py-2 w-[45%]`}
                          />
                          {errors.experience && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.experience}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Address*
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={`border ${
                            errors.address
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md outline-none text-gray-500 px-3 py-2 w-[45%]`}
                        />
                        {errors.address && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.address}
                          </p>
                        )}
                      </div>

                      {/* City, Province, Postal Code */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[80%]">
                        <div className="w-[80%]">
                          <label className="block text-sm font-medium mb-1">
                            City*
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={`border ${
                              errors.city ? "border-red-500" : "border-gray-300"
                            } rounded-md outline-none text-gray-500 px-3 py-2 w-full`}
                          />
                          {errors.city && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.city}
                            </p>
                          )}
                        </div>
                        <div className="w-[80%]">
                          <label className="block text-sm font-medium mb-1">
                            Province*
                          </label>
                          <input
                            type="text"
                            name="province"
                            value={formData.province}
                            onChange={handleInputChange}
                            className={`border ${
                              errors.province
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md outline-none text-gray-500 px-3 py-2 w-full`}
                          />
                          {errors.province && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.province}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Postal Code*
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className={`border ${
                              errors.postalCode
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md outline-none text-gray-500 px-3 py-2 w-[50%]`}
                          />
                          {errors.postalCode && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.postalCode}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Country */}
                      <div className="w-[45%]">
                        <label className="block text-sm font-medium mb-1">
                          Country*
                        </label>
                        <Select
                          value={selectedCountry}
                          onChange={setSelectedCountry}
                          options={countryOptions}
                          className="text-sm"
                          classNamePrefix="react-select"
                        />
                      </div>

                      {/* Education and Employment Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[100%]">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Highest Education*
                          </label>
                          <input
                            type="text"
                            name="highestEducation"
                            value={formData.highestEducation}
                            onChange={handleInputChange}
                            className={`border ${
                              errors.highestEducation
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md outline-none text-gray-500 px-3 py-2 w-full`}
                          />
                          {errors.highestEducation && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.highestEducation}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Current Employer*
                          </label>
                          <input
                            type="text"
                            name="currentEmployer"
                            value={formData.currentEmployer}
                            onChange={handleInputChange}
                            className={`border ${
                              errors.currentEmployer
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md outline-none text-gray-500 px-3 py-2 w-full`}
                          />
                          {errors.currentEmployer && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.currentEmployer}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Current Designation*
                          </label>
                          <input
                            type="text"
                            name="currentDesignation"
                            value={formData.currentDesignation}
                            onChange={handleInputChange}
                            className={`border ${
                              errors.currentDesignation
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md outline-none text-gray-500 px-3 py-2 w-full`}
                          />
                          {errors.currentDesignation && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.currentDesignation}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Current Salary*
                          </label>
                          <input
                            type="text"
                            name="currentSalary"
                            value={formData.currentSalary}
                            onChange={handleInputChange}
                            className={`border ${
                              errors.currentSalary
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md outline-none text-gray-500 px-3 py-2 w-full`}
                          />
                          {errors.currentSalary && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.currentSalary}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Expected Salary*
                          </label>
                          <input
                            type="text"
                            name="expectedSalary"
                            value={formData.expectedSalary}
                            onChange={handleInputChange}
                            className={`border ${
                              errors.expectedSalary
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md outline-none text-gray-500 px-3 py-2 w-full`}
                          />
                          {errors.expectedSalary && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors.expectedSalary}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* File Upload - ENHANCED */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Upload Resume* 
                          <span className="text-xs text-gray-500 ml-2">
                            (PDF, DOC, DOCX only - Max 5MB)
                          </span>
                        </label>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          className="w-[45%] border border-gray-300 rounded-md outline-none text-gray-500 px-3 py-2"
                        />
                        {resumeFile && (
                          <div className="mt-2 text-sm text-green-600">
                            Selected: {resumeFile.name} ({(resumeFile.size / 1024 / 1024).toFixed(2)} MB)
                          </div>
                        )}
                        {errors.resumeFile && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.resumeFile}
                          </p>
                        )}
                      </div>

                      {/* Notice Period */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Notice Period in Days*
                        </label>
                        
                          <input
                            type="number"
                            value={availableFrom}
                            onChange={(e) => setAvailableFrom(e.target.value)}
                            min={0}
                            className="w-[45%] border border-gray-300 rounded-md outline-none text-gray-500 px-3 py-2"
                          />
                        
                        {errors.availableFrom && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.availableFrom}
                          </p>
                        )}
                      </div>

                      {/* Reference (Optional) */}
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Any Reference in Azgard 9?*
                        </label>
                        <div className="flex gap-4 mb-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="hasReference"
                              value="yes"
                              checked={hasReference}
                              onChange={() => handleReferenceChange("yes")}
                              className="mr-2"
                            />
                            Yes
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="hasReference"
                              value="no"
                              checked={!hasReference}
                              onChange={() => handleReferenceChange("no")}
                              className="mr-2"
                            />
                            No
                          </label>
                        </div>

                        {/* Conditionally show reference fields */}
                        {hasReference && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Reference Name*
                              </label>
                              <input
                                type="text"
                                name="referenceName"
                                value={referenceFields.referenceName}
                                onChange={handleReferenceInputChange}
                                className={`border ${
                                  errors.referenceName
                                    ? "border-red-500"
                                    : "border-gray-300"
                                } rounded-md outline-none text-gray-500 px-3 py-2 w-full`}
                              />
                              {errors.referenceName && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.referenceName}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Reference Designation*
                              </label>
                              <input
                                type="text"
                                name="referenceDesignation"
                                value={referenceFields.referenceDesignation}
                                onChange={handleReferenceInputChange}
                                className={`border ${
                                  errors.referenceDesignation
                                    ? "border-red-500"
                                    : "border-gray-300"
                                } rounded-md outline-none text-gray-500 px-3 py-2 w-full`}
                              />
                              {errors.referenceDesignation && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.referenceDesignation}
                                </p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Reference Department*
                              </label>
                              <input
                                type="text"
                                name="referenceDepartment"
                                value={referenceFields.referenceDepartment}
                                onChange={handleReferenceInputChange}
                                className={`border ${
                                  errors.referenceDepartment
                                    ? "border-red-500"
                                    : "border-gray-300"
                                } rounded-md outline-none text-gray-500 px-3 py-2 w-full`}
                              />
                              {errors.referenceDepartment && (
                                <p className="text-red-500 text-xs mt-1">
                                  {errors.referenceDepartment}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </form>
                  )}
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
                  onClick={() => setShowForm(false)}
                >
                  <IoIosArrowBack size={22} />
                  View Job Description
                </button>
              ) : (
                <button
                  className="cursor-pointer w-full bg-green-700 text-white text-lg py-3 rounded-full font-medium hover:bg-green-800 transition mb-6"
                  onClick={() => setShowForm(true)}
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
                  value={`https://azgard-job.vercel.app${location.pathname}`}
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
            <div className="bg-white rounded-xl p-6 flex flex-col justify-between mt-6">
              <div>
                <h1 className="text-gray-500 text-sm">Location</h1>
                <p className="text-gray-700 text-md font-semibold">
                  {jobDetail[0]?.LOCATION} ({jobDetail[0]?.JOB_TYPE})
                </p>
                <hr className="my-2 border-gray-300" />
              </div>
              <div>
                <h1 className="text-gray-500 text-sm">Employment Type</h1>
                <p className="text-gray-700 text-md font-semibold">
                  {jobDetail[0]?.EMPLOYEMENT_TYPE}
                </p>
                <hr className="my-2 border-gray-300" />
              </div>
              <div>
                <h1 className="text-gray-500 text-sm">Minimum Experience</h1>
                <p className="text-gray-700 text-md font-semibold">
                  {jobDetail[0]?.SENIORITY}
                </p>
                <hr className="my-2 border-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showForm && !submitted ? (
        <div className="fotter px-8 w-full h-[100px] bg-[#38312f] rounded-bl-2xl rounded-br-2xl flex items-center justify-between">
          <div className="flex gap-4">
            <button
              className={`flex px-6 py-3 rounded-full border gap-2 font-medium text-lg justify-center items-center ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed border-gray-400 text-gray-600"
                  : "bg-white hover:bg-[#f4fef1] cursor-pointer border-green-700 text-green-700"
              }`}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              <MdOutlineCheckCircleOutline size={22} />
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
            <button
              className={`text-lg font-semibold ${
                isSubmitting
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-white underline"
              }`}
              onClick={() => !isSubmitting && setShowForm(false)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="fotter px-36 pb-4 w-full rounded-bl-2xl rounded-br-2xl flex items-center justify-between">
          <div className="flex gap-4 text-gray-600">
            <span className="hover:underline cursor-pointer">
              Privacy Policy •
            </span>
            <span className="hover:underline cursor-pointer">
              Terms of Service •
            </span>
            <span>© Azgard9 All rights reserved.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
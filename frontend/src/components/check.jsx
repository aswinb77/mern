import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Check = () => {
  const [file, setFile] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [showResultModal, setShowResultModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    "https://img.icons8.com/dusk/64/000000/file.png"
  );
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Check both Redux store and localStorage for token
    const localToken = localStorage.getItem("token");
    if (!token && !localToken) {
      navigate("/login");
    }
  }, [navigate, token]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-user-information`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setUserData(response.data.user);
      setIsLoading(false);
    } catch (error) {
      console.error(
        "Error fetching user details:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      fetchUserDetails();
    } else {
      setIsLoading(false);
    }
  }, [token]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setImagePreview("✅ " + selectedFile.name);
    } else {
      alert("Invalid file type. Only PDFs are allowed.");
      setFile(null);
      setImagePreview("https://img.icons8.com/dusk/64/000000/file.png");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (isLoading) {
      alert("User data is still loading. Please wait.");
      return;
    }

    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    if (!userData?.username) {
      alert("User data is not available. Please try again.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("username", userData.username);

    try {
      setIsUploading(true);
      setUploadStatus("Uploading...");

      const response = await axios.post(
        "http://localhost:1000/api/v1/upload-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        }
      );

      setUploadStatus("Upload successful!");
      setResult(response.data.data); // Changed to match backend response structure
      setIsUploading(false);
      setIsAnalyzing(true);

      setTimeout(() => {
        setIsAnalyzing(false);
        setShowResultModal(true);
      }, 2000);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus(
        `Failed to upload PDF: ${
          error.response?.data?.message || error.message
        }`
      );
      setIsUploading(false);
    }
  };

  // Helper functions for quality display
  const getQualityColorClass = (status) => {
    switch (status) {
      case "Good":
        return "bg-green-600";
      case "Average":
        return "bg-yellow-500";
      case "Bad":
        return "bg-red-500";
      default:
        return "bg-blue-600";
    }
  };

  const getQualityBgClass = (status) => {
    switch (status) {
      case "Good":
        return "bg-green-50";
      case "Average":
        return "bg-yellow-50";
      case "Bad":
        return "bg-red-50";
      default:
        return "bg-blue-50";
    }
  };

  const getQualityIcon = (status) => {
    switch (status) {
      case "Good":
        return "👍";
      case "Average":
        return "👌";
      case "Bad":
        return "👎";
      default:
        return "ℹ️";
    }
  };

  const getQualityDescription = (status) => {
    switch (status) {
      case "Good":
        return "Excellent quality with premium pricing potential";
      case "Average":
        return "Standard quality with fair market value";
      case "Bad":
        return "Below average quality, consider re-processing";
      default:
        return "Quality assessment completed";
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <a href="#" className="flex ms-2 md:me-24">
                <span className="self-center text-xl font-semibold">
                  LatexQ
                </span>
                {userData && (
                  <div className="text-gray-900 font-medium ml-2">
                    {userData.username}
                  </div>
                )}
              </a>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <Link
                to="/check"
                className="flex items-center p-2 text-gray-900 rounded-lg bg-gray-100"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Check Quality
                </span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                  free
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/market"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Marketplace
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                  3
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/order"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Orders & Transactions
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="flex items-center p-2 text-gray-900 rounded-lg"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Help & Support
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 mt-16">
        <div className="flex-grow flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Upload Lab Report
            </h2>
            <p className="text-gray-600 mb-6">
              Please upload your lab report in PDF format. Max size:{" "}
              <span className="font-medium">5MB</span>.
            </p>

            <div className="bg-blue-50 p-3 rounded-md mb-6 border-l-2 border-blue-400">
              <h3 className="text-blue-700 font-medium text-sm">
                Instructions
              </h3>
              <ul className="text-gray-600 text-sm mt-1 space-y-1">
                <li>
                  File size: <span className="font-medium">Max 5MB</span>
                </li>
                <li>
                  Formats: <span className="font-medium">PDF only</span>
                </li>
                <li>Submit after selecting your file</li>
              </ul>
            </div>

            <form onSubmit={handleUpload} className="space-y-6">
              <div className="relative border-2 border-dashed border-blue-500 rounded-lg bg-gray-50 hover:bg-gray-100 transition p-6">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center h-full">
                  {file ? (
                    <div className="text-green-500 font-bold">
                      {imagePreview}
                    </div>
                  ) : (
                    <img
                      src={imagePreview}
                      alt="File Icon"
                      className="w-16 h-16 mb-4"
                    />
                  )}
                  <p className="text-gray-600">Drag & drop your file here</p>
                  <p className="text-gray-400">or click to select a file</p>
                </div>
              </div>

              {isUploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                  <p className="text-sm mt-1 text-gray-700">
                    {progress}% uploaded
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  disabled={isUploading || isAnalyzing}
                  className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition ${
                    isUploading || isAnalyzing
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isUploading ? "Uploading..." : "Submit Report"}
                </button>
              </div>
            </form>

            {isAnalyzing && (
              <div className="text-lg text-blue-600 mt-4">
                🔍 Analyzing PDF...
              </div>
            )}

            {uploadStatus && !showResultModal && (
              <p className="text-lg font-semibold mt-4">{uploadStatus}</p>
            )}
          </div>
        </div>
      </div>

      {/* Premium Result Modal */}
      {showResultModal && result && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md">
            <div
              className={`p-6 ${getQualityColorClass(result.qualityStatus)}`}
            >
              <h2 className="text-2xl font-bold text-white">
                Quality Analysis Results
              </h2>
              <div className="flex items-center mt-2">
                <span className="text-white bg-black bg-opacity-30 px-2 py-1 rounded-full text-sm">
                  {result.sampleId}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Quality Score</p>
                  <p className="text-3xl font-bold">
                    {result.parameters.qualityScore}
                    <span className="text-sm text-gray-500">/100</span>
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm">Latex %</p>
                  <p className="text-3xl font-bold">
                    {result.parameters.latexPercentage}%
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-700">Suggested Price</span>
                  <span className="font-bold text-lg">
                    {result.suggestedPrice}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getQualityColorClass(
                      result.qualityStatus
                    )}`}
                    style={{ width: `${result.parameters.qualityScore}%` }}
                  ></div>
                </div>
              </div>

              <div
                className={`p-4 rounded-lg ${getQualityBgClass(
                  result.qualityStatus
                )}`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">
                    {getQualityIcon(result.qualityStatus)}
                  </span>
                  <div>
                    <h3 className="font-bold">
                      {result.qualityStatus} Quality
                    </h3>
                    <p className="text-sm">
                      {getQualityDescription(result.qualityStatus)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                onClick={() => setShowResultModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Check;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, token, userId: id, role } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reportCount, setReportCount] = useState(0);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-user-information`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setUserData(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error(
        "Error fetching user details:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-order/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response?.data || error.message
      );
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-products`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response?.data || error.message
      );
    }
  };

  const fetchLatestPdf = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-latest-pdf?username=${encodeURIComponent(
          username
        )}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      setPdfData(response.data.pdf);
      setReportCount(response.data.totalCount || 0);
    } catch (err) {
      console.error("Failed to fetch PDF data:", err);
      setError("Failed to load PDF data");
      setReportCount(0);
    }
  };

  useEffect(() => {
    if (token) {
      const fetchAllData = async () => {
        setLoading(true);
        try {
          // First get user details to have the username
          const user = await fetchUserDetails();

          // Then fetch all other data including PDF
          await Promise.all([
            fetchOrders(),
            fetchProducts(),
            user?.username && fetchLatestPdf(user.username),
          ]);
        } catch (error) {
          console.error("Error loading dashboard data:", error);
          setError("Failed to load dashboard data");
        } finally {
          setLoading(false);
        }
      };

      fetchAllData();
    }
  }, [token, role]);

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <div className="p-4">Loading dashboard...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <>
      <body className="bg-gray-100">
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start rtl:justify-end">
                <a href="#" className="flex ms-2 md:me-24">
                  <span className="self-center text-xl font-semibold">
                    LatexQ
                  </span>
                </a>
              </div>

              <div className="flex items-center">
                <div className="flex items-center ms-3">
                  {userData && (
                    <div className="text-gray-900 font-medium">
                      {userData.username}
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-4"
                  >
                    Logout
                  </button>
                </div>
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
                  className="flex items-center p-2 text-gray-900 rounded-lg bg-gray-100"
                >
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>
              <li>
                <Link
                  to="/check"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
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
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Help & Support
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-14">
            <h1 className="text-2xl font-bold mb-6">
              Welcome {userData?.username || ""}
            </h1>

            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* Reports Card */}
              <div className="flex flex-col items-center justify-center h-32 rounded-xl bg-gradient-to-br from-blue-100 to-blue-300 shadow-lg hover:shadow-xl transition-all duration-300">
                <p className="text-lg font-semibold text-gray-800">Reports</p>
                <p className="text-3xl font-bold text-blue-600">
                  {reportCount}
                </p>
              </div>

              {/* PDF Data Cards */}
              {pdfData ? (
                <>
                  <div className="flex flex-col items-center justify-center h-32 rounded-xl bg-gradient-to-br from-green-100 to-green-300 shadow-lg hover:shadow-xl transition-all duration-300">
                    <p className="text-lg font-semibold text-gray-800">
                      Quality Score
                    </p>
                    <p className="text-3xl font-bold text-green-700">
                      {pdfData.parameters?.qualityScore || "N/A"}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center h-32 rounded-xl bg-gradient-to-br from-yellow-100 to-yellow-300 shadow-lg hover:shadow-xl transition-all duration-300">
                    <p className="text-lg font-semibold text-gray-800">
                      Suggested Price
                    </p>
                    <p className="text-3xl font-bold text-yellow-700">
                      {pdfData.suggestedPrice
                        ? pdfData.suggestedPrice.split(" per")[0]
                        : "N/A"}
                    </p>
                  </div>
                </>
              ) : (
                <div className="col-span-2 flex items-center justify-center h-32 rounded-xl bg-gray-100">
                  <p className="text-gray-500">No PDF data available</p>
                </div>
              )}
            </div>
          </div>
          <br />

          <section className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="flex flex-col gap-2 text-xs">
              {/* Success Alert 1 */}
              <div className="success-alert cursor-default flex items-center justify-between w-full h-14 rounded-lg bg-white border border-gray-200 px-[10px]">
                <div className="flex gap-2">
                  <div className="text-[#2b9875] bg-green-100 p-1 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">
                      Order #LATX-00123 Shipped
                    </p>
                    <p className="text-gray-500">Mar 27, 2025, 10:30 AM</p>
                  </div>
                </div>
                <button className="text-gray-600 hover:bg-gray-100 p-1 rounded-md transition-colors ease-linear">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Success Alert 2 */}
              <div className="success-alert cursor-default flex items-center justify-between w-full h-14 rounded-lg bg-white border border-gray-200 px-[10px]">
                <div className="flex gap-2">
                  <div className="text-[#2b9875] bg-green-100 p-1 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">
                      New Listing Added: Latex Sheets
                    </p>
                    <p className="text-gray-500">Mar 26, 2025, 3:15 PM</p>
                  </div>
                </div>
                <button className="text-gray-600 hover:bg-gray-100 p-1 rounded-md transition-colors ease-linear">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Error Alert */}
              <div className="error-alert cursor-default flex items-center justify-between w-full h-14 rounded-lg bg-white border border-gray-200 px-[10px]">
                <div className="flex gap-2">
                  <div className="text-[#d65563] bg-red-100 p-1 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">
                      Payment Failed for #LATX-00124
                    </p>
                    <p className="text-gray-500">
                      Mar 25, 2025, 9:45 AM - Please try again
                    </p>
                  </div>
                </div>
                <button className="text-gray-600 hover:bg-gray-100 p-1 rounded-md transition-colors ease-linear">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </section>
          <br />
          <section className="container mx-auto rounded p-6 bg-blue-100">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Sell Your Rubber Latex
              </h2>
              <p className="mb-4">
                Join our marketplace and reach thousands of buyers
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                Start Selling
              </button>
            </div>
          </section>
          <br />

          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Premium Suppliers Nearby
              </h3>
              <button
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                onClick={() => alert("Showing all premium suppliers!")}
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Supplier Card 1 */}
              <div
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => {
                  // Example action - could be replaced with router navigation
                  document
                    .getElementById("supplier-detail-1")
                    .classList.toggle("hidden");
                }}
              >
                <div className="p-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                      Latex Co.
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Latex Co. Ltd
                      </h4>
                      <div className="flex items-center mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-sm text-gray-500 ml-1">
                          2.3 miles away
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Specialties
                    </h5>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 transition-all hover:bg-blue-200">
                        Premium Latex
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 transition-all hover:bg-green-200">
                        Organic Certified
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 transition-all hover:bg-purple-200">
                        Bulk Supply
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-200">
                    <div className="flex justify-between space-x-3">
                      <button
                        className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Contacting Latex Co. Ltd");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Contact
                      </button>
                      <button
                        className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Viewing Latex Co. Ltd products");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        View
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hidden details that appear on click */}
                <div
                  id="supplier-detail-1"
                  className="hidden p-5 pt-0 border-t border-gray-100 bg-blue-50 rounded-b-xl animate-fadeIn"
                >
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-start">
                      <svg
                        className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Minimum order: 100kg</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>ISO 9001 Certified</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>24/7 customer support</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Supplier Card 2 */}
              <div
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => {
                  // Example action - could be replaced with router navigation
                  document
                    .getElementById("supplier-detail-2")
                    .classList.toggle("hidden");
                }}
              >
                <div className="p-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                      EcoLatex
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Eco Latex Solutions
                      </h4>
                      <div className="flex items-center mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-sm text-gray-500 ml-1">
                          5.1 miles away
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Specialties
                    </h5>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 transition-all hover:bg-green-200">
                        Sustainable
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 transition-all hover:bg-yellow-200">
                        Custom Blends
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-200">
                    <div className="flex justify-between space-x-3">
                      <button
                        className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Contacting Eco Latex Solutions");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Contact
                      </button>
                      <button
                        className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Viewing Eco Latex Solutions products");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        View
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hidden details that appear on click */}
                <div
                  id="supplier-detail-2"
                  className="hidden p-5 pt-0 border-t border-gray-100 bg-green-50 rounded-b-xl animate-fadeIn"
                >
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-start">
                      <svg
                        className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Eco-friendly packaging</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Carbon neutral shipping</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Sample kits available</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Supplier Card 3 */}
              <div
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                onClick={() => {
                  // Example action - could be replaced with router navigation
                  document
                    .getElementById("supplier-detail-3")
                    .classList.toggle("hidden");
                }}
              >
                <div className="p-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                      PureLatex
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Pure Latex Inc.
                      </h4>
                      <div className="flex items-center mt-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-sm text-gray-500 ml-1">
                          8.7 miles away
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Specialties
                    </h5>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 transition-all hover:bg-purple-200">
                        Medical Grade
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 transition-all hover:bg-blue-200">
                        High Purity
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 transition-all hover:bg-green-200">
                        Fast Delivery
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-200">
                    <div className="flex justify-between space-x-3">
                      <button
                        className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Contacting Pure Latex Inc.");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Contact
                      </button>
                      <button
                        className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Viewing Pure Latex Inc. products");
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        View
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hidden details that appear on click */}
                <div
                  id="supplier-detail-3"
                  className="hidden p-5 pt-0 border-t border-gray-100 bg-purple-50 rounded-b-xl animate-fadeIn"
                >
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-start">
                      <svg
                        className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>FDA approved materials</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Same-day shipping available</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Technical support included</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </body>
    </>
  );
};

export default Dashboard;

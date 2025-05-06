import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Order = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  // Function to toggle the expanded state
  const handleExpandClick = (orderId) => {
    setIsExpanded(!isExpanded);
    setActiveOrder(orderId);
  };

  return (
    <>
      <body className="bg-gray-50">
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
                {/* Navigation content remains unchanged */}
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
                  className="flex items-center p-2 text-gray-900 rounded-lg bg-gray-100"
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
          <br></br>
          <br></br>

          {/* Premium Header Section */}
          <div className="p-6 rounded-xl mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">
                  Order Management
                </h1>
                <p className="text-indigo-600 font-medium">
                  Track and manage all your transactions
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
                    placeholder="Search orders..."
                  />
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                  New Order
                </button>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-5 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex space-x-4 w-full md:w-auto">
                <select className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5">
                  <option>All Statuses</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
                <div className="relative w-full md:w-auto">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="date"
                    className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4 w-full md:w-auto">
                <button className="text-gray-500 hover:text-indigo-600 text-sm font-medium flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    ></path>
                  </svg>
                  Filters
                </button>
                <button className="text-gray-500 hover:text-indigo-600 text-sm font-medium flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    ></path>
                  </svg>
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {/* Order Card 1 - Delivered */}
            <div
              className={`relative overflow-hidden transition-all duration-300 ${
                activeOrder === 1 ? "mb-6" : ""
              }`}
            >
              <button
                className={`group relative w-full overflow-hidden transition-all duration-500 ${
                  activeOrder === 1
                    ? "rounded-t-xl"
                    : "rounded-xl hover:shadow-xl"
                }`}
                onClick={() => handleExpandClick(1)}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/30 to-teal-100/30 opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>

                {/* Animated Border Gradient */}
                <div className="absolute inset-0 p-px">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-300 opacity-0 transition-opacity duration-500 group-hover:opacity-30"></div>
                </div>

                {/* Main Content */}
                <div
                  className={`relative z-10 flex w-full items-center gap-4 bg-white/90 backdrop-blur-sm p-6 border border-gray-100/80 transition-all duration-300 group-hover:bg-white group-hover:border-emerald-100 group-hover:shadow-[0_4px_24px_rgba(16,185,129,0.1)] ${
                    activeOrder === 1 ? "border-b-0 rounded-t-xl" : "rounded-xl"
                  }`}
                >
                  {/* Order ID Badge */}
                  <div className="flex items-center gap-3 rounded-lg bg-gradient-to-br from-white to-gray-50 px-4 py-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] border border-gray-100/60">
                    <div className="relative">
                      {/* Icon Halo */}
                      <div className="absolute inset-0 rounded-full bg-emerald-400/10 blur-md transition-all duration-500 group-hover:bg-emerald-400/20"></div>
                      {/* Icon */}
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-white to-gray-50 shadow-sm">
                        <svg
                          className="h-5 w-5 text-emerald-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-gray-900 tracking-tight">
                        #LNX-1023
                      </span>
                      <span className="text-[11px] font-medium text-gray-500/90 tracking-wider">
                        ORDER ID
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 pl-2">
                    <p className="text-sm font-semibold text-gray-800 tracking-tight">
                      Premium Latex A - Grade AAA
                    </p>
                    <p className="text-xs text-gray-500/90 mt-1 flex items-center gap-1">
                      <svg
                        className="h-3 w-3 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        25 October 2024 •{" "}
                        <span className="font-medium text-gray-600">
                          08:15 AM
                        </span>
                      </span>
                    </p>
                  </div>

                  {/* Price */}
                  <div className="hidden md:block px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-sm font-medium text-gray-500">Total</p>
                    <p className="text-lg font-bold text-gray-900">$2,450.00</p>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 rounded-full bg-emerald-50/80 px-3 py-1.5 pr-4 border border-emerald-100/60">
                    <div className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                    </div>
                    <span className="text-xs font-semibold tracking-wide text-emerald-700">
                      DELIVERED
                    </span>
                    <svg
                      className="h-4 w-4 text-emerald-500 ml-1 transform transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {/* Chevron Icon */}
                  <svg
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                      activeOrder === 1 ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Expanded Order Details */}
              {activeOrder === 1 && (
                <div className="relative bg-white border border-t-0 border-gray-100 rounded-b-xl p-6 shadow-lg">
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Summary */}
                    <div className="lg:col-span-2">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">
                        Order Summary
                      </h4>

                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">
                              Order Date
                            </p>
                            <p className="text-sm font-semibold text-gray-800">
                              Oct 25, 2024
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">
                              Order Total
                            </p>
                            <p className="text-sm font-semibold text-gray-800">
                              $2,450.00
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">
                              Payment Method
                            </p>
                            <p className="text-sm font-semibold text-gray-800">
                              Credit Card
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100">
                          <div className="flex items-center">
                            <div className="bg-emerald-100 rounded-lg p-2 mr-3">
                              <svg
                                className="w-5 h-5 text-emerald-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                Order Delivered
                              </p>
                              <p className="text-xs text-gray-500">
                                Delivered on Oct 30, 2024
                              </p>
                            </div>
                          </div>
                          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                            Track Package
                          </button>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                          <h5 className="text-sm font-semibold text-gray-700">
                            PRODUCT DETAILS
                          </h5>
                        </div>
                        <div className="p-4">
                          <div className="flex items-start">
                            <div className="bg-gray-100 rounded-lg p-3 mr-4">
                              <svg
                                className="w-6 h-6 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                ></path>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h6 className="text-sm font-bold text-gray-800">
                                Premium Latex A - Grade AAA
                              </h6>
                              <p className="text-xs text-gray-500 mb-2">
                                SKU: LNX-PREM-AAA-2024
                              </p>
                              <div className="flex items-center space-x-4">
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Quantity
                                  </p>
                                  <p className="text-sm font-semibold text-gray-800">
                                    2.5 Metric Tons
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Unit Price
                                  </p>
                                  <p className="text-sm font-semibold text-gray-800">
                                    $980.00/ton
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-500">
                                Total
                              </p>
                              <p className="text-lg font-bold text-gray-800">
                                $2,450.00
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Shipping & Actions */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-4">
                        Shipping Information
                      </h4>

                      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                          <h5 className="text-sm font-semibold text-gray-700">
                            SHIPPING ADDRESS
                          </h5>
                        </div>
                        <div className="p-4">
                          <p className="text-sm font-semibold text-gray-800 mb-1">
                            RubberTech Industries
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            123 Industrial Park, Suite 45
                          </p>
                          <p className="text-sm text-gray-600">
                            Kochi, Kerala 682024
                          </p>
                          <p className="text-sm text-gray-600">India</p>

                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm font-semibold text-gray-800 mb-1">
                              Contact Information
                            </p>
                            <p className="text-sm text-gray-600">John Doe</p>
                            <p className="text-sm text-gray-600">
                              john.doe@rubbertech.com
                            </p>
                            <p className="text-sm text-gray-600">
                              +91 98765 43210
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                          <h5 className="text-sm font-semibold text-gray-700">
                            ORDER ACTIONS
                          </h5>
                        </div>
                        <div className="p-4 space-y-3">
                          <button className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50">
                            <span>View Invoice</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              ></path>
                            </svg>
                          </button>
                          <button className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50">
                            <span>Print Shipping Label</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                              ></path>
                            </svg>
                          </button>
                          <button className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50">
                            <span>Request Return</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                              ></path>
                            </svg>
                          </button>
                          <button className="w-full flex items-center justify-between text-sm font-medium text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50">
                            <span>Report Problem</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Card 2 - Pending */}
            <div
              className={`relative overflow-hidden transition-all duration-300 ${
                activeOrder === 2 ? "mb-6" : ""
              }`}
            >
              <button
                className={`group relative w-full overflow-hidden transition-all duration-500 ${
                  activeOrder === 2
                    ? "rounded-t-xl"
                    : "rounded-xl hover:shadow-xl"
                }`}
                onClick={() => handleExpandClick(2)}
              >
                {/* Golden Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/30 to-amber-100/30 opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>

                {/* Animated Border Gradient */}
                <div className="absolute inset-0 p-px">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-amber-300 opacity-0 transition-opacity duration-500 group-hover:opacity-30"></div>
                </div>

                {/* Main Content */}
                <div
                  className={`relative z-10 flex w-full items-center gap-4 bg-white/90 backdrop-blur-sm p-6 border border-gray-100/80 transition-all duration-300 group-hover:bg-white group-hover:border-yellow-100 group-hover:shadow-[0_4px_24px_rgba(234,179,8,0.1)] ${
                    activeOrder === 2 ? "border-b-0 rounded-t-xl" : "rounded-xl"
                  }`}
                >
                  {/* Order ID Badge */}
                  <div className="flex items-center gap-3 rounded-lg bg-gradient-to-br from-white to-gray-50 px-4 py-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] border border-gray-100/60">
                    <div className="relative">
                      {/* Golden Halo Effect */}
                      <div className="absolute inset-0 rounded-full bg-yellow-400/10 blur-md transition-all duration-500 group-hover:bg-yellow-400/20"></div>
                      {/* Icon Container */}
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-white to-gray-50 shadow-sm">
                        <svg
                          className="h-5 w-5 text-yellow-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-gray-900 tracking-tight">
                        #LNX-1024
                      </span>
                      <span className="text-[11px] font-medium text-gray-500/90 tracking-wider">
                        ORDER ID
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 pl-2">
                    <p className="text-sm font-semibold text-gray-800 tracking-tight">
                      Standard Latex B - Grade A
                    </p>
                    <p className="text-xs text-gray-500/90 mt-1 flex items-center gap-1">
                      <svg
                        className="h-3 w-3 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        26 October 2025 •{" "}
                        <span className="font-medium text-gray-600">
                          05:45 PM
                        </span>
                      </span>
                    </p>
                  </div>

                  {/* Price */}
                  <div className="hidden md:block px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-sm font-medium text-gray-500">Total</p>
                    <p className="text-lg font-bold text-gray-900">$1,850.00</p>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 rounded-full bg-yellow-50/80 px-3 py-1.5 pr-4 border border-yellow-100/60">
                    <div className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-500/80"></span>
                    </div>
                    <span className="text-xs font-semibold tracking-wide text-yellow-700">
                      PENDING
                    </span>
                    <svg
                      className="h-4 w-4 text-yellow-500 ml-1 transform transition-transform duration-300 group-hover:rotate-12"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {/* Chevron Icon */}
                  <svg
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                      activeOrder === 2 ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Expanded Order Details */}
              {activeOrder === 2 && (
                <div className="relative bg-white border border-t-0 border-gray-100 rounded-b-xl p-6 shadow-lg">
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent"></div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Summary */}
                    <div className="lg:col-span-2">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">
                        Order Summary
                      </h4>

                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">
                              Order Date
                            </p>
                            <p className="text-sm font-semibold text-gray-800">
                              Oct 26, 2025
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">
                              Order Total
                            </p>
                            <p className="text-sm font-semibold text-gray-800">
                              $1,850.00
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">
                              Payment Method
                            </p>
                            <p className="text-sm font-semibold text-gray-800">
                              Bank Transfer
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100">
                          <div className="flex items-center">
                            <div className="bg-yellow-100 rounded-lg p-2 mr-3">
                              <svg
                                className="w-5 h-5 text-yellow-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                Payment Pending
                              </p>
                              <p className="text-xs text-gray-500">
                                Awaiting bank transfer confirmation
                              </p>
                            </div>
                          </div>
                          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                            View Invoice
                          </button>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                          <h5 className="text-sm font-semibold text-gray-700">
                            PRODUCT DETAILS
                          </h5>
                        </div>
                        <div className="p-4">
                          <div className="flex items-start">
                            <div className="bg-gray-100 rounded-lg p-3 mr-4">
                              <svg
                                className="w-6 h-6 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                ></path>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h6 className="text-sm font-bold text-gray-800">
                                Standard Latex B - Grade A
                              </h6>
                              <p className="text-xs text-gray-500 mb-2">
                                SKU: LNX-STD-A-2025
                              </p>
                              <div className="flex items-center space-x-4">
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Quantity
                                  </p>
                                  <p className="text-sm font-semibold text-gray-800">
                                    2.0 Metric Tons
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Unit Price
                                  </p>
                                  <p className="text-sm font-semibold text-gray-800">
                                    $925.00/ton
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-500">
                                Total
                              </p>
                              <p className="text-lg font-bold text-gray-800">
                                $1,850.00
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Shipping & Actions */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-4">
                        Order Actions
                      </h4>

                      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                          <h5 className="text-sm font-semibold text-gray-700">
                            PAYMENT DETAILS
                          </h5>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-gray-600 mb-4">
                            Please complete your payment to process the order.
                            Bank details are provided in the invoice.
                          </p>

                          <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100 mb-4">
                            <div className="flex items-start">
                              <svg
                                className="w-5 h-5 text-yellow-600 mt-0.5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                ></path>
                              </svg>
                              <p className="text-sm text-yellow-700">
                                Payment must be completed within 3 business days
                                or order will be automatically cancelled.
                              </p>
                            </div>
                          </div>

                          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300">
                            Pay Now
                          </button>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                          <h5 className="text-sm font-semibold text-gray-700">
                            ORDER ACTIONS
                          </h5>
                        </div>
                        <div className="p-4 space-y-3">
                          <button className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50">
                            <span>View Invoice</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              ></path>
                            </svg>
                          </button>
                          <button className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50">
                            <span>Contact Support</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              ></path>
                            </svg>
                          </button>
                          <button className="w-full flex items-center justify-between text-sm font-medium text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50">
                            <span>Cancel Order</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Card 3 - Cancelled */}
            <div
              className={`relative overflow-hidden transition-all duration-300 ${
                activeOrder === 3 ? "mb-6" : ""
              }`}
            >
              <button
                className={`group relative w-full overflow-hidden transition-all duration-500 ${
                  activeOrder === 3
                    ? "rounded-t-xl"
                    : "rounded-xl hover:shadow-xl"
                }`}
                onClick={() => handleExpandClick(3)}
              >
                {/* Red Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-100/20 to-rose-100/20 opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>

                {/* Animated Border Gradient */}
                <div className="absolute inset-0 p-px">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-rose-300 opacity-0 transition-opacity duration-500 group-hover:opacity-20"></div>
                </div>

                {/* Main Content */}
                <div
                  className={`relative z-10 flex w-full items-center gap-4 bg-white/90 backdrop-blur-sm p-6 border border-gray-100/80 transition-all duration-300 group-hover:bg-white group-hover:border-red-100 group-hover:shadow-[0_4px_24px_rgba(244,63,94,0.1)] ${
                    activeOrder === 3 ? "border-b-0 rounded-t-xl" : "rounded-xl"
                  }`}
                >
                  {/* Order ID Badge */}
                  <div className="flex items-center gap-3 rounded-lg bg-gradient-to-br from-white to-gray-50 px-4 py-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] border border-gray-100/60">
                    <div className="relative">
                      {/* Red Halo Effect */}
                      <div className="absolute inset-0 rounded-full bg-red-400/10 blur-md transition-all duration-500 group-hover:bg-red-400/15"></div>
                      {/* Icon Container */}
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-white to-gray-50 shadow-sm">
                        <svg
                          className="h-5 w-5 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-gray-900 tracking-tight">
                        #LNX-1025
                      </span>
                      <span className="text-[11px] font-medium text-gray-500/90 tracking-wider">
                        ORDER ID
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 pl-2">
                    <p className="text-sm font-semibold text-gray-800 tracking-tight">
                      Economy Latex C - Grade B
                    </p>
                    <p className="text-xs text-gray-500/90 mt-1 flex items-center gap-1">
                      <svg
                        className="h-3 w-3 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>
                        28 October 2025 •{" "}
                        <span className="font-medium text-gray-600">
                          09:14 AM
                        </span>
                      </span>
                    </p>
                  </div>

                  {/* Price */}
                  <div className="hidden md:block px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-sm font-medium text-gray-500">Total</p>
                    <p className="text-lg font-bold text-gray-900">$1,200.00</p>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 rounded-full bg-red-50/80 px-3 py-1.5 pr-4 border border-red-100/60">
                    <div className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-red-500/90"></span>
                    </div>
                    <span className="text-xs font-semibold tracking-wide text-red-700">
                      CANCELLED
                    </span>
                    <svg
                      className="h-4 w-4 text-red-500 ml-1 transform transition-transform duration-300 group-hover:scale-110"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {/* Chevron Icon */}
                  <svg
                    className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                      activeOrder === 3 ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Expanded Order Details */}
              {activeOrder === 3 && (
                <div className="relative bg-white border border-t-0 border-gray-100 rounded-b-xl p-6 shadow-lg">
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent"></div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Summary */}
                    <div className="lg:col-span-2">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">
                        Order Summary
                      </h4>

                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">
                              Order Date
                            </p>
                            <p className="text-sm font-semibold text-gray-800">
                              Oct 28, 2025
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">
                              Order Total
                            </p>
                            <p className="text-sm font-semibold text-gray-800">
                              $1,200.00
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">
                              Payment Method
                            </p>
                            <p className="text-sm font-semibold text-gray-800">
                              Credit Card
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100">
                          <div className="flex items-center">
                            <div className="bg-red-100 rounded-lg p-2 mr-3">
                              <svg
                                className="w-5 h-5 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                ></path>
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                Order Cancelled
                              </p>
                              <p className="text-xs text-gray-500">
                                Cancelled on Oct 30, 2025
                              </p>
                            </div>
                          </div>
                          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                            View Details
                          </button>
                        </div>
                      </div>

                      {/* Cancellation Reason */}
                      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-4">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                          <h5 className="text-sm font-semibold text-gray-700">
                            CANCELLATION REASON
                          </h5>
                        </div>
                        <div className="p-4">
                          <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                            <p className="text-sm text-red-700">
                              Order was cancelled at customer's request. Payment
                              was refunded in full.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                          <h5 className="text-sm font-semibold text-gray-700">
                            PRODUCT DETAILS
                          </h5>
                        </div>
                        <div className="p-4">
                          <div className="flex items-start">
                            <div className="bg-gray-100 rounded-lg p-3 mr-4">
                              <svg
                                className="w-6 h-6 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                ></path>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h6 className="text-sm font-bold text-gray-800">
                                Economy Latex C - Grade B
                              </h6>
                              <p className="text-xs text-gray-500 mb-2">
                                SKU: LNX-ECO-B-2025
                              </p>
                              <div className="flex items-center space-x-4">
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Quantity
                                  </p>
                                  <p className="text-sm font-semibold text-gray-800">
                                    1.5 Metric Tons
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-500">
                                    Unit Price
                                  </p>
                                  <p className="text-sm font-semibold text-gray-800">
                                    $800.00/ton
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-500">
                                Total
                              </p>
                              <p className="text-lg font-bold text-gray-800">
                                $1,200.00
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Shipping & Actions */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-4">
                        Order Actions
                      </h4>

                      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                          <h5 className="text-sm font-semibold text-gray-700">
                            REFUND DETAILS
                          </h5>
                        </div>
                        <div className="p-4">
                          <div className="bg-green-50 rounded-lg p-3 border border-green-100 mb-4">
                            <div className="flex items-center">
                              <svg
                                className="w-5 h-5 text-green-600 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                ></path>
                              </svg>
                              <div>
                                <p className="text-sm font-medium text-green-700">
                                  Refund Completed
                                </p>
                                <p className="text-xs text-green-600">
                                  Refund processed on Oct 31, 2025
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">
                                Refund Amount
                              </span>
                              <span className="font-semibold text-gray-800">
                                $1,200.00
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">
                                Payment Method
                              </span>
                              <span className="font-semibold text-gray-800">
                                Credit Card
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">
                                Reference ID
                              </span>
                              <span className="font-semibold text-gray-800">
                                RF-28495-2025
                              </span>
                            </div>
                          </div>

                          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-300">
                            View Refund Details
                          </button>
                        </div>
                      </div>

                      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                          <h5 className="text-sm font-semibold text-gray-700">
                            ORDER ACTIONS
                          </h5>
                        </div>
                        <div className="p-4 space-y-3">
                          <button className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50">
                            <span>View Invoice</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              ></path>
                            </svg>
                          </button>
                          <button className="w-full flex items-center justify-between text-sm font-medium text-indigo-600 hover:text-indigo-800 p-2 rounded-lg hover:bg-indigo-50">
                            <span>Reorder Items</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              ></path>
                            </svg>
                          </button>
                          <button className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50">
                            <span>Contact Support</span>
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Order;

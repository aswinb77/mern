import React, { useState } from "react";
import { Link } from "react-router-dom";

const Support = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [openQuestion, setOpenQuestion] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuestionToggle = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Your message has been sent successfully!");
      setMessage("");
    }, 1500);
  };

  const faqs = [
    {
      question: "How do I check the quality of latex before purchasing?",
      answer:
        "You can use our free Quality Check tool by uploading samples or requesting our inspection service. Visit the 'Check Quality' page in your dashboard for more details.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, bank transfers, and secure payment gateways like PayPal. Some payment methods may have additional verification steps for large orders.",
    },
    {
      question: "How are shipments tracked?",
      answer:
        "Once your order ships, you'll receive a tracking number via email. You can monitor your shipment in real-time through our platform or directly with the shipping provider.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 14 days of delivery for unopened products. Specialty items like custom latex batches may have different return conditions. Please contact support for details.",
    },
    {
      question: "How can I become a premium member?",
      answer:
        "Premium membership is available for high-volume buyers. Benefits include priority support, discounted rates, and advanced quality reports. Contact our sales team for eligibility requirements.",
    },
  ];

  const supportTickets = [
    {
      id: "TKT-2025-0456",
      subject: "Latex quality discrepancy in last shipment",
      status: "In Progress",
      date: "2025-03-15",
      priority: "High",
    },
    {
      id: "TKT-2025-0382",
      subject: "Invoice clarification needed",
      status: "Resolved",
      date: "2025-03-08",
      priority: "Medium",
    },
    {
      id: "TKT-2025-0291",
      subject: "Account verification request",
      status: "Closed",
      date: "2025-02-28",
      priority: "Low",
    },
  ];

  return (
    <>
      <body className="bg-gray-50">
        {/* Navigation - Same as Order Page */}
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

        {/* Sidebar - Same as Order Page */}
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
                  className="flex items-center p-2 text-gray-900 rounded-lg bg-gray-100"
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Help & Support
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div className="p-4 sm:ml-64">
          <br />
          <br />

          {/* Premium Support Header */}
          <div className="p-6 rounded-xl mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Help & Support
                </h1>
                <p className="text-blue-600 font-medium">
                  We're here to help you with any questions or issues
                </p>
              </div>
              <div className="flex items-center space-x-3">
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
                    className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                    placeholder="Search help articles..."
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md flex items-center">
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
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    ></path>
                  </svg>
                  Live Chat
                </button>
              </div>
            </div>
          </div>

          {/* Support Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2">
                <button
                  onClick={() => setActiveTab("faq")}
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "faq"
                      ? "text-blue-600 border-blue-600"
                      : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    FAQ
                  </div>
                </button>
              </li>
              <li className="mr-2">
                <button
                  onClick={() => setActiveTab("contact")}
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "contact"
                      ? "text-blue-600 border-blue-600"
                      : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Contact Us
                  </div>
                </button>
              </li>
              <li className="mr-2">
                <button
                  onClick={() => setActiveTab("tickets")}
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "tickets"
                      ? "text-blue-600 border-blue-600"
                      : "text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
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
                    My Tickets
                  </div>
                </button>
              </li>
            </ul>
          </div>

          {/* FAQ Tab Content */}
          {activeTab === "faq" && (
            <div className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden mb-8">
              <div className="p-5 border-b border-gray-100 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm text-gray-600">
                  Find answers to common questions about our products and
                  services
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-5">
                    <button
                      className="flex justify-between items-center w-full text-left"
                      onClick={() => handleQuestionToggle(index)}
                    >
                      <h3 className="text-lg font-medium text-gray-800">
                        {faq.question}
                      </h3>
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                          openQuestion === index ? "transform rotate-180" : ""
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
                    </button>
                    {openQuestion === index && (
                      <div className="mt-3 pl-2">
                        <p className="text-gray-600">{faq.answer}</p>
                        {index === 0 && (
                          <div className="mt-3">
                            <button className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
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
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                ></path>
                              </svg>
                              Visit Quality Check Page
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-5 border-t border-gray-100 bg-gray-50 text-center">
                <p className="text-sm text-gray-600">
                  Didn't find what you were looking for?
                </p>
                <button
                  onClick={() => setActiveTab("contact")}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Contact our support team →
                </button>
              </div>
            </div>
          )}

          {/* Contact Tab Content */}
          {activeTab === "contact" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden mb-8">
                  <div className="p-5 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Send us a message
                    </h2>
                    <p className="text-sm text-gray-600">
                      We typically respond within 1 business day
                    </p>
                  </div>
                  <div className="p-5">
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="What's this about?"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Category
                        </label>
                        <select
                          id="category"
                          className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                          <option>Select a category</option>
                          <option>Order Inquiry</option>
                          <option>Quality Issue</option>
                          <option>Shipping Question</option>
                          <option>Payment Issue</option>
                          <option>Account Help</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          rows="5"
                          className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Describe your issue in detail..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                        ></textarea>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="urgent"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor="urgent"
                            className="ml-2 text-sm font-medium text-gray-700"
                          >
                            Mark as urgent
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
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
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                ></path>
                              </svg>
                              Send Message
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden mb-6">
                  <div className="p-5 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Other ways to reach us
                    </h2>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start mb-5">
                      <div className="bg-blue-100 rounded-lg p-3 mr-4">
                        <svg
                          className="w-6 h-6 text-blue-600"
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
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-1">
                          Phone Support
                        </h3>
                        <p className="text-gray-600 mb-2">
                          Available 24/7 for urgent matters
                        </p>
                        <a
                          href="tel:+18005551234"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          +1 (800) 555-1234
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start mb-5">
                      <div className="bg-green-100 rounded-lg p-3 mr-4">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-1">
                          Email Us
                        </h3>
                        <p className="text-gray-600 mb-2">
                          Typically respond within 1 business day
                        </p>
                        <a
                          href="mailto:support@latexq.com"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          support@latexq.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-purple-100 rounded-lg p-3 mr-4">
                        <svg
                          className="w-6 h-6 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-1">
                          Live Chat
                        </h3>
                        <p className="text-gray-600 mb-2">
                          Available Monday-Friday, 9AM-5PM EST
                        </p>
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          Start Chat Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
                  <div className="p-5 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Helpful Resources
                    </h2>
                  </div>
                  <div className="p-5">
                    <div className="mb-4">
                      <a
                        href="#"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <svg
                          className="w-5 h-5 mr-3"
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
                        <span>Latex Quality Standards Guide</span>
                      </a>
                    </div>
                    <div className="mb-4">
                      <a
                        href="#"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <svg
                          className="w-5 h-5 mr-3"
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
                        <span>Shipping & Handling Policy</span>
                      </a>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <svg
                          className="w-5 h-5 mr-3"
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
                        <span>Payment Methods & Security</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tickets Tab Content */}
          {activeTab === "tickets" && (
            <div className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      My Support Tickets
                    </h2>
                    <p className="text-sm text-gray-600">
                      View all your recent support requests
                    </p>
                  </div>
                  <button className="mt-3 md:mt-0 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
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
                    New Ticket
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Ticket ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Subject
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Priority
                      </th>
                      <th scope="col" className="px-6 py-3 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {supportTickets.map((ticket, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {ticket.id}
                        </td>
                        <td className="px-6 py-4">{ticket.subject}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              ticket.status === "Resolved"
                                ? "bg-green-100 text-green-800"
                                : ticket.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{ticket.date}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              ticket.priority === "High"
                                ? "bg-red-100 text-red-800"
                                : ticket.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-blue-600 hover:text-blue-800 font-medium">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">3</span> of{" "}
                  <span className="font-medium">3</span> tickets
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </body>
    </>
  );
};

export default Support;

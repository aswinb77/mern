import React, {Suspense, lazy} from "react";
import { motion } from "framer-motion";
// import dmodel from "../../components/dmodel";

const Other = () => {
  const teamMembers = [
    {
      name: "Aswin Biju",
      role: "Co-Founder / CEO",
      bio: "10+ years in agricultural technology and supply chain innovation",
      img: "https://img.freepik.com/premium-vector/happy-positive-man-showing-gesture-ok-sign-gesture-language-concept_697837-59.jpg",
    },
    {
      name: "Irfan Refeeq",
      role: "CTO",
      bio: "Blockchain and AI expert with focus on commodity trading platforms",
      img: "https://img.freepik.com/premium-vector/trendy-flat-illustration-office-employee_67813-3479.jpg",
    },
    {
      name: "Gowri Nandhana",
      role: "Head of Operations",
      bio: "Former plantation manager with deep latex production expertise",
      img: "https://img.freepik.com/free-vector/young-woman-white_25030-39552.jpg",
    },
    {
      name: "Aiswarya Santhosh",
      role: "Marketing Director",
      bio: "Digital marketing specialist for agricultural commodities",
      img: "https://img.freepik.com/premium-vector/woman-with-joyful-expression-raised-her-finger-up-gesture-concept-human-emotions_484720-5567.jpg",
    },
  ];

  const articles = [
    {
      title: "5 Key Factors to Determine Latex Quality",
      date: "March 30, 2025",
      category: "Quality Insights",
      excerpt:
        "Learn how to identify high-grade rubber latex by evaluating its viscosity, dry rubber content (DRC), and chemical composition. Ensure you meet industry standards.",
      author: "John Wick",
      role: "Quality Analyst",
      img: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2NpZW50aXN0fGVufDB8fDB8fHww",
    },
    {
      title: "Current Latex Market Pricing Trends",
      date: "March 28, 2025",
      category: "Market Trends",
      excerpt:
        "Stay informed about the latest rubber latex pricing trends, influenced by quality, region, and market demand. Make smarter trade decisions.",
      author: "Abraham Qureshi",
      role: "Market Analyst",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFuYWx5c3R8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "How Lab Reports Improve Rubber Latex Sales",
      date: "March 25, 2025",
      category: "Lab Testing",
      excerpt:
        "Discover how accurate lab testing reports improve trust in rubber latex quality, boosting sales and market credibility.",
      author: "John Snowie",
      role: "Head of Operations",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxhYiUyMHRlY2huaWNpYW58ZW58MHx8MHx8fDA%3D",
    },
  ];

  const features = [
    {
      title: "Precision Quality Analysis",
      description:
        "Advanced spectrometry and viscosity testing for unparalleled accuracy in latex grading",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
            clipRule="evenodd"
          />
          <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
        </svg>
      ),
    },
    {
      title: "Blockchain Verification",
      description:
        "Immutable transaction records ensuring authenticity of every latex batch",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
            clipRule="evenodd"
          />
          <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
          <path
            fillRule="evenodd"
            d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      title: "AI-Powered Pricing",
      description:
        "Machine learning algorithms that analyze 50+ market factors for optimal pricing",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
        </svg>
      ),
    },
  ];

  const Dmodel = lazy(() => import("../../components/Dmodel"));

  return (
    <>
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-white px-6 py-12 sm:py-20 lg:py-24 lg:px-8">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="animate-fade-in"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="relative inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-emerald-500 rounded-full shadow-lg"
            >
              <span className="absolute flex h-3 w-3 -right-1 -top-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Ensure Quality & Maximize Profits
            </motion.div>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl hover:text-indigo-600 transition duration-300">
              <span className="block">The Future of</span>
              <span className=" bg-black bg-clip-text text-transparent">
                Latex Trading
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-700 leading-relaxed">
              Our blockchain-powered platform revolutionizes rubber latex
              trading with AI-driven quality analysis, transparent pricing, and
              secure transactions for producers and buyers worldwide.
            </p>
            <ul className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-1 text-gray-600">{feature.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Join Marketplace
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-gray-900 font-medium rounded-lg shadow-md hover:shadow-lg border border-gray-200 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
                    <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end sticky top-0"
          >
            <div className="relative">
              {/* Replace img with Dmodel (wrapped in a container for sizing) */}
              <div className="relative w-full max-w-lg rounded-xl overflow-hidden">
                <div className="w-[600px] h-[600px]"> {/* Set explicit height (adjust as needed) */}
                  <Suspense fallback={<div className="text-white p-4">Loading 3D model...</div>}>
                    <Dmodel />
                  </Suspense>
                </div>
              </div>             
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-3xl font-bold text-indigo-600">250K+</h3>
              <p className="mt-2 text-gray-600">Metric Tons Traded</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-3xl font-bold text-green-600">98.7%</h3>
              <p className="mt-2 text-gray-600">Quality Accuracy</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-3xl font-bold text-amber-600">1.2K+</h3>
              <p className="mt-2 text-gray-600">Verified Producers</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-3xl font-bold text-purple-600">15%</h3>
              <p className="mt-2 text-gray-600">Average Profit Increase</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative bg-white py-16 sm:py-24">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="team-pattern"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="8" fill="#f0f0f0" />
                <circle cx="60" cy="60" r="8" fill="#f0f0f0" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#team-pattern)" />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Leadership Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-6 text-lg leading-8 text-gray-600"
            >
              Our team combines decades of experience in agriculture,
              technology, and commodity trading to build the future of latex
              commerce.
            </motion.p>
          </div>

          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
          >
            {teamMembers.map((member, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl bg-gray-50 shadow-lg transition-all duration-300 group-hover:shadow-xl">
                  <img
                    className="h-80 w-full object-cover grayscale-[20%] transition duration-300 group-hover:grayscale-0"
                    src={member.img}
                    alt={member.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-indigo-200">{member.role}</p>
                    <p className="mt-2 text-sm opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-300">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              Latex Insights
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-6 text-lg leading-8 text-gray-600"
            >
              Stay informed with the latest in rubber latex quality, pricing,
              and market trends from our industry experts.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {articles.map((article, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
              >
                <img
                  src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cnViYmVyJTIwcGxhbnRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
                  alt=""
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                  <time dateTime={article.date} className="mr-8">
                    {article.date}
                  </time>
                  <div className="-ml-4 flex items-center gap-x-4">
                    <svg
                      viewBox="0 0 2 2"
                      className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <div className="flex gap-x-2.5">
                      <span className="font-semibold text-white">
                        {article.category}
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  <a href="#">
                    <span className="absolute inset-0" />
                    {article.title}
                  </a>
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-300">
                  {article.excerpt}
                </p>
                <div className="mt-6 flex items-center gap-x-4">
                  <img
                    src={article.img}
                    alt={article.author}
                    className="h-10 w-10 rounded-full bg-gray-100"
                  />
                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {article.author}
                    </h4>
                    <p className="text-xs text-gray-300">{article.role}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="bg-black border-y border-gray-800 py-6 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center mx-12">
              {[
                { value: "99.99%", label: "Uptime SLA" },
                { value: "256-bit", label: "Encryption" },
                { value: "0", label: "Fraud Cases" },
                { value: "↑37%", label: "Avg. Profit Increase" },
                { value: "15ms", label: "Trade Execution" },
              ].map((stat, j) => (
                <div key={j} className="flex items-center mx-12">
                  <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300 mr-3">
                    {stat.value}
                  </span>
                  <span className="text-lg text-gray-400">{stat.label}</span>
                  {j < 4 && <span className="text-emerald-400 mx-12">◆</span>}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      {/* Features Section */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-base font-semibold leading-7 text-indigo-600"
            >
              Everything you need
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
              A complete latex trading platform
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-6 text-lg leading-8 text-gray-600"
            >
              Our comprehensive solution handles every aspect of latex trading
              from quality verification to secure transactions and logistics
              coordination.
            </motion.p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              viewport={{ once: true }}
              className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3"
            >
              {[
                {
                  name: "Quality Verification",
                  description:
                    "Advanced lab testing with blockchain-verified results to ensure every batch meets specifications.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ),
                  image:
                    "https://media.istockphoto.com/id/1796711257/photo/businessman-using-pen-to-tick-correct-sign-mark-on-virtual-checklist-for-quality-control-and.jpg?s=612x612&w=0&k=20&c=34GjJ2Wp6SOJdMk0VdvaNPKWEfjVzzhijyPkw8D4gVI=",
                },
                {
                  name: "Smart Pricing",
                  description:
                    "AI-driven dynamic pricing based on real-time market data and quality metrics.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ),
                  image:
                    "https://media.istockphoto.com/id/1344569916/video/electricity-meter-screen-with-kilowatt-per-hour-and-money-counter-utility-bill.jpg?s=640x640&k=20&c=Ob7KQ5rMKUfKmY9mAtGKJKRsYgv-0vILBkDrLzA9VFE=",
                },
                {
                  name: "Secure Transactions",
                  description:
                    "End-to-end encrypted payments with escrow protection for both buyers and sellers.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ),
                  image:
                    "https://media.istockphoto.com/id/1227400166/photo/data-protection-and-secure-online-payments-cyber-internet-security-technologies-and-data.jpg?s=612x612&w=0&k=20&c=dKxu6Z-92r9IA3lZRbNFWmH4VAsvGAJNIMM5TFfDRwI=",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                  className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/10"
                >
                  <div className="relative flex-1">
                    <img
                      className="h-64 w-full object-cover"
                      src={feature.image}
                      alt={feature.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-gray-900/10"></div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-x-4">
                      <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold leading-7 text-gray-900">
                        {feature.name}
                      </h3>
                    </div>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-900 py-16 sm:py-24">
        <div className="absolute inset-0 -z-10 opacity-20">
          <svg
            className="absolute inset-0 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
              <path
                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                strokeWidth={0}
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
            />
          </svg>
        </div>
        <div
          className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Ready to transform your latex trading?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-200"
            >
              Join hundreds of producers and buyers who are already benefiting
              from our platform's transparency and efficiency.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="text-sm font-semibold leading-6 text-white"
              >
                Learn more <span aria-hidden="true">→</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Other;

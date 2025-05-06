import React from "react";

const Banner = () => {   
    return (
        <>   {/* Fragment to wrap adjacent elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <svg className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
                    <defs>
                        <pattern id="rubber-latex-pattern" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
                        <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" strokeWidth="0" />
                    </svg>
                    <rect width="100%" height="100%" strokeWidth="0" fill="url(#rubber-latex-pattern)" />
                </svg>
            </div>

            <div className="content p-4 pt-20 md:pt-28 text-center">
                <h1 className="custom-font mb-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                    Ensure <mark className="px-2 text-white bg-blue-600 rounded-sm">Quality</mark> & Maximize Profits
                </h1>
                <p className="custom-font text-lg font-normal text-gray-500 sm:text-xl lg:text-2xl max-w-3xl mx-auto">
                    Better future for a Brighter generation
                </p>
            </div>
        </>
    )
}

export default Banner;

import React from 'react'

const Pagination = () => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        <li className="relative pr-8 sm:pr-20">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="h-0.5 w-full bg-indigo-600"></div>
          </div>
          <a href="#"
             className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900 text-white">
            10%
            <span className="sr-only">Step 1</span>
          </a>
        </li>

        <li className="relative pr-8 sm:pr-20">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="h-0.5 w-full bg-indigo-600"></div>
          </div>
          <a href="#"
             className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900">
            <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd" />
            </svg>
            <span className="sr-only">Step 2</span>
          </a>
        </li>

        <li className="relative pr-8 sm:pr-20">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="h-0.5 w-full bg-gray-200"></div>
          </div>
          <a href="#"
             className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
             aria-current="step">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true"></span>
            <span className="sr-only">Step 3</span>
          </a>
        </li>

        <li className="relative pr-8 sm:pr-20">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="h-0.5 w-full bg-gray-200"></div>
          </div>
          <a href="#"
             className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
            <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" aria-hidden="true"></span>
            <span className="sr-only">Step 4</span>
          </a>
        </li>

        <li className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="h-0.5 w-full bg-gray-200"></div>
          </div>
          <a href="#"
             className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
            <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" aria-hidden="true"></span>
            <span className="sr-only">Step 5</span>
          </a>
        </li>
      </ol>
    </nav>
  )
}

export default Pagination;
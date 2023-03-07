import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="h-1/2 flex items-center justify-center mt-0 mr-auto mb-0 ml-auto flex-wrap container">
      <div className="w-full h-full items- justify- pt-0 pr-4 pb-0 pl-4 md:w-1/2 md:mb-0">
        <p className="mb-2 leading-tight font-bold text-5xl font-heading text- text-black">
          Resetare parola
        </p>
        <p className="mb-2 text-lg text-gray-400 leading-relaxed text-">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sit eaque
          totam aliquid veritatis assumenda temporibus harum unde!
        </p>
        <div className="container mt-0 mr-auto mb-0 ml-auto pt-3 pr-4 pb-3">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="mt-1 mr-0 mb-0 ml-0 rounded-md shadow-sm relative">
            <input
              placeholder="Introdu email"
              type="email"
              className="border focus:ring-teal-500 focus:border-teal-500
            w-full h-10 block border-gray-300 shadow-sm pt-0 pr-0 pb-0 pl-4 rounded-md sm:text-sm"
            />
          </div>
        </div>
        <button className="text-white rounded bg-blue-700 pt-2 pr-4 pb-2 pl-4 w-full">
          Trimite parola noua
        </button>
      </div>
      <div className="w-full h-full flex items-center justify-center pt-0 pr-4 pb-0 pl-4 md:w-1/2 md:mb-0">
        <iframe
          width="420"
          height="315"
          src="https://www.youtube.com/embed/tgbNymZ7vqY"
          className="object-contain object-top w-full"
        />
      </div>
    </div>
  );
};
export default ForgotPassword;

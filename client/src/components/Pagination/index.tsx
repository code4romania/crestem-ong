const Pagination = ({ step }: { step: number }) => {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol role="list" className="flex items-center w-full">
        <li className="relative w-full">
          <div
            className="h-8 l-0 inset-0 flex items-center w-full"
            aria-hidden="true"
          >
            <div className="h-0.5 w-full bg-gray-300"></div>
          </div>
          <div
            className="absolute h-8 l-0 inset-0 flex items-center w-full"
            aria-hidden="true"
            style={{ width: `${step * 10}%` }}
          >
            <div className="h-0.5 w-full bg-teal-600"></div>
          </div>
          <a
            href="#"
            style={{ left: `${step * 10}%` }}
            className="absolute top-0 flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 hover:bg-teal-900 text-white text-sm"
          >
            {step * 10}%<span className="sr-only">Step 1</span>
          </a>
        </li>
      </ol>
    </nav>
  );
};

export default Pagination;

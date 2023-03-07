import React from "react";
import Button from "../../components/Button";

const Demo = () => (
  <div className="h-1/2 flex items-center justify-center mt-0 mr-auto mb-0 ml-auto container gap-8">
    <div className="w-full h-full flex items-center justify-center pt-0 pr-4 pb-0 pl-4 md:w-1/2 md:mb-0">
      <iframe
        width="420"
        height="315"
        src="https://www.youtube.com/embed/tgbNymZ7vqY"
        className="object-contain object-top w-full"
      />
    </div>
    <div className="w-full h-full items- justify- pt-0 pr-4 pb-0 pl-4 md:w-1/2 md:mb-0">
      <p className="mb-2 leading-tight font-bold text-5xl font-heading text- text-black">
        Bine ai venit!
      </p>
      <p>
        {" "}
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. Lorem Ipsum is simply dummy
        text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's standard dummy text ever since the 1500s, when an unknown
        printer took a galley of type and scrambled it to make a type specimen
        book.{" "}
      </p>
      <Button to={'reports'}>Începe evaluarea</Button>
    </div>
  </div>
);

export default Demo;

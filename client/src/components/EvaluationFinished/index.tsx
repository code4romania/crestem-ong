import React from "react";
import Heading from "../Heading";
import Button from "../Button";

const EvaluationFinished = () => (
  <div className="mt-12">
    <div className="flex space-y-8 flex-col md:flex-row bg-teal-700 rounded-md items-center gap-4">
      <div className="w-full md:w-1/2 text-white px-10 md:pl-20 py-10">
        <Heading level="h2">Felicitări!</Heading>
        <Heading level="h2">
          Răspunsurile tale au fost trimise cu succes!
        </Heading>
        <p className={"text-indigo-200 text-lg leading-6 mt-4 mb-8"}>
          Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
          Malesuada adipiscing sagittis vel nulla nec.
        </p>
        <Button to={"https://code4.ro"}>Vezi biblioteca</Button>
      </div>
      <div className="w-full md:w-1/2 hidden md:block pl-12">
        <img src="https://picsum.photos/540/450" />
      </div>
    </div>
    <div className="py-12">
      <Heading level={"h2"}>
        Vrei sa fii la curent cu cele mai noi resurse de pe platformă?
      </Heading>
      <div className="text-green-600">
        <Heading level={"h2"}>Abonează-te la newsletter. </Heading>
      </div>
    </div>
  </div>
);

export default EvaluationFinished;

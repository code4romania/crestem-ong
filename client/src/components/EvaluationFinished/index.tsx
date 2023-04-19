import React from "react";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import screenshot from "@/assets/illustration.svg";
import Section from "@/components/Section";

const EvaluationFinished = () => (
  <Section>
    <div className="flex space-y-8 flex-col md:flex-row bg-teal-700 rounded-md items-center gap-4">
      <div className="w-full md:w-1/2 text-white px-10 md:pl-20 py-10">
        <Heading level="h2">Felicitări!</Heading>
        <Heading level="h2">
          Răspunsurile tale au fost trimise cu succes!
        </Heading>
        <p className={"text-indigo-200 text-lg leading-6 mt-4 mb-8"}>
          Le vei primi în scurt timp și pe mail. Până la procesarea rezultatelor
          la nivel de organizație, poți deja accesa Biblioteca noastră de
          resurse, organizate în funcție de cele 10 dimensiuni ale analizei.
        </p>
        <Button to={"https://ong.website-factory.heroesof.tech/ro/biblioteca"}>
          Vezi biblioteca
        </Button>
      </div>
      <div className="w-full md:w-1/2 md:pl-12">
        <img src={screenshot} alt={"Screenshot"} />
      </div>
    </div>
    {/*<div className="py-12">*/}
    {/*  <Heading level={"h2"}>*/}
    {/*    Vrei sa fii la curent cu cele mai noi resurse de pe platformă?*/}
    {/*  </Heading>*/}
    {/*  <div className="text-green-600">*/}
    {/*    <Heading level={"h2"}>Abonează-te la newsletter. </Heading>*/}
    {/*  </div>*/}
    {/*  <div>*/}
    {/*    <input type="text" className="" />*/}
    {/*    <Button></Button>*/}
    {/*  </div>*/}
    {/*</div>*/}
  </Section>
);

export default EvaluationFinished;

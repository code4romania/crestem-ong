import React from "react";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { useGetMatrixQuery } from "@/redux/api/userApi";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const Matrix = () => {
  const { data: matrix } = useGetMatrixQuery();

  return (
    <div>
      <Section>
        <Heading level="h2">Evaluare organizațională</Heading>
        <p className="mt-6 text-gray-500">
          Matricea de dezvoltare organizațională este o radiografie care arată
          nevoile, punctele tari și cele de îmbunătățit ale organizației tale,
          din 10 perspective: Guvernanță, Aspecte financiare, Managementul
          informației, Monitorizare și evaluare, Structură organizațională,
          Leadership, Managementul resurselor umane, Implicarea persoanelor
          beneficiare, Advocacy și parteneriate, Comunicare externă. În mod
          ideal, va fi completată de toate persoanele care lucrează în
          organizație, astfel încât rezultatele să includă perspective cât mai
          diverse.
        </p>
      </Section>
      <Section>
        {matrix?.map((dimension) => (
          <div className="mt-12">
            <Heading level="h4">{dimension.name}</Heading>
            <dl className="space-y-6 divide-y divide-gray-900/10">
              {dimension.quiz?.map((quiz) => (
                <Disclosure as="div" key={quiz.id} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                          <span className="text-base font-semibold leading-7">
                            {quiz.question}
                          </span>
                          <span className="ml-6 flex h-7 w-7 items-center">
                            {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <ol className="list-decimal list-inside">
                          <li className="text-base leading-7 text-gray-600">
                            {quiz.option_1}
                          </li>
                          <li className="text-base leading-7 text-gray-600">
                            {quiz.option_2}
                          </li>
                          <li className="text-base leading-7 text-gray-600">
                            {quiz.option_3}
                          </li>{" "}
                          <li className="text-base leading-7 text-gray-600">
                            {quiz.option_4}
                          </li>{" "}
                          <li className="text-base leading-7 text-gray-600">
                            {quiz.option_5}
                          </li>
                        </ol>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        ))}
      </Section>
    </div>
  );
};

export default Matrix;

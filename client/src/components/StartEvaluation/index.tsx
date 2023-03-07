import React from "react";
import Heading from "../Heading";
import Button from "../Button";

const steps = [
  {
    id: 1,
    title: "Step 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
  },
  {
    id: 2,
    title: "Step 2",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
  },
  {
    id: 3,
    title: "Step 3",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
  },
  {
    id: 4,
    title: "Step 4",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
  },
  {
    id: 5,
    title: "Step 5",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
  },
];

const StartEvaluation = ({ onClick }: { onClick: () => void }) => (
  <div className="space-y-10">
    <section className="pt-12">
      <Heading level="h1">Începe evaluarea</Heading>
      <div className="flex flex-row mt-8 md:gap-x-20">
        <div className="flex w-full justify-center items-center">
          <img
            className="w-full max-w-full rounded"
            src="https://picsum.photos/580/390"
          />
        </div>
        <div className={"flex flex-col w-full text-gray-500"}>
          <div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="flex justify-end mt-12">
            <Button onClick={onClick}>Începe evaluarea</Button>
          </div>
        </div>
      </div>
    </section>
    <section className="pt-12">
      <Heading level={"h2"}>
        Ce trebuie să știi înainte să începi evaluarea?
      </Heading>
      <div className="mt-12 space-y-8">
        {steps.map(({ id, title, content }, index) => (
          <div key={id} className="flex space-x-4">
            <div className="flex w-10 h-10 items-center justify-center bg-teal-800 text-white rounded-md">
              icon
            </div>
            <div>
              <div className="text-lg leading-6">{title}</div>
              <div className="text-base leading-6 text-gray-500">{content}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default StartEvaluation;

import React, { ReactNode } from "react";
import empty from "@/assets/empty.svg";
import Heading from "@/components/Heading";

const EmptyScreen = ({
  title,
  description,
  button,
}: {
  title: string;
  description?: string;
  button: ReactNode;
}) => (
  <div className="flex flex-col text-center pb-8 space-y-4">
    <img alt={title} src={empty} className="mx-auto mb-4" />
    <Heading level="h4">{title}</Heading>
    {description && <p className="mt-2 max-w-xl mx-auto">{description}</p>}
    <div>{button}</div>
  </div>
);

export default EmptyScreen;

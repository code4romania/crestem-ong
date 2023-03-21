import React from "react";

const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={className}>
    <div className="container mx-auto px-2.5 py-10">{children}</div>
  </section>
);

export default Section;

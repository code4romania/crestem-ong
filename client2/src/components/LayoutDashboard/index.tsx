import MadeBy from "@/components/MadeBy";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import { Outlet } from "@tanstack/react-router";

const LayoutDashboard = () => (
  <div className="flex flex-col h-screen">
    <Navbar />
    <div className="mb-auto">
      <Outlet />
    </div>
    <Section className="bg-gray-100">
      <MadeBy />
    </Section>
    <Section className="bg-gray-50">
      <div />
    </Section>
  </div>
);

export default LayoutDashboard;

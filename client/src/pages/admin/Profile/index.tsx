import { useGetUserDomains } from "@/services/user.queries";

import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { useAuth } from "@/contexts/auth";
import { Navigate } from "@tanstack/react-router";

const FDSCProfile = () => {
  const { user } = useAuth();
  const { data: userDomains } = useGetUserDomains();

  if (!user) {
    return <Navigate to="/" />;
  }

  console.log(user);

  const rows = [["Email", user.email]];

  return (
    <Section>
      <div className="flex w-full items-center justify-between">
        <Heading level="h2">Profilul meu: FDSC Admin</Heading>
      </div>

      <div className="mt-8 bg-white shadow ring-1 ring-gray-900/5 sm:rounded-lg">
        <dl className="divide-y divide-gray-100">
          {rows.map(([label, value], idx) => (
            <div
              key={idx}
              className={`px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <dt className="text-sm font-medium leading-6 text-gray-900">
                {label}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {value || "-"}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
};

export default FDSCProfile;

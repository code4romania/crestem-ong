import screenshot from "@/assets/illustration.svg";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const Home = () => {
  return (
    <div>
      <Section>
        <div className={"flex justify-between space-y-2"}>
          <Heading level={"h2"}>Evaluare organizațională</Heading>
          <Button asChild>
            <Link to="/matrix">Vezi model matrice</Link>
          </Button>
        </div>
      </Section>

      <Section className="py-6">
        <div className="grid lg:grid-cols-2 justify-center mt-0 mr-auto mb-0 ml-auto container gap-8">
          <div className="w-full h-full flex items-center justify-center pt-0 pr-4 pb-0 pl-4 md:mb-0">
            <img src={screenshot} />
          </div>
          <div className="w-full h-full items- justify- pt-0 pr-4 pb-0 pl-4 md:mb-0 text-lg text-gray-500">
            <p>
              Matricea de dezvoltare organizațională sprijină organizațiile în
              procesul de management, în gestionarea provocărilor legate de
              îndeplinirea misiunii, sustenabilitate și creșterea impactului
              social. Chestionarul te ajută să identifici nevoi, punctele tari
              și cele de îmbunătățit ale organizației tale din 10 perspective:
              Guvernanță, Aspecte financiare, Managementul informației,
              Monitorizare și evaluare, Structură organizațională, Leadership,
              Managementul resurselor umane, Implicarea persoanelor beneficiare,
              Advocacy și parteneriate, Comunicare externă.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-gray-100 bg-opacity-70 text-center py-8">
        <Heading level="h2">Înscrie-te acum</Heading>
        <div className="mt-8">
          <Button asChild>
            <Link to="/register">Înregistrează-te</Link>
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default Home;

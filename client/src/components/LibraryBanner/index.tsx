import screenshot from "@/assets/illustration.svg";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Heading";
import Section from "@/components/Section";

const LibraryBanner = () => (
  <Section className="pt-4">
    <div className="grid md:grid-cols-2 items-center">
      <div>
        <Heading level="h2">Accesează biblioteca</Heading>
        <p className="mt-4 mb-8">
          Intră în bibliotecă, explorează și folosește resursele din categoriile
          la care ai scorat cel mai slab. Nu ezita să ne contactezi dacă ai
          nevoie de îndrumare sau ajutor.
        </p>
        <Button to="https://crestem.ong/ro/biblioteca">Vezi biblioteca</Button>
      </div>
      <div>
        <div className="w-full h-full flex items-center justify-center pt-0 pr-4 pb-0 pl-4">
          <img src={screenshot} />
        </div>
      </div>
    </div>
  </Section>
);

export default LibraryBanner;

import screenshotStart from "@/assets/illustration.svg";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Heading";
import Section from "@/components/Section";

const steps = [
  {
    id: 1,
    title: "Timp și concentrare",
    content:
      "Vei avea nevoie de aprox 30 - 40 de minute pentru a completa chestionarul într-un mod amănunțit. Rezervă-ți acest timp fără întreruperi. Este important să poți citi întrebările și răspunsurile cu atenție și poate vei avea nevoie să clarifici înțelesul unora dintre termeni cu ajutorul glosarului.",
  },
  {
    id: 2,
    title: "Este un exercițiu individual",
    content:
      "Avem nevoie de răspunsuri din perspectiva ta personală asupra organizației. În această etapă recomandăm ca persoanele din organizație să nu-și cunoască sau comenteze răspunsurile unele altora.",
  },
  {
    id: 3,
    title: "Răspunde sincer",
    content:
      "Chestionarul este anonim. Pentru o analiză eficientă și recomandări de măsuri relevante, este important să răspunzi cu descrieri sincere ale stării de fapt din organizație, din perspectiva ta.",
  },
  {
    id: 4,
    title: "Dacă ai dubii, întreabă",
    content:
      "În josul paginii ai o fereastră de chat, contactează-ne dacă ai nevoie de ajutor sau clarificări.",
  },
  {
    id: 5,
    title: "Încadrează-te în termenul limită!",
    content:
      "În mailul pe care l-ai primit este menționată perioada de completare a chestionarului. Asigură-te că respecți termenul limită, evită să lași pe ultimul moment.",
  },
  {
    id: 6,
    title: "Rezultatele analizei",
    content:
      "Când finalizezi completarea chestionarului, vei primi răspunsurile tale pe mail. La finalul perioadei de analiză, persoana care a inițiat procesul pentru organizația voastră va primi un raport detaliat cu media tuturor evaluărilor individuale și cu recomandări de resurse pentru fiecare arie de îmbunătățit.",
  },
];

const StartEvaluation = ({ onClick }: { onClick: () => void }) => (
  <>
    <Section className="pt-12">
      <Heading level="h2">Începe evaluarea</Heading>
      <div className="grid gap-10 md:grid-cols-2 flex-row mt-8 lg:gap-x-20">
        <div className="flex w-full justify-center items-center">
          <img className="w-full max-w-full rounded" src={screenshotStart} />
        </div>
        <div className={"flex flex-col w-full text-gray-500"}>
          <p>
            Matricea de dezvoltare organizațională este ca o radiografie care
            arată nevoile, punctele tari și cele de îmbunătățit ale organizației
            tale, din 10 perspective: Guvernanță, Aspecte financiare,
            Managementul informației, Monitorizare și evaluare, Structură
            organizațională, Leadership, Managementul resurselor umane,
            Implicarea persoanelor beneficiare, Advocacy și parteneriate,
            Comunicare externă. În mod ideal, va fi completată de toate
            persoanele care lucrează în organizație, astfel încât rezultatele să
            includă perspective cât mai diverse.
          </p>
        </div>
      </div>
    </Section>
    <Section className="pb-8">
      <Heading level={"h2"}>
        Ce trebuie să știi înainte să începi evaluarea?
      </Heading>
      <div className="mt-12 space-y-8">
        {steps.map(({ id, title, content }, index) => (
          <div key={id} className="flex space-x-4">
            {/*<div className="flex w-10 h-10 items-center justify-center bg-teal-800 text-white rounded-md">*/}
            {/*  icon*/}
            {/*</div>*/}
            <div>
              <div className="text-lg leading-6">{title}</div>
              <div className="text-base leading-6 text-gray-500">{content}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-12">
        <Button onClick={onClick}>Începe evaluarea</Button>
      </div>
    </Section>
  </>
);

export default StartEvaluation;

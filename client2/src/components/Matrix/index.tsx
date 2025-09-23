import Heading from "@/components/Heading";
import Section from "@/components/Section";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useGetMatrix } from "@/services/matrix.queries";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
const Matrix = () => {
  const { data: matrix } = useGetMatrix((m) => m.dimensions);
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleItem = (itemId: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };
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
                <Collapsible
                  key={quiz.id}
                  open={openItems[quiz.id] || false}
                  onOpenChange={() => toggleItem(quiz.id)}
                  className="pt-6"
                >
                  <dt>
                    <CollapsibleTrigger className="flex w-full items-start justify-between text-left text-foreground hover:text-foreground/80 transition-colors">
                      <span className="text-base font-semibold leading-7">
                        {quiz.question}
                      </span>
                      <span className="ml-6 flex h-7 w-7 items-center">
                        {openItems[quiz.id] ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </span>
                    </CollapsibleTrigger>
                  </dt>
                  <CollapsibleContent asChild>
                    <dd className="mt-2 pr-12">
                      <ol className="list-decimal list-inside space-y-1">
                        <li className="text-base leading-7 text-muted-foreground">
                          {quiz.option_1}
                        </li>
                        <li className="text-base leading-7 text-muted-foreground">
                          {quiz.option_2}
                        </li>
                        <li className="text-base leading-7 text-muted-foreground">
                          {quiz.option_3}
                        </li>
                        <li className="text-base leading-7 text-muted-foreground">
                          {quiz.option_4}
                        </li>
                        <li className="text-base leading-7 text-muted-foreground">
                          {quiz.option_5}
                        </li>
                      </ol>
                    </dd>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </dl>
          </div>
        ))}
      </Section>
    </div>
  );
};

export default Matrix;

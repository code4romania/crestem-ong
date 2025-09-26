import screenshot from "@/assets/illustration.svg";
import Section from "@/components/Section";

const EmailSent = () => {
  return (
    <Section>
      <div className="grid md:grid-cols-2 justify-center mt-0 mr-auto mb-0 ml-auto gap-8">
        <div className="mt-3">
          <h3 className="text-xl font-semibold mb-2">
            Verifică-ți căsuța de email
          </h3>
          <p className="text-gray-600">
            Ți-am trimis un mesaj cu instrucțiuni pentru resetarea parolei. Dacă
            nu îl găsești, verifică și folderul <strong>Spam</strong> sau
            <strong>Promoții</strong>.
          </p>
        </div>
        <div>
          <img src={screenshot} alt="Ilustrație resetare parolă" />
        </div>
      </div>
    </Section>
  );
};

export default EmailSent;

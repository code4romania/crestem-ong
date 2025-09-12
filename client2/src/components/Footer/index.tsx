import MadeBy from "@/components/MadeBy";
import Section from "@/components/Section";
import { Link } from "@tanstack/react-router";

const Footer = () => (
  <>
    <Section className="bg-gray-100">
      <MadeBy />
    </Section>
    <Section className="bg-gray-50">
      <footer className="relative">
        <div className="py-12 lg:py-16">
          <div className="grid gap-8 xl:grid-cols-3">
            <div />
            <nav className="xl:col-span-2">
              <ul className="grid gap-8 gap-y-16 sm:grid-cols-2 md:grid-cols-3">
                <li className="space-y-4">
                  <button className="text-left text-sm font-semibold tracking-wider text-gray-400 uppercase hover:text-gray-900">
                    Linkuri rapide
                  </button>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="https://crestem.ong/ro/despre-proiect"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        {" "}
                        Despre Creștem.ONG{" "}
                      </a>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        Începe o evaluare
                      </Link>
                    </li>
                    <li>
                      <a
                        href="https://crestem.ong/ro/biblioteca"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        {" "}
                        Bibliotecă{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://crestem.ong/ro/contact"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        {" "}
                        Contact{" "}
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="space-y-4">
                  <button className="text-left text-sm font-semibold tracking-wider text-gray-400 uppercase hover:text-gray-900">
                    {" "}
                    Linkuri externe
                  </button>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="http://www.fdsc.ro"
                        target="_blank"
                        rel="noopener"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        {" "}
                        Fundația pentru Dezvoltarea Societății Civile{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.instaredebine.ro"
                        target="_blank"
                        rel="noopener"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        {" "}
                        #ÎnStareDeBine{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://www.stiri.ong"
                        target="_blank"
                        rel="noopener"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        {" "}
                        Știri.ONG{" "}
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="space-y-4">
                  <button className="text-left text-sm font-semibold tracking-wider text-gray-400 uppercase hover:text-gray-900">
                    {" "}
                    Date personale
                  </button>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="https://crestem.ong/ro/termeni-si-conditii"
                        className="text-gray-500 hover:text-gray-900"
                      >
                        {" "}
                        Termeni și condiții{" "}
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-500 hover:text-gray-900">
                        {" "}
                        Politica de confidențialitate{" "}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-200 md:flex md:items-center md:justify-between">
            <div className="flex space-x-4 text-gray-400 md:order-2"></div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              {" "}
              © 2023 Website Factory: ONG.{" "}
            </p>
          </div>
        </div>
      </footer>
    </Section>
  </>
);

export default Footer;

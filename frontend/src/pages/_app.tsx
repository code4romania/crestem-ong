import '../styles/tailwind-base.css';
import '../styles/globals.css';
import { Inter } from '@next/font/google';
import Layout from '../components/layout/Layout';
import { IntlProvider } from 'react-intl';
import { useRouter } from 'next/router';
import en from '../lang/en.json';
import ro from '../lang/ro.json';

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin']
});

const messages = {
  en,
  ro
};

export default function MyApp({ Component, pageProps }) {
  const { locale } = useRouter();
  return (
    <main className={inter.className}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </IntlProvider>
    </main>
  );
}

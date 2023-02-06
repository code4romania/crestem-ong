import '../styles/tailwind-base.css';
import '../styles/globals.css';
import { Inter } from '@next/font/google';
import { appWithTranslation } from 'next-i18next';

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin']
});

function MyApp({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default appWithTranslation(MyApp);

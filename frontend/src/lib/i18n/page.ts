import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getI18nProps = async (locale, namespaces = ['common']) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, namespaces))
    }
  };
};

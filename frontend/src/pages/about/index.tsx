import { getI18nProps } from '@lib/i18n/page';
import Layout from '@layout/Layout';

function AboutPage() {
  return (
    <Layout>
      <div>About</div>
    </Layout>
  );
}

export default AboutPage;

export const getServerSideProps = (props) => getI18nProps(props.locale, ['common', 'about']);

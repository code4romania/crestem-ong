import Layout from '@layout/Layout';
import { getI18nProps } from '@lib/i18n/page';

function HomePage(props) {
  return (
    <Layout>
      <div>{props.locale}</div>
    </Layout>
  );
}

export default HomePage;

export const getServerSideProps = (props) => getI18nProps(props.locale, ['common', 'home']);

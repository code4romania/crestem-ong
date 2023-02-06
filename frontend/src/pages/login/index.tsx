import { getI18nProps } from '@lib/i18n/page';
import Layout from '@layout/Layout';

function LoginPage() {
  return (
    <Layout>
      <div>Login</div>
    </Layout>
  );
}

export default LoginPage;

export const getServerSideProps = (props) => getI18nProps(props.locale, ['common', 'login']);

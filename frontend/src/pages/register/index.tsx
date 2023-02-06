import { getI18nProps } from '@lib/i18n/page';
import Layout from '@layout/Layout';

function RegisterPage() {
  return (
    <Layout>
      <div>Register</div>
    </Layout>
  );
}

export default RegisterPage;

export const getServerSideProps = (props) => getI18nProps(props.locale, ['common', 'register']);

import { getI18nProps } from '@lib/i18n/page';
import Layout from '@layout/Layout';

function ContactPage() {
  return (
    <Layout>
      <div>Contact</div>
    </Layout>
  );
}

export default ContactPage;

export const getServerSideProps = (props) => getI18nProps(props.locale, ['common', 'contact']);

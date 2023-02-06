import { getI18nProps } from '@lib/i18n/page';
import Layout from '@layout/Layout';

function ResourcesPage() {
  return (
    <Layout>
      <div>Resources</div>
    </Layout>
  );
}

export default ResourcesPage;

export const getServerSideProps = (props) => getI18nProps(props.locale, ['common', 'resources']);

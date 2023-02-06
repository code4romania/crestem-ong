import { getI18nProps } from '@lib/i18n/page';
import Layout from '@layout/Layout';

function LibraryPage() {
  return (
    <Layout>
      <div>Library</div>
    </Layout>
  );
}

export default LibraryPage;

export const getServerSideProps = (props) => getI18nProps(props.locale, ['common', 'library']);

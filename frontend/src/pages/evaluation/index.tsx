import { getI18nProps } from '@lib/i18n/page';
import Layout from '@layout/Layout';

function EvaluationPage() {
  return (
    <Layout>
      <div>Evaluation</div>
    </Layout>
  );
}

export default EvaluationPage;

export const getServerSideProps = (props) => getI18nProps(props.locale, ['common', 'evaluation']);

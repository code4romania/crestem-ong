import MainHeader from '@atom/../molecules/MainHeader';
import MainFooter from '@molecule/MainFooter';
import SecondaryHeader from '@molecule/SecondaryHeader';
import SecondaryFooter from '@molecule/SecondaryFooter';

function Layout({ children }) {
  return (
    <>
      <MainHeader />
      <SecondaryHeader />
      <main>{children}</main>
      <SecondaryFooter />
      <MainFooter />
    </>
  );
}

export default Layout;

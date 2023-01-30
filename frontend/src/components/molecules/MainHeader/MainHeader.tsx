import logo from '../../../../public/logo.svg';
import Image from 'next/image';
import style from './MainHeader.module.css';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import LanguagePicker from '@atom/LanguagePicker';
import Button from '@atom/Button';

function MainHeader() {
  return (
    <header className={style.header}>
      <nav className={style.wrapper}>
        <Image className="logo" src={logo} alt={'Crestem ONG logo'} />
        <Link className={style.link} href="/about">
          <FormattedMessage id={'header.navbar.about.label'}></FormattedMessage>
        </Link>
        <Link className={style.link} href="/evaluation">
          <FormattedMessage id={'header.navbar.evaluation.label'}></FormattedMessage>
        </Link>
        <Link className={style.link} href="/library">
          <FormattedMessage id={'header.navbar.library.label'}></FormattedMessage>
        </Link>
        <Link className={style.link} href="/resources">
          <FormattedMessage id={'header.navbar.resources.label'}></FormattedMessage>
        </Link>
        <Link className={style.link} href="/contact">
          <FormattedMessage id={'header.navbar.contact.label'}></FormattedMessage>
        </Link>
        <div className={style.buttonsWrapper}>
          <div className={style.languagePicker}>
            <LanguagePicker />
          </div>
          <Button className={style.registerButton} size={'md'}>
            <Link href="/register">
              <FormattedMessage id={'header.navbar.register.button.label'}></FormattedMessage>
            </Link>
          </Button>
          <Link className={style.loginButton} href="/login">
            <FormattedMessage id={'header.navbar.login.button.label'}></FormattedMessage>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default MainHeader;

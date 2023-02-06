import logo from '../../../../public/logo.svg';
import Image from 'next/image';
import style from './MainHeader.module.css';
import Link from 'next/link';
import LanguagePicker from '@atom/LanguagePicker';
import Button from '@atom/Button';
import {useTranslation} from "next-i18next";

function MainHeader() {
  const { t } = useTranslation();
  return (
    <header className={style.header}>
      <nav className={style.wrapper}>
        <Image className="logo" src={logo} alt={'Crestem ONG logo'} />
        <Link className={style.link} href="/about">
          <span>{t('main.header.navbar.about.label')}</span>
        </Link>
        <Link className={style.link} href="/evaluation">
          <span>{t('main.header.navbar.evaluation.label')}</span>
        </Link>
        <Link className={style.link} href="/library">
          <span>{t('main.header.navbar.library.label')}</span>
        </Link>
        <Link className={style.link} href="/resources">
          <span>{t('main.header.navbar.resources.label')}</span>
        </Link>
        <Link className={style.link} href="/contact">
          <span>{t('main.header.navbar.contact.label')}</span>
        </Link>
        <div className={style.buttonsWrapper}>
          <LanguagePicker />
          <Button className={style.registerButton} size={'md'}>
            <Link href="/register">
              <span>{t('main.header.navbar.register.button.label')}</span>
            </Link>
          </Button>
          <Link className={style.loginButton} href="/login">
            <span>{t('main.header.navbar.login.button.label')}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default MainHeader;

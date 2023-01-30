import code4roIcon from '../../../../public/icons/code4ro.svg';
import facebookIcon from '../../../../public/icons/facebook.svg';
import instagramIcon from '../../../../public/icons/instagram.svg';
import twitterIcon from '../../../../public/icons/twitter.svg';
import githubIcon from '../../../../public/icons/github.svg';
import dribbbleIcon from '../../../../public/icons/dribbble.svg';
import style from './MainFooter.module.css';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';

function MainFooter() {
  return (
    <footer className={style.footer}>
      <div className={style.advertisement}>
        <div className={style.filler} />
        <Image src={code4roIcon} alt={'Code4Romania logo'} />
        <span className={style.advertisementText}>
          <FormattedMessage id={'main.footer.advertisement.text'} />
        </span>
        <Link className={style.advertisementLinkText} href="#">
          <FormattedMessage id={'main.footer.advertisement.link.text'}></FormattedMessage>
        </Link>
        <div className={style.filler} />
      </div>
      <div className={style.info}>
        <div className={style.filler} />
        <div className={style.wrapper}>
          <div className={style.copyrightTextWrapper}>
            <FormattedMessage
              id={'main.footer.copyright.text'}
              values={{ year: new Date().getFullYear() }}
            />
          </div>
          <div className={style.spaceFiller} />
          <div className={style.socialButtonsWrapper}>
            <Link className={style.icon} href="#">
              <Image src={facebookIcon} alt={'Facebook logo'} />
            </Link>
            <Link className={style.icon} href="#">
              <Image src={instagramIcon} alt={'Instagram logo'} />
            </Link>
            <Link className={style.icon} href="#">
              <Image src={twitterIcon} alt={'Twitter logo'} />
            </Link>
            <Link className={style.icon} href="#">
              <Image src={githubIcon} alt={'Github logo'} />
            </Link>
            <Link className={style.icon} href="#">
              <Image src={dribbbleIcon} alt={'Dribbble logo'} />
            </Link>
          </div>
        </div>
        <div className={style.filler} />
      </div>
    </footer>
  );
}

export default MainFooter;

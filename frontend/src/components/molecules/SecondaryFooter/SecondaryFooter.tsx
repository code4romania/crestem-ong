import style from './SecondaryFooter.module.css';
import Button from '@atom/Button';
import Link from 'next/link';
import cx from 'classnames';
import phoneIcon from '@icons/phone.svg';
import emailIcon from '@icons/email.svg';
import locationIcon from '@icons/location.svg';
import Image from 'next/image';
import React from 'react';
import Input from '@atom/Input';
import { useTranslation } from 'next-i18next';

function SecondaryFooter() {
  const { t } = useTranslation();
  return (
    <div className={style.footer}>
      <div className={style.wrapper}>
        <div className={cx(style.sectionHeader, style.sectionHeaderText)}>
          <span>{t('secondary.footer.contact.us.label')}</span>
        </div>
        <div className={style.section}>
          <Image src={phoneIcon} className={style.icon} alt={'Phone icon'} />
          <span className={style.sectionText}>
            <span>{t('secondary.footer.phone.and.schedule.text')}</span>
          </span>
        </div>
        <div className={style.section}>
          <Image src={emailIcon} className={style.icon} alt={'Email icon'} />
          <span className={style.sectionText}>
            <span>{t('secondary.footer.support.email.text')}</span>
          </span>
        </div>
        <div className={style.section}>
          <Image src={locationIcon} className={style.icon} alt={'Location icon'} />
          <span className={style.sectionText}>
            <span>{t('secondary.footer.address.text')}</span>
          </span>
        </div>
      </div>
      <hr className={style.divider} />
      <div className={style.wrapper}>
        <div className={cx(style.sectionHeader, style.sectionHeaderText)}>
          <span>{t('secondary.footer.newsletter.subscribe.label')}</span>
        </div>
        <div className={style.section}>
          <span className={style.sectionText}>
            <span>{t('secondary.footer.newsletter.description.text')}</span>
          </span>
        </div>
        <div className={style.section} />
        <div className={style.section}>
          <Input
            className={style.subscribeInput}
            type={'email'}
            placeholder={'secondary.footer.subscribe.input.placeholder'}
          />
          <Button size={'md'}>
            <Link href="/register">
              <span>{t('secondary.footer.subscribe.button.label')}</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SecondaryFooter;

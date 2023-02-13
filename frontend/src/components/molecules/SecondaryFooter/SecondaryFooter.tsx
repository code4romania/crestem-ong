import style from './SecondaryFooter.module.css';
import Button from '@atom/Button';
import cx from 'classnames';
import phoneIcon from '@icons/phone.svg';
import emailIcon from '@icons/email.svg';
import locationIcon from '@icons/location.svg';
import Image from 'next/image';
import React, { useState } from 'react';
import Input from '@atom/Input';
import { useTranslation } from 'next-i18next';
import NewsletterApi from '@api/newsletter';

function SecondaryFooter() {
  const [subscribeToNewsletterEmail, setSubscribeToNewsletterEmail] = useState(undefined);
  const [subscribeToNewsletterErrorMessage, setSubscribeToNewsletterErrorMessage] =
    useState(undefined);

  function subscribeToNewsletter() {
    NewsletterApi.subscribe({
      newsletterSubscriptionDTO: {
        email: subscribeToNewsletterEmail
      }
    }).then((res) => {
      if (res.status != 200) {
        setSubscribeToNewsletterErrorMessage(res['message']);
      }
    });
  }

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
            onChange={(event) => {
              setSubscribeToNewsletterErrorMessage(undefined);
              setSubscribeToNewsletterEmail(event.target.value);
            }}
            errorMessage={subscribeToNewsletterErrorMessage}
          />
          <Button onClick={subscribeToNewsletter} size={'md'}>
            <span>{t('secondary.footer.subscribe.button.label')}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SecondaryFooter;

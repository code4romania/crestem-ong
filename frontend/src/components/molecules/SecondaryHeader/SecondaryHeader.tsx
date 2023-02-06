import fdscIcon from '../../../../public/icons/fdsc.svg';
import isdbIcon from '../../../../public/icons/isdb.svg';
import style from './SecondaryHeader.module.css';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

function SecondaryHeader() {
  return (
    <div className={style.header}>
      <Link className={style.image} href="#">
        <Image src={isdbIcon} alt={'ISDB logo'} />
      </Link>
      <Link className={style.image} href="#">
        <Image src={fdscIcon} alt={'FDSC logo'} />
      </Link>
    </div>
  );
}

export default SecondaryHeader;

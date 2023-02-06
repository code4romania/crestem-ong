import Image from 'next/image';
import style from './LanguagePicker.module.css';
import globe from '../../../../public/icons/globe.svg';
import DropdownMenu from '@molecule/DropdownMenu';

function LanguagePicker() {
  const languages = [
    {
      label: 'en',
      path: '/en'
    },
    {
      label: 'ro',
      path: '/ro'
    }
  ];
  return (
    <>
      <DropdownMenu items={languages}>
        <Image className={style.globe} src={globe} alt={'LanguagePicker SVG'} />
      </DropdownMenu>
    </>
  );
}

export default LanguagePicker;

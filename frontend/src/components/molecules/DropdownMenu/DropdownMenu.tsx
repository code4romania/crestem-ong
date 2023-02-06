import { useEffect, useRef, useState } from 'react';
import style from './DropdownMenu.module.css';
import cx from 'classnames';
import Link from 'next/link';

export interface DropdownMenuItemProps {
  label: string;
  path: string;
}

export interface DropdownMenuProps {
  items: DropdownMenuItemProps[];
  children: string | any;
}

function DropdownMenu({ items, children }: DropdownMenuProps) {
  const useOutsideClick = (ref, callback) => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    useEffect(() => {
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [ref]);
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const ref = useRef();
  useOutsideClick(ref, () => {
    setMenuVisible(false);
  });
  return (
    <div
      ref={ref}
      className="cursor-pointer flex flex-row items-center z-50"
      onClick={() => setMenuVisible(!menuVisible)}>
      {children}
      <div className={cx(style.dropdown, !menuVisible && style.invisible)}>
        <div className={style.items}>
          {items.map((item) => (
            <div key={item.label} className={style.item}>
              <Link href={item.path} locale={item.label}>
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DropdownMenu;

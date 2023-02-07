import cx from 'classnames';

import style from './Button.module.css';

export interface ButtonProps {
  id?: string;
  onClick?: any;
  className?: string;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  children?: string | any;
}

export default function Button({ id, className, onClick, size = 'md', children }: ButtonProps) {
  return (
    <button id={id} className={cx(style[size], style.button, className)} onClick={onClick}>
      {children}
    </button>
  );
}

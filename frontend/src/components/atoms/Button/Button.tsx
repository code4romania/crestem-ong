import cx from 'classnames';

import style from './Button.module.css';

export interface ButtonProps {
  id?: string;
  className?: string;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  children?: string | any;
}

export default function Button({ id, className, size = 'md', children }: ButtonProps) {
  return (
    <button id={id} className={cx(style[size], style.button, className)}>
      {children}
    </button>
  );
}

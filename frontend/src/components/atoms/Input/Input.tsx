import cx from 'classnames';

import style from './Input.module.css';
import { useTranslation } from 'next-i18next';

export interface InputProps {
  id?: string;
  type?: string;
  className?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Input({
  id,
  type = 'text',
  className,
  size = 'md',
  placeholder
}: InputProps) {
  const { t } = useTranslation();
  return (
    <input
      id={id}
      type={type}
      className={cx(style[size], style.input, className)}
      placeholder={t(placeholder)}
      onFocus={(e) => (e.target.placeholder = '')}
      onBlur={(e) => (e.target.placeholder = t(placeholder))}
    />
  );
}

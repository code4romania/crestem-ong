import cx from 'classnames';

import style from './Input.module.css';
import { useTranslation } from 'next-i18next';

export interface InputProps {
  id?: string;
  type?: string;
  className?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  onChange?: any;
  errorMessage?: string;
}

export default function Input({
  id,
  type = 'text',
  className,
  size = 'md',
  placeholder,
  onChange,
  errorMessage = undefined
}: InputProps) {
  const { t } = useTranslation();
  return (
    <>
      <div className={cx(style[size], style.wrapper)}>
        <input
          id={id}
          type={type}
          className={cx(style['input-' + size], className, style.base, errorMessage ? style.error : style.valid)}
          placeholder={t(placeholder)}
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = t(placeholder))}
          onChange={onChange}
        />
        <div className={cx(style.errorText)}>{errorMessage}</div>
      </div>
    </>
  );
}

import { FC } from 'react';
import classnames from 'classnames';

import { Props } from './types';

import styles from './Icons.module.css';

export const Mic: FC<Props> = ({ className }) => {
  const rootClassName = classnames(styles.root, className);
  return (
    <svg
      width="36"
      height="35"
      viewBox="0 0 36 35"
      fill="none"
      className={rootClassName}
    >
      <path
        d="M18.0021 21.0452C20.4723 21.0452 22.4663 19.1135 22.4663 16.7204V8.07087C22.4663 5.67783 20.4723 3.74609 18.0021 3.74609C15.5318 3.74609 13.5378 5.67783 13.5378 8.07087V16.7204C13.5378 19.1135 15.5318 21.0452 18.0021 21.0452ZM26.7967 16.7204C26.0675 16.7204 25.4574 17.2394 25.3384 17.9458C24.7283 21.3335 21.6777 23.9284 18.0021 23.9284C14.3265 23.9284 11.2759 21.3335 10.6658 17.9458C10.5467 17.2394 9.93658 16.7204 9.20742 16.7204C8.29968 16.7204 7.58539 17.4989 7.71932 18.3638C8.44849 22.6886 12.0199 26.0764 16.514 26.6962V29.6948C16.514 30.4876 17.1836 31.1363 18.0021 31.1363C18.8205 31.1363 19.4902 30.4876 19.4902 29.6948V26.6962C23.9842 26.0764 27.5556 22.6886 28.2848 18.3638C28.4336 17.4989 27.7044 16.7204 26.7967 16.7204Z"
        fill="currentColor"
      />
    </svg>
  );
};
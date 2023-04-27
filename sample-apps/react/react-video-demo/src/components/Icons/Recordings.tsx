import { FC } from 'react';
import classnames from 'classnames';

import { Props } from './types';

import styles from './Icons.module.css';

export const Recordings: FC<Props> = ({ className }) => {
  const rootClassName = classnames(styles.root, className);
  return (
    <svg
      fill="currentColor"
      height="24px"
      width="24px"
      className={rootClassName}
      viewBox="0 0 218.42 218.42"
    >
      <path
        d="M158.414,190.405C183.601,172.247,200,142.659,200,109.237c0-55.228-44.771-100-100-100c-55.229,0-100,44.771-100,100
c0,53.802,42.489,97.672,95.741,99.903l122.679,0.042v-18.777H158.414z M69.461,125.171c-8.8,8.8-23.066,8.8-31.866,0
s-8.8-23.067,0-31.866c8.8-8.8,23.066-8.8,31.866,0S78.261,116.371,69.461,125.171z M115.934,171.643c-8.8,8.8-23.067,8.8-31.867,0
c-8.8-8.8-8.8-23.066,0-31.866c8.8-8.8,23.067-8.8,31.867,0C124.732,148.576,124.732,162.843,115.934,171.643z M115.934,78.699
c-8.8,8.8-23.067,8.8-31.867,0c-8.8-8.8-8.8-23.066,0-31.866c8.8-8.801,23.067-8.801,31.867,0
C124.732,55.633,124.732,69.899,115.934,78.699z M130.538,125.171c-8.8-8.8-8.8-23.066,0-31.866c8.8-8.8,23.066-8.8,31.867,0
c8.8,8.799,8.8,23.066-0.001,31.866C153.604,133.971,139.338,133.971,130.538,125.171z"
      />
    </svg>
  );
};
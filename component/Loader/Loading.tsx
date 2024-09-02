
import React from 'react';
import styles from './style.module.css'; // Import the CSS module

type Props = {}

const Loading: React.FC<Props> = () => {
  return (
    <div className={styles['dot-spinner']}>
        <div className={styles['dot-spinner__dot']}></div>
        <div className={styles['dot-spinner__dot']}></div>
        <div className={styles['dot-spinner__dot']}></div>
        <div className={styles['dot-spinner__dot']}></div>
        <div className={styles['dot-spinner__dot']}></div>
        <div className={styles['dot-spinner__dot']}></div>
        <div className={styles['dot-spinner__dot']}></div>
        <div className={styles['dot-spinner__dot']}></div>
    </div>
  );
}

export default Loading;

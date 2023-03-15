import React from 'react';
import cN from 'classnames';
import styles from './styles.module.scss';

const Spinner = () => {
    return (
        <div className={cN(styles.spinner, 'spinner')}>
            <div className={styles.spinner_content}>
                {Array.from(Array(12).keys()).map((i: number) => (
                    <div key={i} className={cN(styles.sk_circle, styles[`sk_circle${i + 1}`])} />
                ))}
            </div>
        </div>
    );
};

export default Spinner;

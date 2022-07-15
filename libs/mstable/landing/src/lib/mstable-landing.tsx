import styles from './mstable-landing.module.css';

/* eslint-disable-next-line */
export interface MstableLandingProps {}

export function MstableLanding(props: MstableLandingProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MstableLanding!</h1>
    </div>
  );
}

export default MstableLanding;

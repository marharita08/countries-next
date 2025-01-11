import styles from "./error-display.module.css";

type Properties = {
  message: string
}

const ErrorDisplay: React.FC<Properties> = ({ message }) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.title}>Error</h1>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};

export { ErrorDisplay };

import styles from "./ErrorCard.module.css";

export default function ErrorCard({ message }) {
  return (
    <div className={styles.errorCard}>
      <span className={styles.errorIcon}>!</span>
      <p>{message}</p>
    </div>
  );
}

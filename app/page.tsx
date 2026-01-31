import styles from "./page.module.css";

export default async function Page() {
  return (
    <div className={styles.page}>
      <main className={styles.main}></main>
      <footer className={styles.footer}></footer>
    </div>
  );
}

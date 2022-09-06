import Head from "next/head";
import styles from "../styles/Home.module.css";

export const appName = "クイズ当てゲーム";

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>{appName}</title>
      </Head>
      <header className={`${styles.header} ${styles.commonTop}`}>
        <h1>{appName}</h1>
      </header>
      <main className={`${styles.main} ${styles.commonTop} `}>{children}</main>
    </div>
  );
}

export default Layout;

import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      {/* <div className={styles.spinner}></div> */}
      <div className={styles.ldsDualRing}></div>
    </div>
  );
}

export default Spinner;

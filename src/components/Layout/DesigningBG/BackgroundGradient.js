import React from "react";
import styles from "./BackgroundGradient.module.css";

const BackgroundGradient = () => {
  return (
    <div className={styles["gradient-background-wrapper"]}>
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />
    </div>
  );
};

export default BackgroundGradient;

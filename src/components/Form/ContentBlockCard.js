// components/ContentBlockCard.js
import React from "react";
import Card from "react-bootstrap/Card";
// import CustomLabel from "./CustomLabel";
import styles from "./ContentBlockCard.module.css";

const ContentBlockCard = ({  children, className = "", innerClassName = "" }) => {
  return (
    <Card className={`mb-4 p-3 ${styles.contentBlock} ${className}`}>
      {/* {label && (
        // <label className={styles.gradientLabel}>
        //   {label}
        // </label>
        <CustomLabel text={label} />
      )} */}
      <div className={`${styles.contentBlockInner} ${innerClassName}`}>
        {children}
      </div>
    </Card>
  );
};

export default ContentBlockCard;

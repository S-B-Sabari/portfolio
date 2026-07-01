import React from "react";
import Experience from "@/components/Experience";
import styles from "./page.module.css";

export default function ExperiencePage() {
  return (
    <main className={styles.experienceContainer}>
      <Experience />
    </main>
  );
}

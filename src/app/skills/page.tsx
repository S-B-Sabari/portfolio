import React from "react";
import Skills from "@/components/Skills";
import styles from "./page.module.css";

export default function SkillsPage() {
  return (
    <main className={styles.skillsContainer}>
      <Skills />
    </main>
  );
}

import React from "react";
import Projects from "@/components/Projects";
import styles from "./page.module.css";

export default function ProjectsPage() {
  return (
    <main className={styles.projectsContainer}>
      <Projects />
    </main>
  );
}

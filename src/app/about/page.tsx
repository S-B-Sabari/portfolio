import React from "react";
import About from "@/components/About";
import Education from "@/components/Education";
import Achievements from "@/components/Achievements";
import Certificates from "@/components/Certificates";
import styles from "./page.module.css";

export default function AboutPage() {
  return (
    <main className={styles.aboutContainer}>
      <About />
      <Education />
      <Certificates />
      <Achievements />
    </main>
  );
}

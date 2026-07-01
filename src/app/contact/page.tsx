import React from "react";
import Contact from "@/components/Contact";
import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <main className={styles.contactContainer}>
      <Contact />
    </main>
  );
}

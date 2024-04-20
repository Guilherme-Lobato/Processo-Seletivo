import styles from "./LoginCard.module.css";
import React from "react";

interface LoginCardProps {
    title: string;
    children: React.ReactNode;
}

export default function LoginCard({ title, children }: LoginCardProps) {
    return(
        <div className={styles.card}>
            <h2 className={styles.title}>{title}</h2>
            {children}
        </div>
    );
}

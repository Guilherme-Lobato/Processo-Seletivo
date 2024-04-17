import styles from "./button.module.css";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function ButtonEntrar({ children, ...props }: ButtonProps) {
    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    );
}

import styles from "./input.module.css";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputLogin: React.FC<InputProps> = (props: InputProps) => {
    return (
        <input className={styles.input} {...props} />
    );
}

export default InputLogin;

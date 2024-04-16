import styles from "./button.module.css"

export default function ButtonEntrar({ children, ...props }) {
    return (
        <button className={styles.button} {...props}>
            {children}
        </button>
    )
}
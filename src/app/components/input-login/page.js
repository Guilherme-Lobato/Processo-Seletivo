import styles from "./input.module.css"

export default function InputLogin({ props }) {
    return (
        <input className={styles.input} {...props} />
    )
}
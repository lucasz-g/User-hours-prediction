import styles from './Input.module.css';

export default function Input( {tipo, label, valor, onChange} ) {
    return(
        
        <div className={styles.inputContainer}>
            <div className={styles.label}>
                <label>{label}</label>
            </div>
            <input className={styles.inputField} type={tipo} value={valor} onChange={onChange}/>
        </div>
    )
}
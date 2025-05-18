import styles from './Button.module.css';

export default function Button( {conteudo, tipo} ) {
    return(
        <button type={tipo} className={styles.button}>{conteudo}</button>
    )
}
import styles from './Subtitulo.module.css';

export default function Subtitulo({ texto }) {
  return (
    <div className={styles.subtitulo}>
      <p>{texto}</p>
    </div>
  );
}

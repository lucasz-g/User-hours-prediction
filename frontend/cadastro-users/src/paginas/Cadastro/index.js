import Form from "../../componentes/Form";
import Subtitulo from "../../componentes/Subtitulo";
import Titulo from "../../componentes/Titulo";
import styles from "./Cadastro.module.css";

export default function Cadastro() {
  return (
    <div className={styles.pagina}>
      <Titulo titulo="Cadastrar Usuário" />
      <Subtitulo texto={"Fill in the registration data. It will take a couple of seconds."}  />
      <Form />
    </div>
  );
}

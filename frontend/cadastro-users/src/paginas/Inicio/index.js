import Subtitulo from "../../componentes/Subtitulo";
import Titulo from "../../componentes/Titulo";

export default function Inicio() {
    return (
        <div className="container">
            <Titulo titulo="Bem-vindo!" />
            <Subtitulo texto={"Welcome to our platform!\nExplore and enjoy all the features we offer."}/>
        </div>
    );
}
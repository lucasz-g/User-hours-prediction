import styles from "./Users.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../componentes/Button";
import Titulo from "../../componentes/Titulo";

export default function Users() {
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        try {
            const response = axios.get("http://localhost:8080/usuarios");
            setUsers(response.data);
            return users;
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            alert("Erro ao buscar usuários. Tente novamente.");
        }   
    }

    return (
        <div className={styles.container}>
            <Titulo titulo="Usuários Cadastrados"/>
        </div>
    )
}
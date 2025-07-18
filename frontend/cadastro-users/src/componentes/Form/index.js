import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import styles from './Form.module.css';
import SelectBox from '../SelectBox';
import axios from 'axios';

export default function Form() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [genero, setGenero] = useState('');
    const [quantidadeFilhos, setQuantidadeFilhos] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (senha.length < 8 || !/[A-Z]/.test(senha) || !/[0-9]/.test(senha)) {
            alert("A senha deve ter pelo menos 8 caracteres, uma letra maiúscula e um número.");
            return;
        }

        const idade = calcularIdade(dataNascimento);
        const erroFilhos = validarFilhos(quantidadeFilhos);

        if (erroFilhos) {
            alert(erroFilhos);
            return;
        }

        try {
            const payload = {
                username: nome,
                email: email,
                password: senha,
                age: idade,
                gender: genero,
                number_of_kids: quantidadeFilhos
            };

            const response = await axios.post('http://localhost:8000/users', payload);

            console.log("Dados enviados:", payload);
            console.log("Resposta do servidor:", response.data);

            if (response.status !== 201) {
                throw new Error("Erro ao cadastrar usuário");
            }

            alert("Usuário cadastrado com sucesso!");

            // Limpar os campos
            setNome('');
            setEmail('');
            setSenha('');
            setDataNascimento('');
            setGenero('');
            setQuantidadeFilhos('');

        } catch (error) {
            if (error.response && error.response.status === 422) {
                console.error("Erro de validação:", error.response.data);
                alert("Erro de validação: " + JSON.stringify(error.response.data.detail));
            } else {
                console.error("Erro ao cadastrar usuário:", error);
                alert("Erro ao cadastrar usuário. Tente novamente.");
            }
        }
    };

    const calcularIdade = (dataNascimento) => {
        const dataAtual = new Date();
        const anoAtual = dataAtual.getFullYear();
        const mesAtual = dataAtual.getMonth() + 1; // Meses começam do zero
        const diaAtual = dataAtual.getDate();

        const [anoNascimento, mesNascimento, diaNascimento] = dataNascimento.split('-').map(Number);

        let idade = anoAtual - anoNascimento;

        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
            idade--;
        }

        return idade;
    }

    const validarFilhos = (quantidadeFilhos) => {
        if (quantidadeFilhos < 0) {
            return "A quantidade de filhos não pode ser negativa.";
        }
        return null;
    }

    return (
        <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formItem}>
                <Input
                    label="Digite seu nome"
                    tipo="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>
    
            <div className={styles.formItem}>
                <Input
                    label="Digite seu e-mail"
                    tipo="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
    
            <div className={styles.formItem}>
                <Input
                    label="Digite sua senha"
                    tipo="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>
    
            <div className={styles.formItem}>
                <Input
                    label="Data de Nascimento"
                    tipo="date"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                />
            
            </div>
                        <div className={styles.formItem}>
                <SelectBox
                    label="Selecione seu gênero"
                    options={[
                        { label: 'Homem', value: 'MALE' },
                        { label: 'Mulher', value: 'FEMALE' },
                    ]}
                    onChange={(value) => setGenero(value)}
                />
            </div>
    
            <div className={styles.formItem}>
                <Input
                    label="Quantidade de filhos"
                    tipo="number"
                    value={quantidadeFilhos}
                    onChange={(e) => setQuantidadeFilhos(Number(e.target.value))}
                />
            </div>
    
            <div className={styles.formItem} style={{ width: "100%" }}>
                <Button conteudo="Cadastrar" tipo="submit" />
            </div>
        </form>
    </div>
    
    );
}
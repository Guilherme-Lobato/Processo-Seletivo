"use client"

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import LoginCard from "../components/CardLoginCadastro/page";
import styles from "./CadastroUser.module.css";
import InputLogin from "../components/input-login/page";
import ButtonEntrar from "../components/button-entrar/page";
import Link from "next/link";

interface FormData {
    nome: string;
    email: string;
    senha: string;
}

export default function CadastroUser() {
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        email: '',
        senha: ''
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8000/cadastrar-usuario', { usuario: formData });
            console.log(response.data); 
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    };
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className={styles.background}>
            <LoginCard title="Crie sua conta">
                <form className={styles.form} onSubmit={handleSubmit}>
                    <InputLogin type="text" placeholder="Seu Nome" name="nome" value={formData.nome} onChange={handleChange} />
                    <InputLogin type="email" placeholder="Seu E-mail" name="email" value={formData.email} onChange={handleChange} />
                    <InputLogin type="password" placeholder="Sua senha" name="senha" value={formData.senha} onChange={handleChange} />
                    <ButtonEntrar type="submit">Cadastrar</ButtonEntrar>
                    <Link href="/LoginUser" passHref className={styles.redirect}>
                        Já possui conta?
                    </Link>
                </form>
            </LoginCard>   
        </div>
    );
}

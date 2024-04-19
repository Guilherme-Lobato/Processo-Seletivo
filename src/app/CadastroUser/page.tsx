"use client"
import { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import LoginCard from "../components/CardLoginCadastro/page";
import styles from "./CadastroUser.module.css";
import InputLogin from "../components/input-login/page";
import ButtonEntrar from "../components/button-entrar/page";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ValoresCadastro {
    nome: string;
    email: string;
    senha: string;
}

export default function CadastroUser() {
    const router = useRouter();
    const [valoresCadastro, setValoresCadastro] = useState<ValoresCadastro>({
        nome: '',
        email: '',
        senha: ''
    });

    const enviarCadastro = async (event: FormEvent<HTMLFormElement>) => {
        try {
            const response = await axios.post('http://localhost:8000/cadastrar-usuario', { usuario: valoresCadastro });
            console.log(response.data);
            router.push("/LoginUser"); 
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValoresCadastro(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className={styles.background}>
            <LoginCard title="Crie sua conta">
                <form className={styles.form} onSubmit={enviarCadastro}>
                    <InputLogin type="text" placeholder="Seu Nome" name="nome" value={valoresCadastro.nome}  onChange={handleChange}/>
                    <InputLogin type="email" placeholder="Seu E-mail" name="email" value={valoresCadastro.email}  onChange={handleChange}/>
                    <InputLogin type="password" placeholder="Sua senha" name="senha" value={valoresCadastro.senha}  onChange={handleChange}/>
                    <ButtonEntrar type="submit">Cadastrar</ButtonEntrar>
                    <Link href="/LoginUser" passHref className={styles.redirect}>
                        Já possui conta?
                    </Link>
                </form>
            </LoginCard>   
        </div>
    );
}

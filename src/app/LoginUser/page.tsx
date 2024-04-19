"use client";
import React, { useState } from "react";
import Link from "next/link";
import LoginCard from "../components/CardLoginCadastro/page";
import styles from "./LoginUser.module.css";
import InputLogin from "../components/input-login/page";
import ButtonEntrar from "../components/button-entrar/page";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginUser() {
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    const logar = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        try {
            const logar = await axios.post("https://fakestoreapi.com/auth/login", {
                name: nome,
                password: senha
            });
            if (logar.status === 200) {
                const data = logar.data;
                console.log("Token recebido:", data.token);
        
                router.push("/HomePage");
            } else {
                const logar = await axios.post("http://localhost:8000/login", {
                    nome,
                    senha
                });
                router.push("/HomePage");
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    }

    return (
        <div className={styles.background}>
            <LoginCard title="Entre em sua conta">
                <form className={styles.form}>
                    <InputLogin
                        type="text" 
                        placeholder="Seu nome de usuário"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <InputLogin
                        type="password"
                        placeholder="Sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                    <ButtonEntrar onClick={logar}>Entrar</ButtonEntrar>
                    <Link href="/CadastroUser" passHref className={styles.redirect}>
                        Ainda não possui conta?
                    </Link>
                </form>
            </LoginCard>
        </div>
    );
}

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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");

    const logar = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const logar = await axios.post("https://fakestoreapi.com/auth/login", {
                username: username,
                password: password
            });
            if (logar.status === 200) {
                const data = logar.data;
                console.log("Token recebido:", data.token);
        
                router.push("/HomePage");
            } else {
                const logar = await axios.post("http://localhost:8000/login", {
                    name: username,
                    password:password
                });
                router.push("/HomePage");
            }
        } catch (error) {
            setError("Credenciais incorretas, por favor, tente novamente.");
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputLogin
                        type="password"
                        placeholder="Sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    <ButtonEntrar onClick={logar}>Entrar</ButtonEntrar>
                    <Link href="/CadastroUser" passHref className={styles.redirect}>
                        Ainda não possui conta?
                    </Link>
                </form>
            </LoginCard>
        </div>
    );
}

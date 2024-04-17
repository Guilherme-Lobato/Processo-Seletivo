import React from "react";
import Link from "next/link";
import LoginCard from "../components/CardLoginCadastro/page";
import styles from "./LoginUser.module.css";
import InputLogin from "../components/input-login/page";
import ButtonEntrar from "../components/button-entrar/page";

export default function LoginUser() {
    return (
        <div className={styles.background}>
            <LoginCard title="Entre em sua conta">
                <form className={styles.form}>
                    <InputLogin type="email" placeholder="Seu E-mail" />
                    <InputLogin type="password" placeholder="Sua senha" />
                    <ButtonEntrar>Entrar</ButtonEntrar>
                    <Link href="/CadastroUser" passHref className={styles.redirect}>
                        Ainda não possui conta?
                    </Link>
                </form>
            </LoginCard>
        </div>
    );
}

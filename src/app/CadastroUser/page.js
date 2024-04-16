import LoginCard from "../components/CardLoginCadastro/page";
import styles from "./CadastroUser.module.css";
import InputLogin from "../components/input-login/page";
import ButtonEntrar from "../components/button-entrar/page"
import Link from "next/link";

export default function CadastroUser() {
    return (
        <div className={styles.background}>
            <LoginCard title="Crie sua conta">
                <form className={styles.form}>
                    <InputLogin type="text" placeholder="Seu Nome"/>
                    <InputLogin type="email" placeholder="Seu E-mail"/>
                    <InputLogin type="password" placeholder="Sua senha"/>
                    <ButtonEntrar>Cadastrar</ButtonEntrar>
                    <Link className={styles.redirect} href="/LoginUser">Já possui conta?</Link>
                </form>
            </LoginCard>   
        </div>
    );
}
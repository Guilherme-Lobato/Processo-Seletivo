"use client"
import React, { useState } from "react";
import styles from "./CadastroProduto.module.css";
import Input from "../input-login/page";
import axios from "axios";

interface Props {
    fechar: (arg?: any) => void;
    salvar: (valores: ValoresCadastro) => void; 
}

interface ValoresCadastro {
    title: string,
    price: string,
    description: string,
    category: string,
    imageUrl: string
}

const Cadastro: React.FC<Props> = ({ fechar, salvar }) => {
    const [error, setError] = useState<string>('');
    const [valoresCadastro, setValoresCadastro] = useState<ValoresCadastro>({
        title: '',
        price: '',
        description: '',
        category: '',
        imageUrl: ''
    });

    const salvarForm = async () => {
        if (!valoresCadastro.title || !valoresCadastro.price || !valoresCadastro.description || !valoresCadastro.category || !valoresCadastro.imageUrl) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const formData = new FormData();
            Object.entries(valoresCadastro).forEach(([key, value]) => {
                formData.append(key, value);
            });

            await axios.post('http://localhost:8000/salvar-produtos', formData);
            salvar(valoresCadastro);
            fechar();
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            setError("Erro ao salvar produto.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, campo: keyof ValoresCadastro) => {
        const { value } = e.target;
        setValoresCadastro(prevState => ({
            ...prevState,
            [campo]: value
        }));
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={fechar}></span>
                <div className={styles.column}>
                    <Input
                        type="text"
                        placeholder="Título"
                        value={valoresCadastro.title}
                        onChange={(e) => handleChange(e, 'title')}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Preço"
                        value={valoresCadastro.price}
                        onChange={(e) => handleChange(e, 'price')}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Descrição"
                        value={valoresCadastro.description}
                        onChange={(e) => handleChange(e, 'description')}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Categoria"
                        value={valoresCadastro.category}
                        onChange={(e) => handleChange(e, 'category')}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="URL da imagem"
                        value={valoresCadastro.imageUrl}
                        onChange={(e) => handleChange(e, 'imageUrl')}
                        required
                    />
                </div>
                {error && <span className={styles.error}>{error}</span>}
                <div className={styles.buttons}>
                    <button className={styles.salvar} onClick={salvarForm}>Salvar</button>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;

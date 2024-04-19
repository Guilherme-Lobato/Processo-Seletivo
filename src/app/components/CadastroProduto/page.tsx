import React, { useState } from "react";
import styles from "./CadastroProduto.module.css";
import Input from "../input-login/page";
import axios from "axios";

interface Props {
    fechar: () => void;
    salvar: (data: FormData) => void; 
}

const Cadastro: React.FC<Props> = ({ fechar, salvar }) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState(""); 

    const salvarForm = async () => {
        const valoresForm = new FormData();
        valoresForm.append('title', title);
        valoresForm.append('price', price);
        valoresForm.append('description', description);
        valoresForm.append('category', category);
        valoresForm.append('image', imageUrl); 

        try {
            await axios.post('http://localhost:8000/salvar-produtos', valoresForm);
            salvar(valoresForm);
            fechar();
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={fechar}></span>
                <div className={styles.column}>
                    <Input
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Preço"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Categoria"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="URL da imagem" 
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)} 
                        required
                    />
                </div>

                <div className={styles.buttons}>
                    <button className={styles.salvar} onClick={salvarForm}>Salvar</button>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;

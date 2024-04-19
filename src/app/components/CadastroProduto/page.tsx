import React, { useState } from "react";
import styles from "./CadastroProduto.module.css";
import Input from "../input-login/page";
import axios from "axios";

interface Props {
    onClose: () => void;
    onSave: (data: FormData) => void; // Modificando o tipo de onSave para FormData
}

const Cadastro: React.FC<Props> = ({ onClose, onSave }) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState(""); 

    const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setImageUrl(url);
    };

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('image', imageUrl); 

        try {
            await axios.post('http://localhost:8000/salvar-produtos', formData);
            onSave(formData);
            onClose();
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}></span>
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
                        onChange={handleImageUrlChange} 
                        required
                    />
                </div>

                <div className={styles.buttons}>
                    <button className={styles.salvar} onClick={handleSave}>Salvar</button>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;

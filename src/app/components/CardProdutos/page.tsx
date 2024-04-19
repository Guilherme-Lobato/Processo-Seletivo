"use client"
import estilos from "./card.module.css";
import React, { useState, useEffect } from "react";

interface Produto {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

const CardProdutos = ({
    listaProdutos,
    novaListaProdutos,
}: {
    listaProdutos: Produto[];
    novaListaProdutos: React.Dispatch<React.SetStateAction<Produto[]>>;

}) => {
    const [descricaoExpandida, setDescricaoExpandida] = useState<number | null>(null);

    const excluirProduto = (idprodutoParaExcluir: number) => {
        const produtosAtualizados = listaProdutos.filter((produtos) => produtos.id !== idprodutoParaExcluir);
        novaListaProdutos(produtosAtualizados);
    };

    const saibaMais = (id: number) => {
        if (descricaoExpandida === id) {
            setDescricaoExpandida(null);
        } else {
            setDescricaoExpandida(id);
        }
        console.log(id)
    };
 
    return (
        <div>
            {listaProdutos.map((produto, index) => (
                <div key={index} className={estilos.cardContainer} onMouseLeave={() => setDescricaoExpandida(null)}>
                    <div className={estilos.card}>
                        <button className={estilos.deleteButton} onClick={() => excluirProduto(produto.id)}>x</button>
                        <div className={estilos.imageContainer}>
                            <img className={estilos.cardImage} src={produto.image} alt={produto.title} />
                        </div>
                        <div className={estilos.cardContent}>
                            <h3 className={estilos.cardTitle}>{produto.title}</h3>
                            <p className={estilos.cardPrice}>${produto.price}</p>
                            <button 
                                className={estilos.cardButton} 
                                onClick={() => saibaMais(produto.id)}
                            >
                                Saiba Mais
                            </button>
                            {descricaoExpandida === produto.id && (
                                <p className={estilos.cardDescription}>{produto.description}</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardProdutos;

"use client"
import estilos from "./card.module.css";
import React, { useState, useEffect } from "react";

interface Produto {
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
    const excluirProduto = (produtoParaExcluir: Produto) => {
        const produtosAtualizados = listaProdutos.filter((produtos) => produtos.title !== produtoParaExcluir.title);
        novaListaProdutos(produtosAtualizados);
    };

    return (
        <div>
            {listaProdutos.map((produto, index) => (
                <div key={index} className={estilos.cardContainer}>
                    <div className={estilos.card}>
                        <button className={estilos.deleteButton} onClick={() => excluirProduto(produto)}>x</button>
                        <div className={estilos.imageContainer}>
                            <img className={estilos.cardImage} src={produto.image} alt={produto.title} />
                        </div>
                        <div className={estilos.cardContent}>
                            <h3 className={estilos.cardTitle}>{produto.title}</h3>
                            <p className={estilos.cardPrice}>${produto.price}</p>
                            <button className={estilos.cardButton}>Saiba Mais</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardProdutos;

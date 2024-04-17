"use client"

import React, { useState, useEffect } from "react";
import styles from "./homePage.module.css";
import axios from "axios";

interface Product {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export default function HomePage() {
    const [productData, setProductData] = useState<Product[]>([]);
    const [expandedProduct, setExpandedProduct] = useState<Product | null>(null);

    useEffect(() => {
        importApi();
    }, []);

    const downloadCSV = () => {
        const csvContent =
            "data:text/csv;charset=utf-8," +
            productData.map((product) => {
                return (
                    Object.values(product)
                        .map((value) => (typeof value === "string" ? `"${value}"` : value))
                        .join(",") + "\n"
                );
            }).join("");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
    };

    const importApi = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            setProductData((prevProducts) => [...prevProducts, ...response.data]);
        } catch (error) {
            console.log("Erro ao obter dados da API:", error);
        }
    };

    const handleExpandProduct = (product: Product) => {
        if (expandedProduct && expandedProduct.title === product.title) {
            setExpandedProduct(null); // Fecha o card se já estiver expandido
        } else {
            setExpandedProduct(product); // Expandir o card com a descrição do produto
        }
    };

    const handleDeleteProduct = (product: Product) => {
        const updatedProducts = productData.filter((p) => p.title !== product.title);
        setProductData(updatedProducts);
    };

    return (
        <div className={styles.background}>
            <div className={styles.menu}>
                <button className={styles.button} onClick={downloadCSV}>EXPORTAR ARQUIVO CSV</button>
                <label htmlFor="file-upload" className={styles.labelinput}>IMPORTAR ARQUIVO CSV</label>
                <input id="file-upload" className={styles.inputcsv} type="file" accept="csv/CSV" />
                <button className={styles.button} onClick={importApi}>IMPORTAR DADOS DA API</button>
                <button className={styles.button}>ADICIONAR NOVO PRODUTO</button>
            </div>

            <div className={styles.container}>
                <div className={styles.cardContainer}>
                    {productData.map((product, index) => (
                        <div className={styles.card} key={index}>
                            <button className={styles.deleteButton} onClick={() => handleDeleteProduct(product)}>x</button>
                            <img className={styles.cardImage} src={product.image} alt={product.title} />
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{product.title}</h3>
                                <p className={styles.cardPrice}>${product.price}</p>
                                <button
                                    className={styles.cardButton}
                                    onClick={() => handleExpandProduct(product)}
                                >
                                    {expandedProduct && expandedProduct.title === product.title
                                        ? "Fechar"
                                        : "Saiba Mais"}
                                </button>
                                {expandedProduct && expandedProduct.title === product.title && (
                                    <p className={styles.cardDescription}>{product.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

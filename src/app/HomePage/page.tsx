"use client"
import React, { useState, useEffect } from "react";
import styles from "./homePage.module.css";
import axios from "axios";
import CardProdutos from "../components/CardProdutos/page"; 

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

    const importApi = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            setProductData(response.data);
        } catch (error) {
            console.log("Erro ao obter dados da API:", error);
        }
    };

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

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    const text = e.target.result as string;
                    processDataFromCSV(text);
                }
            };
            reader.readAsText(file);
        }
    };

    const processDataFromCSV = (csvText: string) => {
        const lines = csvText.split("\n");
        const newData: Product[] = [];
        lines.forEach((line) => {
            const [title, price, description, image, category] = line.split(",");
            newData.push({ title, price: parseFloat(price), description, image, category });
        });
        setProductData(newData);
    };

    return (
        <div className={styles.background}>
            <div className={styles.menu}>
                <button className={styles.button} onClick={downloadCSV}>EXPORTAR ARQUIVO CSV</button>
                <label htmlFor="file-upload" className={styles.labelinput}>IMPORTAR ARQUIVO CSV</label>
                <input id="file-upload" className={styles.inputcsv} type="file" accept="csv/.CSV" onChange={handleFileUpload}/>
                <button className={styles.button} onClick={importApi}>IMPORTAR DADOS DA API</button>
                <button className={styles.button}>ADICIONAR NOVO PRODUTO</button>
            </div>
            <CardProdutos
             productData={productData}
             setProductData={setProductData}
             expandedProduct={expandedProduct}
             setExpandedProduct={setExpandedProduct}/>
        </div>
    );
}

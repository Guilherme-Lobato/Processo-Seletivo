"use client"
import React, { useState, useEffect } from "react";
import styles from "./homePage.module.css";
import axios from "axios";
import CardProdutos from "../components/CardProdutos/page";
import Cadastro from "../components/CadastroProduto/page"; 
import Link from "next/link";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export default function HomePage() {
    const [valoresProduto, atualizaProduto] = useState<Product[]>([]);
    const [modalCadastro, estadoModal] = useState(false);

    const importApi = async () => {
        try {
            const buscar = await axios.get("https://fakestoreapi.com/products");
            const newProducts = buscar.data;
            atualizaProduto((prevProducts) => [...prevProducts, ...newProducts]);
            salvarProdutos(newProducts);
        } catch (error) {
            console.log("Erro ao obter dados da API:", error);
        }
    };

    const salvarProdutos = async (produtos: Product[]) => {
        try {
            const salvar = await axios.post("https://localhost:8000/salvar-produtos", { produtos });
            console.log(produtos);
        } catch (error) {
            console.log("Erro ao importar produtos:", error);
        }
    };

    const downloadCSV = () => {
        const csvContent =
            "data:text/csv;charset=utf-8," +
            valoresProduto.map((product) => {
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

    const uploadCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        lines.forEach((line, index) => {
            if (index === 0) return;
            const fields = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (fields.length === 6 || fields.length === 7) {
                const titleIndex = fields.length === 6 ? 0 : 1; 
                const title = fields[titleIndex].replace(/"/g, '').trim();
                const price = parseFloat(fields[titleIndex + 1].replace(/"/g, '').trim());
                const description = fields[titleIndex + 2].replace(/"/g, '').trim();
                const category = fields[titleIndex + 3].replace(/"/g, '').trim();
                const image = fields[titleIndex + 4].replace(/"/g, '').trim();
                const id = parseInt(fields[0].replace(/"/g, '').trim());
                newData.push({ id, title, price, description, category, image });
            } else {
                console.error("Número incorreto de campos na linha:", line);
            }
        });
        if (newData.length > 0) {
            if (valoresProduto.length > 0) {
                atualizaProduto((prevData) => [...prevData, ...newData]);
            } else {
                atualizaProduto(newData);
            }
        }
    };
    
    const cadastrarProduto = () => {
        estadoModal(true); 
    };

    return (
        <div className={styles.background}>
            <div className={styles.menu}>
                
                <button className={styles.button} onClick={downloadCSV}>EXPORTAR PRODUTOS EM FORMATO CSV</button>
                <label htmlFor="file-upload" className={styles.labelinput}>IMPORTAR PRODUTOS DE UM ARQUIVO CSV</label>
                <input id="file-upload" className={styles.inputcsv} type="file" accept="csv/.CSV" onChange={uploadCSV}/>
                <button className={styles.button} onClick={importApi}>IMPORTAR PRODUTOS DA API</button>
                <button className={styles.button} onClick={cadastrarProduto}>CADASTRAR NOVO PRODUTO</button>
                <Link href="/LoginUser" passHref className={styles.redirect}>SAIR</Link>
            </div>
            {modalCadastro && (
                <div className={styles.modalBackground}>
                    <div className={styles.modalContent}>
                        <Cadastro 
                             fechar={() => estadoModal(false)} 
                            salvar={(data) => {
                                console.log("Dados do novo produto:", data);
                            }}
                        />
                    </div>
                </div>
            )}
            <CardProdutos
                listaProdutos={valoresProduto}
                novaListaProdutos={atualizaProduto}
            />
        </div>
    );    
}

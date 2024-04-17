"use client"
import React, { useState } from "react";
import styles from "./homePage.module.css"


export default function HomePage() {
    const [tableData, setTableData] = useState([
        { title: "Guilherme", price: "Amor", description: "Muitos", image: "sds", category: "elotronic"},
        { title: "Guilherme", price: "Amor", description: "Muitos", image: "sds", category: "elotronic"},
      ]);
    
      const downloadCSV = () => {
        const csvContent =
          "data:text/csv;charset=utf-8," +
          tableData.map((row) => Object.values(row).join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
      };

    return(
        <div className={styles.background}>
            <div className={styles.menu}>
                <button className={styles.button}>IMPORTAR ARQUIVO CSV</button>
                <button className={styles.button} onClick={downloadCSV}>EXPORTAR ARQUIVO CSV</button>
                <button className={styles.button}>CRIA NOVO CARD DE PRODUTO</button>
            </div>

            <div className={styles.container}>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>
                            <th className={styles.title}>Titulo</th>
                            <th className={styles.price}>Preço</th>
                            <th className={styles.description}>Descrição</th>
                            <th className={styles.image}>Imagem</th>
                            <th className={styles.category}>Categoria</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {tableData.map((row, index) => (
                        <tr key={index}>
                            <td className={styles.title}>{row.title}</td>
                            <td className={styles.price}>{row.price}</td>
                            <td className={styles.description}>{row.description}</td>
                            <td className={styles.image}>{row.image}</td>
                            <td className={styles.category}>{row.category}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
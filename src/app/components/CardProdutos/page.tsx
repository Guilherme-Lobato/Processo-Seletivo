"use client"
import styles from "./card.module.css";
import React, { useState, useEffect } from "react";

interface Product {
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

const CardProdutos = ({
    productData,
    setProductData,
    expandedProduct,
    setExpandedProduct
}: {
    productData: Product[];
    setProductData: React.Dispatch<React.SetStateAction<Product[]>>;
    expandedProduct: Product | null;
    setExpandedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}) => {

    const handleExpandProduct = (product: Product) => {
        if (expandedProduct && expandedProduct.title === product.title) {
            setExpandedProduct(null);
        } else {
            setExpandedProduct(product);
        }
    };

    const handleDeleteProduct = (product: Product) => {
        const updatedProducts = productData.filter((p) => p.title !== product.title);
        setProductData(updatedProducts);
    };

    return (
        <div>
            {productData.map((product, index) => (
                <ProductCard
                    key={index}
                    product={product}
                    handleDeleteProduct={handleDeleteProduct}
                    handleExpandProduct={handleExpandProduct}
                    expanded={expandedProduct ? expandedProduct.title === product.title : false}
                    setExpandedProduct={setExpandedProduct}
                />
            ))}
        </div>
    );
};

const ProductCard = ({
    product,
    handleDeleteProduct,
    handleExpandProduct,
    expanded,
    setExpandedProduct
}: {
    product: Product;
    handleDeleteProduct: (product: Product) => void;
    handleExpandProduct: (product: Product) => void;
    expanded: boolean;
    setExpandedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
}) => {
    return (
        <div className={styles.cardContainer}>
            <div className={styles.card} onMouseLeave={() => setExpandedProduct(null)}>
                <button className={styles.deleteButton} onClick={() => handleDeleteProduct(product)}>x</button>
                <div className={styles.imageContainer}>
                    <img className={styles.cardImage} src={product.image} alt={product.title} />
                </div>
                <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{product.title}</h3>
                    <p className={styles.cardPrice}>${product.price}</p>
                    {expanded && <p className={styles.cardDescription}>{product.description}</p>}
                    {!expanded && (
                        <button
                            className={styles.cardButton}
                            onClick={() => handleExpandProduct(product)}
                        >
                            Saiba Mais
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardProdutos;

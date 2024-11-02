import React from "react";
import {Box} from "@mui/material";
import styles from './style.module.css';

const ProductItem = ({product}) => {
    return (
        <Box className={styles.productBox}>
            <Box className={styles.productHeader}>
                <img src={product.imageUrl} title={product.name}/>
            </Box>
            <Box className={styles.productBody}>
                <Box className={styles.item}>
                    <p className={styles.itemTitle}>Name</p>
                    <p>{product.name}</p>
                </Box>
                <Box className={styles.item}>
                    <p className={styles.itemTitle}>Category</p>
                    <p>{product.category}</p>
                </Box>
                <Box className={styles.item}>
                    <p className={styles.itemTitle}>Brand</p>
                    <p>{product.brand}</p>
                </Box>
                <Box className={styles.item}>
                    <p className={styles.itemTitle}>Price</p>
                    <p>{product.price}</p>
                </Box>
                <Box className={styles.item}>
                    <p className={styles.itemTitle}>Rating</p>
                    <p>{product.rating}</p>
                </Box>
            </Box>
        </Box>
    )
}

export default ProductItem
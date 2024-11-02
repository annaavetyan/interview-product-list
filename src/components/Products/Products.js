import styles from './style.module.css';
import Grid from '@mui/material/Grid';
import {Box, Button, Pagination} from "@mui/material";
import ProductItem from "./ProductItem";
import Container from '@mui/material/Container';
import React, {useMemo} from "react";

const Products = React.memo((props) => {
    const {currentPage, filteredProducts, pagesCount, handlePageChange, pageLimit} = props;

    const currentPageFilteredProducts = useMemo(() => filteredProducts?.slice(
        (currentPage - 1) * pageLimit,
        currentPage * pageLimit
    ), [filteredProducts, pageLimit, currentPage]);

    if (filteredProducts.length === 0) {
        return <Box style={{display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 100}}>
            <h1>No Product Found</h1>
        </Box>
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item sx={12} mb={6}>
                        <Pagination count={pagesCount} page={currentPage} onChange={handlePageChange}/>

                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    {
                        currentPageFilteredProducts?.map((product, index) => {
                            return (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <ProductItem product={product}/>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </Box>
    )
})

export default Products;
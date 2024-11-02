import styles from './style.module.css';
import React from 'react';
import {Formik} from "formik";
import Grid from "@mui/material/Grid";
import {Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Slider, TextField} from "@mui/material";
import Container from "@mui/material/Container";
import * as Yup from "yup";


const Filters = React.memo((props) => {
    const {
        categories,
        brands,
        rates,
        filters,
        sortOptions,
        resetFilters,
        handleFiltersChange,
        searchByDebounce,
        searchByName
    } = props;

    const validationSchema = Yup.object({
        priceRange: Yup.object({
            min: Yup.number().min(0, 'Minimum price must be positive'),
            max: Yup.number().min(
                Yup.ref('min'),
                'Maximum price must be greater than minimum'
            ),
        }),
    });



    return (
        <Container maxWidth="xl">
            <Formik
                initialValues={{
                    category: filters.category,
                    priceRange: filters.priceRange,
                    brand: filters.brand,
                    rating: filters.rating,
                    name: filters.name,
                    sort: filters.sort
                } }
                onSubmit={(values) => {
                    console.log(values)
                }}
                validationSchema={validationSchema}
                enableReinitialize
            >
                {
                    (formData) => {
                        const {handleChange, handleSubmit, values, touched, errors} = formData;
                        console.log('values',values)
                        return (
                            <form onSubmit={handleSubmit} style={{width: '100%', marginBottom: '40px'}}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={1}>
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            id="name"
                                            size="small"
                                            name='name'
                                            value={values.name}
                                            onChange={(e) => {
                                                handleChange(e);
                                                searchByDebounce('name',e.target.value)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="category-label">Category</InputLabel>
                                            <Select
                                                labelId="category-label"
                                                id="category"
                                                label="Category"
                                                name="category"
                                                onChange={(e) => {
                                                    handleFiltersChange("category", e.target.value)
                                                }}
                                                value={values.category}
                                            >
                                                {
                                                    categories.map((category, index) => {
                                                        return <MenuItem key={index}
                                                                         value={category}>{category}</MenuItem>
                                                    })
                                                }

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="brand-label">Brand</InputLabel>
                                            <Select
                                                labelId="brand-label"
                                                id="brand"
                                                label="Brand"
                                                name='brand'
                                                onChange={(e) => {
                                                    handleFiltersChange("brand", e.target.value)
                                                }}
                                                value={values.brand}
                                            >
                                                {
                                                    brands.map((brand, index) => {
                                                        return <MenuItem key={index} value={brand}>{brand}</MenuItem>
                                                    })
                                                }

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="rating-label">Rate</InputLabel>
                                            <Select
                                                labelId="rating-label"
                                                id="rating"
                                                label="Rating"
                                                name='rating'
                                                onChange={(e) => {
                                                    handleFiltersChange('rating', e.target.value)
                                                }}
                                                value={values.rating}
                                            >
                                                {
                                                    rates.map((rate, index) => {
                                                        return <MenuItem key={index} value={rate}>{rate}</MenuItem>
                                                    })
                                                }

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="Price Range Min"
                                                    id="filled-size-min"
                                                    size="small"
                                                    name='priceRange.min'
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        searchByDebounce('priceRange.min',e.target.value)
                                                    }}
                                                    value={values.priceRange.min}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    label="Price Range Max"
                                                    id="filled-size-max"
                                                    size="small"
                                                    name='priceRange.max'
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        searchByDebounce('priceRange.max',e.target.value)
                                                    }}
                                                    value={values.priceRange.max}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel id="sort-label">Sort</InputLabel>
                                            <Select
                                                labelId="sort-label"
                                                id="sort"
                                                label="Sort"
                                                name='sort'
                                                onChange={(e) => {
                                                    handleFiltersChange("sort", e.target.value)
                                                }}
                                                value={values.sort}
                                            >
                                                {
                                                    sortOptions?.map((sort, index) => {
                                                        return <MenuItem key={index} value={sort}>{sort}</MenuItem>
                                                    })
                                                }

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={1}>
                                        <Button onClick={resetFilters}>Reset Filters</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        )
                    }
                }
            </Formik>
        </Container>
    )
})

export default Filters
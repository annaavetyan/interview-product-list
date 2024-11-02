import './App.css';
import Filters from "./components/Filters/Filters";
import Products from "./components/Products/Products";
import {categories, rates, brands, sortOptions} from './data/data';
import {Box, Drawer, Hidden, IconButton} from "@mui/material";
import React, {useEffect, useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Loader from "./components/Loader/Loader";
import SearchMenu from "./components/SearchMenu/SearchMenu";

function App(props) {
    const [filters, setFilters] = useState({
        category: "",
        priceRange: {min: '', max: ''},
        brand: '',
        rating: 0,
        name: '',
        sort: '',
    });
    const [products, setProduct] = useState(props.products || []);
    const [filteredProducts, setFilteredProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const pageLimit = 5;
    const pagesCount = Math.ceil(filteredProducts?.length / pageLimit);

    useEffect(() => {
        setProduct(props.products)
    },[props.products])

    useEffect(() => {
        getLocalStorage();
        getProducts();
    }, []);


    useEffect(() => {
        applyFilters();
        setLoading(false)
    }, [filters, products]);

    const setLocalStorage = (filters) => {
        localStorage.setItem('filters', JSON.stringify(filters))
    }

    const getLocalStorage = () => {
        const filters = JSON.parse(localStorage.getItem('filters'));

        if (filters) {
            setFilters({...filters})
        }
    }

    const resetFilters = () => {
        setFilteredProducts(products.length ? [...products] : []);
        setFilters({
            category: "",
            priceRange: {min: '', max: ''},
            brand: '',
            rating: 0,
            name: '',
            sort: '',
        });
        localStorage.removeItem("filters");
    }

    const getProducts = () => {
        setProduct(products.length ? [...products] : []);
        setFilteredProducts(products.length ? [...products] : []);
        setLoading(false)
    }

    const applyFilters = () => {
        let sortedProducts = [];

        function compare(a, b, option) {
            if (a[option] < b[option]) {

                return -1;
            }
            if (a[option] > b[option]) {
                return 1;
            }
            return 0;
        }

        if (filters.sort) {
            sortedProducts = products.sort((a, b) => compare(a, b, filters.sort))
        }

        const newProducts = sortedProducts.length ? sortedProducts : products;

        const filteredProducts = newProducts.filter((product) => {
            const name = filters.name ? product.name.toLowerCase().includes(filters.name.toLowerCase()) : true;

            const category = filters.category ? product.category === filters.category : true;

            const brand = filters.brand ? product.brand === filters.brand : true;

            const rating = filters.rating ? product.rating === filters.rating : true;

            const price = (filters.priceRange.min | filters.priceRange.max) ? (product.price >= filters.priceRange.min && product.price < filters.priceRange.max) : true;

            return (name && category && brand && rating && price)
        });

        setFilteredProducts(filteredProducts.length ? [...filteredProducts] : [])
    }

    const handleFiltersChange = (name, value) => {
        setLoading(true);

        if (isFilterOpen) {
            setIsFilterOpen(false)
        }

        const newFilters = {...filters};

        if (!name.includes("priceRange")) {
            newFilters[name] = value;
        }

        if (name === "priceRange.min") {
            newFilters.priceRange.min = value
        }

        if (name === "priceRange.max") {
            newFilters.priceRange.max = value
        }

        setFilters({...newFilters});

        setLocalStorage(newFilters)
    }

    const handlePageChange = (e, value) => {
        setCurrentPage(value)
    }

    const handleDebounceChange = (type, search) => {
        setLoading(true);
        const newFilters = {...filters};

        if (type === 'name') {
            newFilters.name = search;
        }

        if (type === 'priceRange.min') {
            newFilters.priceRange.min = search
        }

        if (type === 'priceRange.max') {
            newFilters.priceRange.max = search
        }

        setFilters(newFilters);
        setLocalStorage({...newFilters, name: ''})
    }

    const debounce = (func, delay) => {
        let timer;

        return (type, search) => {
            clearTimeout(timer);

            timer = setTimeout(() => func(type, search), delay);
        }
    }

    const searchByDebounce = debounce(handleDebounceChange, 2000);


    if (loading) {
        return <Loader/>
    }

    return (
        <Box className="App">
            <Box p={1}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open filter"
                    onClick={() => setIsFilterOpen(true)}
                    sx={{display: {xs: 'block', md: 'none'}}} // Show only on small screens
                >
                    <Box style={{display: "flex", alignItems: "center"}}>
                        <MenuIcon/>
                        <Box style={{marginLeft: 10, fontSize: 16}}>Menu</Box>
                    </Box>

                </IconButton>
            </Box>
            <SearchMenu
                onClose={() => setIsFilterOpen(false)}
                isFilterOpen={isFilterOpen}
            >
                <Filters
                    filters={filters}
                    handleFiltersChange={handleFiltersChange}
                    categories={categories}
                    brands={brands}
                    rates={rates}
                    sortOptions={sortOptions}
                    resetFilters={resetFilters}
                    searchByDebounce={searchByDebounce}
                />
            </SearchMenu>
            <h1 className="title">Products</h1>
            <Hidden smDown={true}>
                <Filters
                    filters={filters}
                    handleFiltersChange={handleFiltersChange}
                    categories={categories}
                    brands={brands}
                    rates={rates}
                    sortOptions={sortOptions}
                    resetFilters={resetFilters}
                    searchByDebounce={searchByDebounce}
                />
            </Hidden>

            <Products
                filteredProducts={filteredProducts}
                currentPage={currentPage}
                pagesCount={pagesCount}
                handlePageChange={handlePageChange}
                pageLimit={pageLimit}

            />
        </Box>
    );
}

export default App;

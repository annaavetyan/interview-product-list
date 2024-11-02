import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';

const mockData = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        brand: "Brand A",
        price: 99.99,
        rating: 4,
        imageUrl: "https://via.placeholder.com/150/0000FF/808080?text=Electronics+A"
    },
    {
        id: 2,
        name: "Bluetooth Speaker",
        category: "Electronics",
        brand: "Brand B",
        price: 49.99,
        rating: 1,
        imageUrl: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Clothing+B"
    },
];


describe('App Component', () => {

    test('renders the product catalog', () => {
        render(<App products={mockData} />)
        expect(screen.getByText(/Wireless Headphones/i)).toBeInTheDocument();
        expect(screen.getByText(/Bluetooth Speaker/i)).toBeInTheDocument();
    });

    test('filters products by category', () => {
        render(<App products={mockData} />)
        fireEvent.change(screen.getByLabelText(/category/i), {
            target: { value: 'Electronics' },
        });

        expect(screen.getByText(/Wireless Headphones/i)).toBeInTheDocument();
        expect(screen.queryByText(/Bluetooth Speaker/i)).not.toBeInTheDocument();
    });

    test('filters products by price range', () => {
        render(<App products={mockData} />)
        fireEvent.change(screen.getByLabelText(/Price Min/i), {
            target: { value: 50 },
        });

        expect(screen.getByText(/Bluetooth Speaker/i)).toBeInTheDocument();
        expect(screen.queryByText(/Wireless Headphones/i)).not.toBeInTheDocument();
    });

    test('displays no products found', () => {
        render(<App products={mockData} />)
        fireEvent.change(screen.getByLabelText(/category/i), {
            target: { value: 'Footwear' },
        });

        expect(screen.getByText(/No products found/i)).toBeInTheDocument();
    });
});
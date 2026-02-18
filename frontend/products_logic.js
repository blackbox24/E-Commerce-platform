// products_logic.js
import { api } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const productsContainer = document.getElementById('productsContainer');
    const paginationContainer = document.getElementById('paginationContainer');
    const productCardTemplate = document.getElementById('productCardTemplate').innerHTML;

    // Simulated product data (in a real app, this would come from an API)
    const allProducts = [
        {
            id: 1,
            name: "Dynamic Product 1",
            description: "This is a dynamically loaded product.",
            imageUrl: "https://via.placeholder.com/300/FF0000/FFFFFF?text=Product+1",
            price: "19.99"
        },
        {
            id: 2,
            name: "Dynamic Product 2",
            description: "Another dynamically loaded product.",
            imageUrl: "https://via.placeholder.com/300/00FF00/FFFFFF?text=Product+2",
            price: "29.99"
        },
        {
            id: 3,
            name: "Dynamic Product 3",
            description: "Yet another dynamically loaded product.",
            imageUrl: "https://via.placeholder.com/300/0000FF/FFFFFF?text=Product+3",
            price: "39.99"
        },
        {
            id: 4,
            name: "Dynamic Product 4",
            description: "The last dynamically loaded product.",
            imageUrl: "https://via.placeholder.com/300/FFFF00/000000?text=Product+4",
            price: "49.99"
        },
        {
            id: 5,
            name: "Dynamic Product 5",
            description: "Freshly added product.",
            imageUrl: "https://via.placeholder.com/300/FF5733/FFFFFF?text=Product+5",
            price: "24.99"
        },
        {
            id: 6,
            name: "Dynamic Product 6",
            description: "Premium quality item.",
            imageUrl: "https://via.placeholder.com/300/33FF57/FFFFFF?text=Product+6",
            price: "69.99"
        },
        {
            id: 7,
            name: "Dynamic Product 7",
            description: "Limited edition product.",
            imageUrl: "https://via.placeholder.com/300/5733FF/FFFFFF?text=Product+7",
            price: "99.99"
        },
        {
            id: 8,
            name: "Dynamic Product 8",
            description: "Seasonal best-seller.",
            imageUrl: "https://via.placeholder.com/300/FFFF33/000000?text=Product+8",
            price: "34.99"
        }
    ];

    const itemsPerPage = 4;
    let currentPage = 1;

    function renderProducts(page) {
        productsContainer.innerHTML = ''; // Clear existing products
        currentPage = page;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productsToRender = allProducts.slice(startIndex, endIndex);

        const renderedProducts = Mustache.render(`{{#products}}${productCardTemplate}{{/products}}`, { products: productsToRender });
        productsContainer.innerHTML = renderedProducts;
        renderPagination();
    }

    function renderPagination() {
        paginationContainer.innerHTML = ''; // Clear existing pagination
        const totalPages = Math.ceil(allProducts.length / itemsPerPage);

        if (totalPages <= 1) return; // No pagination needed for 1 or fewer pages

        const ul = document.createElement('ul');
        ul.className = 'pagination'; // Bootstrap class for pagination

        // Previous button
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        const prevLink = document.createElement('a');
        prevLink.className = 'page-link';
        prevLink.href = '#';
        prevLink.textContent = 'Previous';
        prevLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                renderProducts(currentPage - 1);
            }
        });
        prevLi.appendChild(prevLink);
        ul.appendChild(prevLi);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${currentPage === i ? 'active' : ''}`;
            const link = document.createElement('a');
            link.className = 'page-link';
            link.href = '#';
            link.textContent = i;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                renderProducts(i);
            });
            li.appendChild(link);
            ul.appendChild(li);
        }

        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        const nextLink = document.createElement('a');
        nextLink.className = 'page-link';
        nextLink.href = '#';
        nextLink.textContent = 'Next';
        nextLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                renderProducts(currentPage + 1);
            }
        });
        nextLi.appendChild(nextLink);
        ul.appendChild(nextLi);

        paginationContainer.appendChild(ul);
    }

    // Initial render
    renderProducts(1);
});

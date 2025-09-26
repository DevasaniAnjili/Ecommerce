const productsContainer = document.getElementById("products-container");
const cartCount = document.getElementById("cart-count");
const cartItemsContainer = document.getElementById("cart-items");
const cartPage = document.getElementById("cart-page");
const cartBtn = document.getElementById("cart-btn");

let allProducts = [];
let cart = {}

const fetchProducts = async () => {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        allProducts = data;
        displayProducts(allProducts);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

const displayProducts = (products) => {
    productsContainer.innerHTML = "";
    products.forEach((product) => {
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title.slice(0, 15)}...</h3>
            <p>${product.description.slice(0, 150)}...</p>
            <p class="price">$ ${product.price}</p>
            <div class="buttons">
            <button class="details-btn">Details</button>
            <button class="add-to-cart-btn">Add to Cart</button>
            </div>
        `;

        div.querySelector(".add-to-cart-btn").addEventListener("click", () => addToCart(product));
        productsContainer.appendChild(div);
    });
};





const addToCart = (product) => {
    if (cart[product.id]) {
        cart[product.id].quantity += 1;
    } else {
        cart[product.id] = { ...product, quantity: 1 };
    }
    updateCartUI();
};

const updateCartUI = () => {
    cartItemsContainer.innerHTML = "";
    let totalCount = 0;
    Object.values(cart).forEach((item) => {
        totalCount += item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <div style="display:flex;align-items:center;">
                <img src="${item.image}" alt="${item.title}">
                <span>${item.title} (x${item.quantity})</span>
            </div>
            <span>$ ${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartCount.textContent = totalCount;

    
};




document.querySelector(".products-category-buttons").addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return; 

    if (e.target.classList.contains("category-all-btn")) {
        displayProducts(allProducts);
    } 
    else if (e.target.classList.contains("category-mens-btn")) {
        displayProducts(allProducts.filter(p => p.category === "men's clothing"));
    } 
    else if (e.target.classList.contains("category-womens-btn")) {
        displayProducts(allProducts.filter(p => p.category === "women's clothing"));
    } 
    else if (e.target.classList.contains("category-jewelery-btn")) {
        displayProducts(allProducts.filter(p => p.category === "jewelery"));
    } 
    else if (e.target.classList.contains("category-electronics-btn")) {
        displayProducts(allProducts.filter(p => p.category === "electronics"));
    }
});

fetchProducts();



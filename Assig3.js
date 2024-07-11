const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const productList = document.getElementById('productList');
const addProductButton = document.getElementById('addProductButton');
const productNameInput = document.getElementById('productNameInput');
const productPriceInput = document.getElementById('productPriceInput');
const productUrlInput = document.getElementById('productUrlInput');


fetchProducts('fruit');


searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        fetchProducts(searchTerm);
    }
});

addProductButton.addEventListener('click', addProduct);

function fetchProducts(searchTerm) {
    fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => renderProducts(data.products));
}


function renderProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const price = product.price ? product.price.toFixed(2) : (Math.random() * 100).toFixed(2);
        const productCard = createProductCard(product, price);
        productList.appendChild(productCard);
    });
}


function createProductCard(product, price) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <h2>${product.title}</h2>
        <p class="price">Price: $${price}</p>
        <button class="remove-button">Remove</button>
    `;
    productCard.querySelector('.remove-button').addEventListener('click', () => {
        productCard.remove();
        
    });
    return productCard;
}


function addProduct() {
    const name = productNameInput.value.trim();
    const price = parseFloat(productPriceInput.value.trim());
    const imageUrl = productUrlInput.value.trim();

    if (name && !isNaN(price) && imageUrl) {
        const newProduct = { title: name, price: price, thumbnail: imageUrl };
        const productCard = createProductCard(newProduct, price.toFixed(2));
        productList.appendChild(productCard);
        clearFormInputs();
    } else {
        alert('Please fill in all fields correctly.');
    }
}

function clearFormInputs() {
    productNameInput.value = '';
    productPriceInput.value = '';
    productUrlInput.value = '';
}

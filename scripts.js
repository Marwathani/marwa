// Carousel Functionality
let currentIndex = 0;
const items = document.querySelectorAll('.menu-item');
const totalItems = items.length;

const showSlide = () => {
    items.forEach(item => item.classList.remove('active'));
    items[currentIndex].classList.add('active');
};

document.querySelector('.arrow.left').addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
    showSlide();
});

document.querySelector('.arrow.right').addEventListener('click', () => {
    currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
    showSlide();
});

// Cart Functionality
let cart = [];
const cartCountElement = document.getElementById('cart-count');
const totalPriceElement = document.getElementById('total-price');
const cartItemsElement = document.getElementById('cart-items');
const cartSection = document.getElementById('cart');
const closeCartBtn = document.getElementById('close-cart-btn');

const updateCart = () => {
    cartCountElement.textContent = cart.length;
    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeFromCart('${item.name}')">Remove</button>`;
        cartItemsElement.appendChild(li);
        total += item.price;
    });

    totalPriceElement.textContent = total.toFixed(2);
};

const addToCart = (name, price) => {
    cart.push({ name, price });
    updateCart();
};

const removeFromCart = (name) => {
    cart = cart.filter(item => item.name !== name);
    updateCart();
};

document.getElementById('cart-icon').addEventListener('click', () => {
    cartSection.classList.toggle('show');
});

closeCartBtn.addEventListener('click', () => {
    cartSection.classList.remove('show');
});

// Menu Items (Static items)
document.querySelectorAll('.menu-item').forEach(item => {
    const name = item.querySelector('h3').textContent;
    const price = parseFloat(item.getAttribute('data-price'));
    item.querySelector('.add-to-cart').addEventListener('click', () => addToCart(name, price));
});

// Ingredient Selection
const fruitCheckboxes = document.querySelectorAll('.fruit');
const nutCheckboxes = document.querySelectorAll('.nuts');
const milkButtons = document.querySelectorAll('.milk');
const extraCheckbox = document.querySelector('.extra');
const addToCartBtn = document.getElementById('add-to-cart');
let selectedMilk = null;

fruitCheckboxes.forEach(fruit => {
    fruit.addEventListener('change', () => {
        let selectedFruits = [...fruitCheckboxes].filter(f => f.checked);
        if (selectedFruits.length > 3) {
            fruit.checked = false;
            alert('You can select a maximum of 3 fruits.');
        }
    });
});

nutCheckboxes.forEach(nut => {
    nut.addEventListener('change', () => {
        let selectedNuts = [...nutCheckboxes].filter(n => n.checked);
        if (selectedNuts.length > 1) {
            nut.checked = false;
            alert('You can select a maximum of 1 nut.');
        }
    });
});

milkButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedMilk = button.innerText;
        milkButtons.forEach(btn => btn.style.backgroundColor = '');
        button.style.backgroundColor = '#ff6666';
    });
});

addToCartBtn.addEventListener('click', () => {
    let selectedItems = [];
    let price = 0;

    fruitCheckboxes.forEach(fruit => {
        if (fruit.checked) {
            selectedItems.push(fruit.value);
            price += parseFloat(fruit.dataset.price);
        }
    });

    nutCheckboxes.forEach(nut => {
        if (nut.checked) {
            selectedItems.push(nut.value);
            price += parseFloat(nut.dataset.price);
        }
    });

    if (selectedMilk) {
        selectedItems.push(selectedMilk);
        price += 1.33;
    } else {
        alert('Please select a milk option.');
        return;
    }

    if (extraCheckbox.checked) {
        selectedItems.push(extraCheckbox.value);
        price += parseFloat(extraCheckbox.dataset.price);
    }

    addToCart(selectedItems.join(', '), price);
});
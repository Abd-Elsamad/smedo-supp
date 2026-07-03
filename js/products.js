// =========================================
// PRODUCTS DATA
// =========================================

const products = [

    {
        id: 1,
        name: "Applied Nutrition ISO XP",
        brand: "Applied Nutrition",
        category: "Protein",
        price: 2899,
        oldPrice: 3299,
        image: "images/products/iso-xp.png",
        rating: 5,
        sale: true
    },

    {
        id: 2,
        name: "Gold Standard Whey",
        brand: "Optimum Nutrition",
        category: "Protein",
        price: 3150,
        oldPrice: 3500,
        image: "images/products/gold-standard.png",
        rating: 5,
        sale: true
    },

    {
        id: 3,
        name: "Kevin Levrone Gold Whey",
        brand: "Kevin Levrone",
        category: "Protein",
        price: 2550,
        oldPrice: 2850,
        image: "images/products/kevin-gold.png",
        rating: 4,
        sale: true
    },

    {
        id: 4,
        name: "ABE Pre Workout",
        brand: "Applied Nutrition",
        category: "Pre Workout",
        price: 1699,
        oldPrice: 1899,
        image: "images/products/abe.png",
        rating: 4,
        sale: false
    }

];


// =========================================
// HTML ELEMENTS
// =========================================

const productsContainer = document.querySelector(".products-container");


// =========================================
// CREATE STARS
// =========================================

function createStars(rating){

    let stars = "";

    for(let i = 1; i <= 5; i++){

        if(i <= rating){

            stars += `<i class="fa-solid fa-star"></i>`;

        }else{

            stars += `<i class="fa-regular fa-star"></i>`;

        }

    }

    return stars;

}


// =========================================
// CREATE PRODUCT CARD
// =========================================

function createProductCard(product){

    return `

        <div class="product-card">

            <div class="product-image">

                ${product.sale ? `<span class="sale-badge">SALE</span>` : ""}

                <button
                    class="favorite-btn">

                    <i class="fa-regular fa-heart"></i>

                </button>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>

            <div class="product-info">

                <p class="product-brand">

                    ${product.brand}

                </p>

                <h3 class="product-title">

                    ${product.name}

                </h3>

                <div class="price">

                    <span class="new-price">

                        ${product.price} EGP

                    </span>

                    <span class="old-price">

                        ${product.oldPrice} EGP

                    </span>

                </div>

                <div class="rating">

                    ${createStars(product.rating)}

                </div>

                <button
                    class="add-cart"
                    data-id="${product.id}">

                    Add To Cart

                </button>

            </div>

        </div>

    `;

}
// =========================================
// RENDER PRODUCTS
// =========================================

function renderProducts(){

    // تفريغ الحاوية
    productsContainer.innerHTML = "";

    // المرور على جميع المنتجات
    products.forEach(product=>{

        productsContainer.innerHTML += createProductCard(product);

    });

}


// =========================================
// ADD TO CART
// =========================================

function addToCart(id){

    // البحث عن المنتج
    const product = products.find(item=>item.id===id);

    if(!product) return;

    // البحث إذا كان موجود في السلة
    const existingProduct = cart.find(item=>item.id===id);

    if(existingProduct){

        // زيادة الكمية
        existingProduct.quantity++;

    }else{

        // إضافة منتج جديد
        cart.push({

            ...product,

            quantity:1

        });

    }

    // حفظ السلة
    saveCart();

    // تحديث البيانات
    updateCartCount();

    updateTotal();

    renderCart();

}


// =========================================
// ADD BUTTON EVENTS
// =========================================

function addCartEvents(){

    const buttons = document.querySelectorAll(".add-cart");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            const id = Number(button.dataset.id);

            addToCart(id);

        });

    });

}


// =========================================
// START APP
// =========================================

renderProducts();

addCartEvents();
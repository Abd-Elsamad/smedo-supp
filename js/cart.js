// =========================================
// CART DATA
// =========================================

// قراءة السلة من Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =========================================
// HTML ELEMENTS
// =========================================

const cartSidebar = document.querySelector(".cart-sidebar");

const cartItems = document.querySelector(".cart-items");

const cartTotal = document.querySelector(".cart-total");

const cartCount = document.querySelector(".cart-count");

const openCartBtn = document.querySelector(".cart-button");

const closeCartBtn = document.querySelector(".close-cart");


// =========================================
// SAVE CART
// =========================================

function saveCart(){

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

}
// =========================================
// UPDATE CART COUNT
// =========================================

function updateCartCount(){

    cartCount.textContent = cart.reduce(

        (total,item)=> total + item.quantity,

        0

    );

}


// =========================================
// UPDATE TOTAL
// =========================================

function updateTotal(){

    let total = 0;

    cart.forEach(product=>{

        total += product.price * product.quantity;

    });

    cartTotal.textContent = `${total} EGP`;

}
// =========================================
// OPEN CART
// =========================================

if(openCartBtn){

    openCartBtn.addEventListener("click",(e)=>{

        e.preventDefault();

        cartSidebar.classList.add("active");

    });

}


// =========================================
// CLOSE CART
// =========================================

if(closeCartBtn){

    closeCartBtn.addEventListener("click",()=>{

        cartSidebar.classList.remove("active");

    });

}
// =========================================
// RENDER CART
// =========================================

function renderCart(){

    // التأكد من وجود عنصر السلة
    if(!cartItems) return;

    // تفريغ السلة
    cartItems.innerHTML = "";

    // لو السلة فارغة
    if(cart.length === 0){

        cartItems.innerHTML = `

            <p class="empty-cart">

                Your cart is empty

            </p>

        `;

        return;

    }

    // إنشاء عناصر السلة
    cart.forEach((product,index)=>{

        cartItems.innerHTML += `

            <div class="cart-item">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="cart-item-info">

                    <h4>

                        ${product.name}

                    </h4>

                    <span>

                        ${product.price} EGP

                    </span>

                    <div class="quantity">

                        <button
                            class="minus"
                            data-index="${index}"
                        >

                            -

                        </button>

                        <span>

                            ${product.quantity}

                        </span>

                        <button
                            class="plus"
                            data-index="${index}"
                        >

                            +

                        </button>

                    </div>

                </div>

                <button
                    class="remove-item"
                    data-index="${index}"
                >

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        `;

    });

    removeItemEvents();

    quantityEvents();

}
// =========================================
// REMOVE PRODUCT
// =========================================

function removeItem(index){

    cart.splice(index,1);

    saveCart();

    updateCartCount();

    updateTotal();

    renderCart();

}
// =========================================
// REMOVE EVENTS
// =========================================

function removeItemEvents(){

    const buttons = document.querySelectorAll(".remove-item");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            const index = Number(button.dataset.index);

            removeItem(index);

        });

    });

}
// =========================================
// QUANTITY EVENTS
// =========================================

function quantityEvents(){

    const plusButtons = document.querySelectorAll(".plus");

    const minusButtons = document.querySelectorAll(".minus");

    plusButtons.forEach(button=>{

        button.addEventListener("click",()=>{

            const index = Number(button.dataset.index);

            cart[index].quantity++;

            saveCart();

            updateCartCount();

            updateTotal();

            renderCart();

        });

    });

    minusButtons.forEach(button=>{

        button.addEventListener("click",()=>{

            const index = Number(button.dataset.index);

            if(cart[index].quantity > 1){

                cart[index].quantity--;

            }else{

                cart.splice(index,1);

            }

            saveCart();

            updateCartCount();

            updateTotal();

            renderCart();

        });

    });

}
// =========================================
// CLEAR CART
// =========================================

function clearCart(){

    cart = [];

    saveCart();

    updateCartCount();

    updateTotal();

    renderCart();

}


// =========================================
// CHECKOUT
// =========================================

const checkoutBtn = document.querySelector(".checkout-btn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click",()=>{

        if(cart.length===0){

            alert("Your cart is empty!");

            return;

        }

        alert("Thank you for your order ❤️");

        clearCart();

    });

}


// =========================================
// START CART
// =========================================

updateCartCount();

updateTotal();

renderCart();

const messageNum = document.querySelector('.header__message-notification');
const messageList = document.querySelector('.header__message-list');
const checkBoxAllRead = document.querySelector('.js-checkbox-all-read');
const messageItems = document.querySelectorAll('.js-message-item');
const deleteHistory = document.getElementsByClassName('js-delete-history');
const historyItems = document.querySelectorAll('.js-history-item');
const video = document.getElementById('myVideo');

// Function to update unread notifications
function updateUnreadCount() {
    const unreadCount = messageList.querySelectorAll('.header__message-item--unread').length;
    
    if (unreadCount > 0) {
        messageNum.textContent = unreadCount;
        messageNum.style.display = 'block';
    } else {
        messageNum.textContent = '';
        messageNum.style.display = 'none';
    }
}

// Handle checkBoxAllRead click event to mark all as read
checkBoxAllRead.addEventListener('click', function() {
    messageItems.forEach(function(messageItem) {
        if (messageItem.classList.contains('header__message-item--unread')) {
            messageItem.classList.remove('header__message-item--unread');
        }
    })
    
    updateUnreadCount(); // Update new unread count
})

// Handle events when reading each notification
messageItems.forEach(function(messageItem) {
    messageItem.addEventListener('click', function(event) {
        event.preventDefault()
        if (messageItem.classList.contains('header__message-item--unread')) {
            // this.style.background = 'var(--white-color)';
            messageItem.classList.remove('header__message-item--unread');
        }
        
        updateUnreadCount(); // Update new unread count
    })
})

updateUnreadCount(); // Initially, update unread count

// Delete search history
for (let i = 0; i < deleteHistory.length; i++) {
    deleteHistory[i].addEventListener('click', function(event) {
        if (event.target.classList.contains('js-delete-history')) {
            event.stopPropagation();
            let listItem = this.parentNode;
            listItem.parentNode.removeChild(listItem);
        }
    })
}

// Save search history
var inputSearch = document.querySelector('.js-search-input');
var unorderedList = document.querySelector('.js-ul-search');
var searchBtn = document.querySelector('.js-search-btn');

function addListItem() {
    let newListItem = document.createElement('js-history-item');
    newListItem.classList.add('header__search-history-item');
    newListItem.style.fontSize = '1.4rem';
    newListItem.style.color = 'var(--text-color)';

    let linkListItem = document.createElement('a');
    linkListItem.classList.add('js-style');
    let closeListItem = document.createElement('i');
    closeListItem.classList.add('js-style', 'fas', 'fa-close');

    let textInput = document.createTextNode(inputSearch.value);
    newListItem.appendChild(textInput);
    newListItem.appendChild(linkListItem);
    newListItem.appendChild(closeListItem);
    unorderedList.appendChild(newListItem);
    inputSearch.value = '';
}

// Press search
searchBtn.addEventListener('click', addListItem);
inputSearch.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addListItem();
    }
});

// eventListenner: 'onclick = function()'
// function increase() {
//     document.querySelectorAll('.js-quantity').stepUp();
// }

// function decrease() {
//     document.querySelectorAll('.js-quantity').stepDown();
// }

function handleQuantityChange(parameters) {
    let inputQuantity = parameters.querySelectorAll('.js-quantity');
    let increaseBtn = parameters.querySelectorAll('.js-increase-btn');
    let decreaseBtn = parameters.querySelectorAll('.js-decrease-btn');
    let inputDisplayValue = parameters.querySelectorAll('.js-display-quantity');
    let itemPrice = parameters.querySelectorAll('.header__cart-product-item-price');

    // Add thousands separator to number
    function addCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Save the initial default value of itemPrice
    let defaultPrices = [];
    for (let i = 0; i < itemPrice.length; i++) {
        defaultPrices[i] = parseInt(itemPrice[i].textContent.replace(/\D/g, ''));
    }

    // Save the initial default value of inputDisplayValue
    let defaultQuantities = [];
    for (let i = 0; i < inputDisplayValue.length; i++) {
        defaultQuantities[i] = parseInt(inputDisplayValue[i].dataset.defaultValue);
    }

    // Update value itemPrice
    function updatePrice(i) {
        let quantity = parseInt(inputDisplayValue[i].textContent);
        let defaultPrice = defaultPrices[i];
        let defaultQuantity = defaultQuantities[i];
        let newPrice = defaultPrice + ((quantity - defaultQuantity) * defaultPrice);
        itemPrice[i].textContent = addCommas(newPrice) + 'đ';
    }

    // getValue()
    for (let i = 0; i < inputQuantity.length; i++) {
        inputQuantity[i].addEventListener('input', function() {
            let inputValue = parseInt(this.value);
            inputDisplayValue[i].textContent = inputValue;
            updatePrice(i);
        })
    }

    // increase()
    for (let i = 0; i < increaseBtn.length; i++) {
        increaseBtn[i].addEventListener('click', function() {
            let inputNumber = this.parentNode.querySelector('.js-quantity');
            let maxValue = parseInt(inputNumber.max);
            let currentValue = parseInt(inputNumber.value);
            if (currentValue < maxValue) {
                inputNumber.value = currentValue + 1;
                inputDisplayValue[i].textContent = currentValue + 1;
                updatePrice(i);
            }
        })
    }

    // decrease()
    for (let i = 0; i < decreaseBtn.length; i++) {
        decreaseBtn[i].addEventListener('click', function() {
            let inputNumber = this.parentNode.querySelector('.js-quantity');
            let minValue = parseInt(inputNumber.min);
            let currentValue = parseInt(inputNumber.value);
            if (currentValue > minValue) {
                inputNumber.value = currentValue - 1;
                inputDisplayValue[i].textContent = currentValue - 1;
                updatePrice(i);
            }
        })
    }
}

handleQuantityChange(document); // Handle quantity change

// Play and repeat video
// Tag <iframe>
video.addEventListener("load", function() {
    this.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
});

// Tag <video>
// video.addEventListener("ended", function() {
//     this.currentTime = 0;
//     this.play();
// })

// Product classification
var productClassificationItems = document.querySelectorAll('.container__product-classification-item');
var perPage = 10;
var currentPage = 1;
var lengthItems = productClassificationItems.length;
var numPages = Math.ceil(lengthItems / perPage);
var prevBtn = document.querySelector('.container__product-classification-pagination-prev');
var nextBtn = document.querySelector('.container__product-classification-pagination-next');

// Show pages
function showPage(page) {
    currentPage = page;

    for (let i = 0; i < lengthItems; i++) {
        if (i < (currentPage - 1) * perPage || i >= currentPage * perPage) {
            productClassificationItems[i].style.display = 'none';
        } else {
            productClassificationItems[i].style.display = 'flex';
        }
    }
    
    // Turn off/on the Prev/Next btn
    if (currentPage === 1) {
        prevBtn.classList.add('container__pagination-disabled');
    } else {
        prevBtn.classList.remove('container__pagination-disabled');
    }
    
    if (currentPage === numPages) {
        nextBtn.classList.add('container__pagination-disabled');
    } else {
        nextBtn.classList.remove('container__pagination-disabled');
    }
}

// Move to previous page
function prevPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

// Move to next page
function nextPage() {
    if (currentPage < numPages) {
        showPage(currentPage + 1);
    }
}

// Catch the event when pressing Prev/Next
prevBtn.addEventListener('click', function(event) {
    event.preventDefault();
    prevPage();
})

nextBtn.addEventListener('click', function(event) {
    event.preventDefault();
    nextPage();
})

showPage(1); //Show first page

// Drop icon <3
let likeBtns = document.querySelectorAll('.container__product-item-like');
let likedIcons = document.querySelectorAll('.container__product-item-like-icon');

likeBtns.forEach(function(likeBtn, index) {
    let liked = likedIcons[index];
    
    likeBtn.addEventListener('click', function(event) {
        event.preventDefault();

        if (liked.classList.contains('fas')) {
            liked.classList.remove('fas');
            liked.classList.add('far');
        } else {
            liked.classList.add('fas');
            liked.classList.remove('far');
        }
    })
})

// getCurrentYear()
let currentYear = new Date().getFullYear();
document.getElementById('currentYear').innerHTML = currentYear;

// Select a category
document.addEventListener('DOMContentLoaded', function() {
    let categoryItems = Array.from(document.querySelectorAll('.category-item'));
    let selectedIndex = 0;

    // Default first element
    categoryItems[selectedIndex].classList.add('category-item--product-designation');

    // Handle event when click on category
    categoryItems.forEach(function(item, index) {
        item.addEventListener('click', function(event) {
            event.preventDefault();

            categoryItems.forEach(function(li) {
                li.classList.remove('category-item--product-designation');
            })

            this.classList.add('category-item--product-designation');
            selectedIndex = index;
        })
    })
})

// Sort by price
let itemSelection = document.querySelectorAll('.select-input__item-link');

itemSelection.forEach(function(item) {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        let selectedText = item.textContent;
        let selectionLabel = document.querySelector('.filter-bar__selection-label');
        selectionLabel.textContent = selectedText;
    })
})

// Select search scope
let searchOptionItems = document.querySelectorAll('.header__search-option-item');
let searchSelectLabel = document.querySelector('.header__search-select-label');
searchSelectLabel.textContent = searchOptionItems[0].textContent;
searchOptionItems[0].classList.add('header__search-option-item--active');

searchOptionItems.forEach(function(item) {
    item.addEventListener('click', function() {
        if (!item.classList.contains('header__search-option-item--active')) {
            searchOptionItems.forEach(function(li) {
                li.classList.remove('header__search-option-item--active');
            })
            searchSelectLabel.textContent = this.textContent;
            this.classList.add('header__search-option-item--active');
        }
    })
})

// CRUD of cart
let listCart = document.querySelector('#js-cart');
let productItem = listCart.querySelectorAll('.header__cart-product-item');
let productDeleteBtn = document.querySelector('#js-remove-product');
let liChecked = [];

// Remove product from cart
productDeleteBtn.addEventListener('click', function() {
    liChecked = [];
    for (let productInCart of listCart.querySelectorAll('li')) {
        if (productInCart.querySelector("input[type='checkbox']").checked) {
            liChecked.push(productInCart);
        }
    }
    for (let productInCart of liChecked) {
        listCart.removeChild(productInCart);
        cartNotification.textContent = listCart.querySelectorAll('li').length;
    }
})

// Add product to cart
document.addEventListener('DOMContentLoaded', function() {
    // Get all the add to cart buttons
    const addToCartButtons = document.querySelectorAll('.container__product-item-state-wrap i.fa-cart-plus');

    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            // Get product information from product tag
            const productContainer = this.parentNode.parentNode;
            const productName = productContainer.querySelector('.container__product-item-name').innerText;
            const productPrice = productContainer.querySelector('.container__product-item-price-new').innerText;
            const productImageStyle = productContainer.querySelector('.container__product-item-img').style.backgroundImage;

            // Create a new li tag to add to cart
            const cartItem = document.createElement('li');
            cartItem.classList.add('header__cart-product-item');

            const cartItemContent = `
                <input class="header__cart-product-item-tick" type="checkbox">
                <img class="header__cart-product-item-img" src="${getProductImageUrl(productImageStyle)}" alt="">
                <div class="header__cart-product-item-info">
                    <div class="header__cart-product-item-head">
                        <h5 class="header__cart-product-item-name">${productName}</h5>
                        <div class="header__cart-product-price-wrap">
                            <span class="header__cart-product-item-price">${productPrice}</span>
                            <span class="header__cart-product-multiply">x</span>
                            <span class="header__cart-product-item-quantity js-display-quantity" data-default-value="1">1</span>
                        </div>
                    </div>

                    <div class="header__cart-product-body">
                        <span class="header__cart-product-classification">Phân loại: Máy tính</span>
                        <div class="header__cart-product-body-choose-quantity">
                            <button class="js-increase-btn">+</button>
                            <input type="number" min="1" max="10" step="1" class="js-quantity" value="1">
                            <button class="js-decrease-btn">-</button>
                        </div>
                    </div>
                </div>
            `;

            cartItem.innerHTML = cartItemContent;

            // Attach quantity increase/decrease events for new products added to cart
            handleQuantityChange(cartItem);

            // Add new li card to cart
            listCart.insertBefore(cartItem, listCart.firstChild);

            // Increase cart notification count and show message
            const currentCount = parseInt(cartNotification.textContent);
            cartNotification.textContent = currentCount + 1;
            showMessage('Đã thêm sản phẩm vào giỏ hàng');
        })
    })

    function getProductImageUrl(style) {
        // Extract image URL path from style
        const match = style.match(/url\("(.+)"\)/); //regex
        if (match && match.length > 1) {
            return match[1];
        }
        return '';
    }

    function showMessage(message) {
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('cart-message');
        messageContainer.innerHTML = `<i class="fas fa-circle-check"></i>${message}`;
        document.body.appendChild(messageContainer);

        setTimeout(function() {
            document.body.removeChild(messageContainer);
        }, 5000);
    }
})

// Show the number of products in the cart
let cartNotification = document.querySelector('.header__cart-notification');
cartNotification.textContent = productItem.length;

// Automatically switch slides
// Get the list of radio buttons
var radioBtns = document.getElementsByName('radio-btn');

// Initial counter setting
var currentSlide = 0;

// Move to the next slide
function nextSlide() {
    radioBtns[currentSlide].checked = false;
    currentSlide = (currentSlide + 1) % radioBtns.length;
    radioBtns[currentSlide].checked = true;
}

// Automatic slide transition settings
setInterval(nextSlide, 8000);





# it-shop
IT Shop is a project I have cherished for a long time since entering my first year of university. I want to be able to create an e-commerce website that specializes in selling technology for me and those in need.

But unfortunately because my ability is still very weak, I can only do the FE part for the website with some virtual functions using Javascript, and about the BE part, I have not done it yet.

But I also tried to perfect the FE part as best as possible, even though there was a lot of knowledge that was still unlearned and had to learn through [W3School](https://www.w3schools.com/js/).

I designed the layout in the form of a 12-column grid to make it easy to be responsive. But unfortunately I still have not responded on the website so we can't see it on phone.

![image](https://github.com/VenusakaVXT/it-shop/assets/125566811/62068602-fd4f-4ffe-80de-f5615f95c19c)
`*The image of a 12-column grid layout is applied to the itshop website.*`

In short, this is just a demo website that sells technology products I made with functions mainly focusing on CRUD.

The functions I have done for the website:
- Add product to cart.
- Remove multiple products from cart.
- Change the quantity of products in the shopping cart.
- Calculating product cost by quantity of products.
- Save product search history.
- Check notifications.
- Drop <3 of your favorite products
- Select a category.
- Only allow administrator accounts are allowed to be tested.

I have turned off the website's login feature and access to the Admin account is available. But you can still press sign out.

To open the website back to the home page when not logged in. 
Please uncomment the following elements in the DOM:

- Notifications
```html
<div class="header__message-box header__message-box--no-loggin">
     <div class="header__message-box-wrap--no-login">
          <img src="./assets/image/no_message.png" alt="">
          <span><a href="./general/login.html">Đăng Nhập</a> để xem được Thông Báo</span>
     </div>
</div>
```

- Log in, log out
```html
<li class="header__navbar-item header__navbar-item--seperate">
    <a href="./general/signup.html" class="resgis-and-login__link">Đăng ký</a>
</li>
<li class="header__navbar-item">
    <a href="./general/login.html" class="resgis-and-login__link">Đăng nhập</a>
 </li>
```

- Cart
```html
<div class="header__cart-list header__cart-list--no-product">
     <img src="./assets/image/cart_no_product.png" alt="">
     <p class="header__cart-list--no-product-msg">Chưa có sản phẩm</p>
</div>
```

And then comment the elements with class **.header__message-box--is-loggin**, **.header__navbar-user** and **.header__cart-list--has-product** to work properly. If you want to use the logged in function, do the opposite of the above.

I have also fully noted in the file **index.html**.

And also the CSS for each element to appear on logout or login.

In general, my website can only do the interface of the homepage, registration, and login. And missing a lot of functions for a basic website like logout/login, product search, pagination, ....

But I will try to practice more BE skills to soon complete this website and fix errors for the website to become as optimal as possible.




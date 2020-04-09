"use strict";

/* This function takes item's name and sends a POST request to the server. It will be attacted to 'click' event. */
const addItemToCart = (name) => {
    let url = "http://127.0.0.1:5000/shoppingcart/" + name;
    fetch(url, {method: "POST"})
    .then(alert(name + " added to cart."))
}

let catalogue;
fetch('http://127.0.0.1:5000/catalogue')
.then(response => response.json())
.then(data => catalogue = data)
.then(function () {for (let item in catalogue) {
    
    console.log(item, catalogue[item]);

    /* Create an empty card */
    let card = document.createElement("div");
    card.className = "card";

    /* Create image for it */
    let image = document.createElement("img");
    image.className = "card-img-top";
    image.src = catalogue[item]["thumbnail_link"];
    card.appendChild(image);

    /* Create card body, and its <h5> and <p> */
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let name = document.createElement("h5");
    name.className = "card-title";
    name.innerHTML = catalogue[item]["name"];
    cardBody.appendChild(name);

    let description = document.createElement("p");
    description.className = "card-text";
    description.innerHTML = catalogue[item]["description"];
    cardBody.appendChild(description);
    
    card.appendChild(cardBody);

    /* Create card footer, and add a price and a button there */
    let cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";

    let price = document.createElement("p");
    price.className = "card-text";
    price.innerHTML = "$ " + catalogue[item]["price"];
    cardFooter.appendChild(price);

    let addToCartButton = document.createElement("button");
    addToCartButton.type = "button";
    addToCartButton.className = "btn btn-secondary";
    addToCartButton.innerHTML = "Add to cart";
    /* Here I add an event listener. Anonymous function prevents a call on each page reload. */
    addToCartButton.onclick = function() {
        addItemToCart(catalogue[item]["name"])
    }
    cardFooter.appendChild(addToCartButton);

    card.appendChild(cardFooter);

    /* Append cart to card desk */
    document.getElementById("card-deck").appendChild(card);

    }}
);

/* Attach a hyperlink to the button "Go to shopping cart" */
document.getElementById("go-to-shopping-cart").onclick = function () {
    location.href = "shopping_cart.html";
};
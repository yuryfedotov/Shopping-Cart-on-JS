"use strict";

/* This function takes item's name and sends a DELETE request to the server. It will be attacted to 'click' event. */
const deleteItemFromCart = (name) => {
    let url = "http://127.0.0.1:5000/shoppingcart/" + name;
    fetch(url, {method: "DELETE"})
    .then(alert("1 unit of " + name + " deleted from cart."))
    .then(location.reload())
}

let shoppingcart;
fetch('http://127.0.0.1:5000/shoppingcart')
.then(response => response.json())
.then(data => shoppingcart = data)
.then(function () {for (let item in shoppingcart) {
    
    /* Create an empty card */
    let card = document.createElement("div");
    card.className = "card";

    /* Create card body, and its <h5> */
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let name = document.createElement("h5");
    name.className = "card-title";
    name.innerHTML = item;
    cardBody.appendChild(name);
    
    card.appendChild(cardBody);

    /* Create card footer, and add a quantity and a button there */
    let cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";

    let quantity = document.createElement("p");
    quantity.className = "card-text";
    quantity.innerHTML = "Quantity: " + shoppingcart[item];
    cardFooter.appendChild(quantity);

    let deleteFromCartButton = document.createElement("button");
    deleteFromCartButton.type = "button";
    deleteFromCartButton.className = "btn btn-secondary";
    deleteFromCartButton.innerHTML = "Delete from cart";
    /* Here I add an event listener. Anonymous function prevents a call on each page reload. */
    deleteFromCartButton.onclick = function() {
        deleteItemFromCart(item)
    }
    cardFooter.appendChild(deleteFromCartButton);

    card.appendChild(cardFooter);

    /* Append cart to card deck */
    document.getElementById("card-deck").appendChild(card);

    }}
);

/* Attach a hyperlink to the button "Go to catalogue" */
document.getElementById("go-to-catalogue").onclick = function () {
    location.href = "catalogue.html";
};

/* This block sends a GET request to retrieve the total price, and updates the innerHTML of the respective element */
let totalPriceValue;
fetch('http://127.0.0.1:5000/shoppingcart/price')
.then(response => response.json())
.then(data => totalPriceValue = data.price)
.then(function () {

    document.getElementById("total-price").innerHTML = "Total price: $ " + totalPriceValue;

}
);
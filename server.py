from flask import Flask, jsonify
from flask_cors import CORS

app = Flask("shoppingcart")
CORS(app)

catalogue = {
    "Guitar": {
        "name": "Guitar",
        "thumbnail_link": "images/guitar.jpg",
        "description": "This guitar will make you a superstar of any party!",
        "price": 360,
    },
    "Guitar strings": {
        "name": "Guitar strings",
        "thumbnail_link": "images/guitar_strings.jpeg",
        "description": "If your guitar is old, probably you need to change the strings.",
        "price": 12,
    },
    "Guitar picks": {
        "name": "Guitar picks",
        "thumbnail_link": "images/guitar_picks.jpg",
        "description": "Want to play advanced melodies with high precision? That's what you need!",
        "price": 0.5,
    },
    "Bass guitar": {
        "name": "Bass guitar",
        "thumbnail_link": "images/bass_guitar.jpg",
        "description": "For true rockers. Impress everyone around and become the next Freddie Mercury.",
        "price": 500,
    }
}


# A dictionary containing mapping items to their amount. For example:
#
# {
#     "Guitar": 3,
#     "Guitar strings": 1
# }
#
shoppingcart = {}

@app.route("/catalogue", methods = ["GET"])
def show_catalogue():
    """
    this route returns the catalogue, a dictionary with all the possible items
    in our ecommerce and their prices.
    """
    return jsonify(catalogue)

@app.route("/shoppingcart", methods = ["GET"])
def get_shopping_cart():
    """
    this route returns the shopping cart, a dictionary with all the items the
    current user added to it and their amounts.
    """
    return jsonify(shoppingcart)

@app.route("/shoppingcart/<item>", methods = ["POST"])
def add_item(item):
    """
    this route adds an item to the shoppingcart
    """
    if item in catalogue:
        if item in shoppingcart:
            # increase the amount of items we have in the shoppingcart in case
            # it's already there
            shoppingcart[item] = shoppingcart[item] + 1
        else:
            # add the item to the shoppingcart, indicating that the current
            # amount is 1
            shoppingcart[item] = 1

        return jsonify({"response": "item added to the shoppingcart"})
    else:
        return jsonify({"error": "{} not in shoppingcart".format(item)})


@app.route("/shoppingcart/<item>", methods = ["DELETE"])
def delete_item(item):
    """
    this route deletes an item from the shoppingcart
    """
    if item in catalogue:
        if item in shoppingcart:
            if shoppingcart[item] > 1:
                # decrease the amount of items we have in the shoppingcart in case
                # it's already there
                shoppingcart[item] = shoppingcart[item] - 1
            else:
                # delete the key in case its current amount is 1
                del(shoppingcart[item])

            return jsonify({"response": "item removed to the shoppingcart"})
        else:

            return jsonify({"response": "item not in shoppingcart"})
    else:
        return jsonify({"error": "{} not in catalogue".format(item)})

@app.route("/shoppingcart/price", methods = ["GET"])
def get_shopping_cart_price():
    total = 0

    for key in shoppingcart:
        total += catalogue[key]["price"] * shoppingcart[key]

    return jsonify({"price": total})

app.run(debug = True)

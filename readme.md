# Online Store Cart

## Description

This is an online store cart project that allows users to manage their shopping carts. It has the following features:

- Ability to get a list of products from the store
- Ability to add a product to the cart with quantity
- Ability to update the quantity of products in the cart (including deleting a product with 0 quantity)

## Dependencies

This project requires the following dependencies:

- `Express.js`
- `Mongoose`

## Installation

To use this project, make sure you have Node.js installed on your machine. Then, follow these steps:

1. Clone the repository and navigate into the project directory

```
$ git clone https://github.com/MishaPanivnyk/ukd-online-store-basket-backend.git
$ cd ukd-online-store-basket-backend
```

2. Install dependencies

```
$ npm install
```

3. Start the server

```
$ npm start
```

4. Open your web browser and go to `http://localhost:3000` to access the app.

## Usage

Once the server is running and accessed through the web browser, users can perform the following actions:

- View a list of products available for purchase
- Add a product to the cart by clicking the "Add to Cart" button and entering the desired quantity
- Update the quantity of a product in the cart by changing the value in the quantity input field and clicking "Update", or delete the product by setting the quantity to 0 and clicking "Update"

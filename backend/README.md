# React-Native E-Commerce

## Project Overview

This project is a simple beer e-commerce application built with **React Native** for the frontend and **Node.js** for the backend. The application allows users to browse and purchase different beer products, check product stock levels, and retrieve pricing information. The frontend and backend are each with its own dependencies and configuration.

### Backend

The backend of this project is responsible for serving product data, including the details of each product and the price/stock information for different size variants. It provides two key API endpoints:

1. **GET /api/products**: This endpoint returns the list of all products available in the store along with their details (such as name, description, size, and variant).
   
2. **GET /api/stock-price/[sku]**: This endpoint returns the price and stock quantity for a given product size variant, identified by its **SKU** (Stock Keeping Unit). For example, querying the endpoint `api/stock-price/10041` will return the price and stock details for the beer variant with the SKU of `10041`.

The stock and price details can be updated in the `stock-price.js` file. However, to see the changes take effect in the API, the backend server must be restarted.

### Frontend

The frontend of the application is built using **React Native**, allowing users to interact with the e-commerce platform, browse products, view their details, and make purchases. The design has been loosely modeled based on the specifications provided in the Figma design file. While the exact fonts and colors in the Figma design may not be strictly adhered to, the general user experience and layout are closely followed.

### Folder Structure

- **Frontend**: Contains the React Native code for the user interface.
- **Backend**: Contains the Node.js code that serves the product data and handles the API endpoints.

### Installation and Setup

To run the project, both the frontend and backend need to be installed and set up separately. The following instructions guide you through setting up both parts of the project.

---

## Backend Setup

### Navigate to the Backend Folder

First, navigate to the backend folder:

```bash
cd store/backend/
```

### Install Backend Dependencies

To install the necessary dependencies for the backend, run the following command:

```bash
npm install
```

### Running the Backend

To start the backend server, run:

```bash
npm start
```

The backend server will now be running, and you can access the API endpoints (`/api/products` and `/api/stock-price/[sku]`).

### Running Tests

To run tests for the backend, execute:

```bash
npm test
```

This will run any unit tests that have been set up for the backend API.

---

## Notes

- **Frontend and Backend Separation**: The frontend and backend are in separate folders and each has its own `package.json`. This makes it easy to manage dependencies and run them independently.
- **Stock/Price Updates**: Changes to product prices or stock quantities in the `stock-price.js` file require a backend server restart to take effect.

---

## Contact

If you have any questions or need further clarification, feel free to reach out.

---

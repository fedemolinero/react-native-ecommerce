import express from 'express';
import products from '../data/products.js';
import stockPrice from '../data/stock-price.js';

const router = express.Router();

// Route to get all products
router.get('/products', (req, res) => {
    const simplifiedProducts = products.map(product => ({
        id: product.id,
        sku: product.skus,
        brand: product.brand,
        image: product.image,
        price: getProductPrice(product.skus),
        stock: getProductStock(product.skus),
        style: product.style,
        substyle: product.substyle,
        abv: product.abv,
        origin: product.origin,
        information: product.information
    }));
    res.json(simplifiedProducts);
});

// Aux fnc to get price of first SKU
function getProductPrice(skus) {
    if (skus.length > 0) {
        const firstSkuCode = skus[0].code;
        return stockPrice[firstSkuCode].price;
    }
    return null;
}
// Aux fnc to get price of first SKU
function getProductStock(skus) {
    if (skus.length > 0) {
        const firstSkuCode = skus[0].code;
        return stockPrice[firstSkuCode].stock;
    }
    return null;
}

// Endpoint to get price and stock of a product by SKU
router.get('/stock-price/:sku', (req, res) => {
    const sku = req.params.sku;
    const product = getProductBySku(sku);
    if (product) {
        const stockInfo = stockPrice[sku];
        res.json({
            brand: product.brand,
            image: product.image,
            price: stockInfo.price,
            information: product.information,
            stock: stockInfo.stock,
            origin: product.origin,
            size: product.skus.name
        });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// aux function to get product by SKU
function getProductBySku(sku) {
    return products.find(product => product.skus.some(s => s.code === sku));
}

// Exporting router with routes configured
export { router };

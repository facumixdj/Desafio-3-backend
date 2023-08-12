/* const path = '.src/productos.json' */
import express from "express"
import Product from "./product.js"
import ProductManager from "./ProductsManager.js"

const pManager = new ProductManager();
const PORT = 8080;
const app = express();
app.get("/products/:pid", async (req, res) => {
    console.log(req.params.pid);

    const allProducts = await pManager.getProducts();
    const filtroProducts = allProducts.find(
        (prod) => prod.id === parseInt(req.params.pid)
    );

    if (filtroProducts) {
        res.send(filtroProducts);
    } else {
        res.send("Producto no existe en Stock");
    }
});
app.get("/products", async (req, res) => {
    const { price, stock, limit } = req.query;

    const allProducts = await pManager.getProducts();

    let filtroVariosProductos = allProducts;

    if (price) {
        filtroVariosProductos = filtroVariosProductos.filter(
            (prod) => parseFloat(prod.price) === parseFloat(price)
        );
    }

    if (stock) {
        filtroVariosProductos = filtroVariosProductos.filter(
            (prod) => parseFloat(prod.stock) === parseInt(stock)
        );
    }

    if (limit && !isNaN(limit) && parseInt(limit) > 0) {
        const limiteProductos = filtroVariosProductos.slice(0, parseInt(limit));
        res.send(limiteProductos);
    } else {
        res.send(filtroVariosProductos);
    }
});










app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})


/* const producto1 = new Product( "Zapatilla", "jordan 1 Corta", 40, 28000, "11001 EUR", 5, "asd", [] )
const producto2 = new Product("Zapatilla", "Addidas x BudBuuny", 40, 40000, "11004 EUR", 15, "asd", [])
const producto3 = new Product("Zapatilla", "Jordan Clasic Rojo", 41, 32000, "11005 EUR", 35, "asd", []) */

/* pManager.addProduct(producto1)
pManager.addProduct(producto2)
pManager.addProduct(producto3) */
/* pManager.getProductById(1)
pManager.getProductById(10)
pManager.getProductById(2) */
/* onsole.log(proaducto2)
console.log(producto3) */




/* // 



console.log("ahora muestro todos los productos")
productManager.getProducts()
console.log("y Busco la zapatilla numero con id 2")
productManager.getProductById(2) */


/* class Product {
    constructor(title, description, size, price, code, stock, thumbnail) {
        this.title = title
        this.description = description
        this.size = size //talle
        this.price = price
        this.code = code
        this.stock = stock
        this.thumbnail = thumbnail
        this.id = Product.incrementarId()
    }
    static incrementarId() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
} */
import { promises as fs } from "fs"
const path = "./products.json"
export default class ProductManager {
    constructor() {
        this.inicioProductId()
    }

    async inicioProductId() {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"))
        if (prods.length > 0) {
            const lastProduct = prods[prods.length - 1]
            this.productId = lastProduct.id + 1
        } else {
            this.productId = 1
        }
    }

    async addProduct(product) {
        if (!product.title ||
            !product.description ||
            !product.size ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock === ""
        ) {
            console.log("Todos los campos son obligatorios")
            return;
        }

        const prods = JSON.parse(await fs.readFile(path, "utf-8"))

        const foundProduct = prods.find((prod) => prod.id === product.id)

        if (foundProduct) {
            console.log("El producto ya existe");
        } else {
            const productJson = JSON.stringify(product)
            const parsearProduct = JSON.parse(productJson)
            if (parsearProduct.id === null || parsearProduct.id === undefined) {
                parsearProduct.id = this.productId++
            }

            prods.push(parsearProduct);
            await fs.writeFile(path, JSON.stringify(prods))
        }
    }

    async getProducts() {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"))
        console.log(prods)
        return prods
    }

    async getProductById(productId) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"))
        const foundProduct = prods.find((product) => product.id === productId)

        if (!foundProduct) {
            console.log("Error: El producto no se encuentra")
            return null
        }

        console.log(foundProduct)
        return foundProduct
    }

    async updateProduct(productId, updatedFields) {

        const prods = JSON.parse(await fs.readFile(path, "utf-8"))
        const indice = prods.findIndex((prod) => prod.id === productId)

        if (indice !== -1) {
            const updatedProduct = { ...prods[indice], ...updatedFields }
            prods[indice] = updatedProduct
            await fs.writeFile(path, JSON.stringify(prods))
            return updatedProduct
        } else {
            console.log("Producto no encontrado")
            return null
        }
    }

    async deleteProduct(productId) {
        const prods = JSON.parse(await fs.readFile(path, "utf-8"))
        const filteredProducts = prods.filter((product) => product.id !== productId)

        if (prods.length === filteredProducts.length) {
            console.log("Error: Product Not Found")
            return null
        }

        await fs.writeFile(path, JSON.stringify(filteredProducts))
        return filteredProducts
    }
}
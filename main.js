import { promises as fs } from 'fs';
import crypto from 'crypto';

const RUTA = './products.json';

const product1 = {
    id: crypto.randomBytes(10).toString('hex'),
    title: "producto prueba",
    price: 200,
    stock: 25,
    description: "este es un producto de prueba",
    thumbnail: "sin imagen",
    code: "abc123"
};

class ProductManager {
    constructor() {
        this.products = [];
    }

    async initialize() {
        try {

            const fileContent = await fs.readFile(RUTA, 'utf-8');


            if (fileContent && fileContent.trim() !== "") {
                this.products = JSON.parse(fileContent);
            } else {

                this.products = [];
            }
        } catch (error) {
            console.error("Error al leer el archivo JSON:", error);
            throw error;
        }
    }

    async addProduct(newProduct) {
        try {
            if (this.products.length === 0) {
                await this.initialize();
            }

            const indice = this.products.findIndex((prod) => prod && prod.id && prod.id === newProduct.id);

            if (indice !== -1) {
                this.products[indice].stock += newProduct.stock;
            } else {
                this.products.push(newProduct);
            }

            await fs.writeFile(RUTA, JSON.stringify(this.products));
        } catch (error) {
            console.error("Error al manejar el archivo JSON:", error);
            throw error;
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(prod => prod.id === id);
        if (product) {
            return product;
        } else {
            console.error("Not found");
        }
    }

    async updateProductField(productId, fieldName, newValue) {
        try {
            if (this.products.length === 0) {
                await this.initialize();
            }
            const productIndex = this.products.findIndex(prod => prod.id === productId)

            if (productIndex !== -1) {
                this.products[productIndex][fieldName] = newValue;

                await fs.writeFile(RUTA, JSON.stringify(this.products))
            } else {
                console.log("Not found, can't update")
            }
        } catch (error) {
            console.error("ERROR:", error);
        }

    }

    async deleteProduct(productId) {
        try {
            if (this.products.length === 0) {
                await this.initialize();
            }
            const productIndex = this.products.findIndex(prod => prod.id === productId)

            if (productIndex !== -1) {
                this.products.splice(productIndex, 1)
                await fs.writeFile(RUTA, JSON.stringify(this.products))
            } else {
                console.log("Not found, can't delete")
            }
        } catch (error) {
            console.error("ERROR:", error);
        }

    }

}



//Instancia ProductManager
const productManagerInstance = new ProductManager();
await productManagerInstance.initialize();

//Mostrar productos
const visualizeProducts = productManagerInstance.getProducts();
console.log(visualizeProducts);

//Añadir producto
await productManagerInstance.addProduct(product1);

//Visualizar producto añadido
const visualizeProductsAfter = productManagerInstance.getProducts();
console.log(visualizeProductsAfter)

//Buscar producto por ID, luego de ejecutar una vez, completar con ID
const productIdToFind = ""

const foundProduct = await productManagerInstance.getProductById(productIdToFind)
console.log(foundProduct)

//Actualizar producto, se actualiza el valor de la clave title, completar con ID luego de ejcutar una vez
const productIdToUpdate = "";
const newTitle = "Actualizacion de titulo";

await productManagerInstance.updateProductField(productIdToUpdate, 'title', newTitle);

//Borrar un producto segun su ID, colocar ID de producto a eliminar

const productIdToDelete = "";

await productManagerInstance.deleteProduct(productIdToDelete)








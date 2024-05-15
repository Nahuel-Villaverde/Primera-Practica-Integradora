const fs = require('fs').promises

class ProductManager {
    constructor(filePath) {
        this.filePath = filePath;
        this.products = [];
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            this.products = JSON.parse(data);
            return this.products; // Devuelve los productos como un arreglo
        } catch (error) {
            console.error('Error loading products:', error);
            return [];
        }
    }

    async saveProducts() {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Error saving products:', error);
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                throw new Error("Todos los campos son obligatorios");
            }
    
            //valido que el campo "code" no esté repetido
            const codeExists = this.products.some(product => product.code === code);
            if (codeExists) {
                throw new Error("El código ya está en uso");
            }
    
            const productId = this.products.length + 1;
    
            const newProduct = {
                id: productId,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };
    
            this.products.push(newProduct);
            console.log('Producto agregado')
            await this.saveProducts(); // Espera a que se guarde el producto antes de continuar
        } catch (error) {
            console.error("Error al agregar producto:", error.message);
        }
    }

    async getProductById(id) {
        await this.getProducts();
        console.log('Iniciando filtro');
        const product = this.products.find(product => product.id === id);

        if (!product) {
            console.error("El producto con el ID proporcionado no existe");
            return null;
        }

        console.log(product);
        return product;
    }

    async updateProduct(id, updatedFields) {
        await this.getProducts();
        console.log('Iniciando modificacion');
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedFields };
            await this.saveProducts();
            console.log('Producto actualizado correctamente');
            return true; // Devuelve true para indicar que la actualización fue exitosa
        } else {
            console.error('No se pudo actualizar el producto. El ID proporcionado no existe');
            return false; // Devuelve false para indicar que la actualización falló
        }
    }

    async deleteProduct(id) {
        await this.getProducts();
        console.log('Iniciando eliminacion');
        
        const initialLength = this.products.length;
    
        this.products = this.products.filter(product => product.id !== id);
    
        if (this.products.length === initialLength) {
            console.error('No se pudo encontrar el producto con el ID proporcionado para eliminar');
            return;
        }
    
        await this.saveProducts();
    }

}

module.exports = ProductManager;
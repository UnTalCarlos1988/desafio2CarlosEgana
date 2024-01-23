class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
    }
  
    addProduct(title, description, price, thumbnail, code, stock) {
      // Validación de campos obligatorios
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.error("Todos los campos son obligatorios.");
        return;
      }
  
      // Validación de código único
      if (this.products.some(product => product.code === code)) {
        console.error("Ya existe un producto con ese código.");
        return;
      }
  
      const newProduct = {
        id: this.productIdCounter++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      this.products.push(newProduct);
      console.log(`Producto agregado: ${newProduct.title}`);
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductByID(code) {
      const product = this.products.find(product => product.code === code);
  
      if (product) {
        return product;
      } else {
        console.error("Producto no encontrado.");
        return null;
      }
    }
  }
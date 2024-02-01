const fs = require('fs').promises;

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(producto) {
    try {
      const productos = await this.getProductos();
      const nuevoProducto = { id: this.obtenerSiguienteId(productos), ...producto };
      productos.push(nuevoProducto);
      await this.guardarProductos(productos);
      return nuevoProducto;
    } catch (error) {
      throw new Error('Error al agregar el producto: ' + error.message);
    }
  }

  async getProductos() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe, devuelve un array vacío
      if (error.code === 'ENOENT') {
        return [];
      }
      throw new Error('Error al leer los productos: ' + error.message);
    }
  }

  async getProductoPorId(id) {
    try {
      const productos = await this.getProductos();
      return productos.find(producto => producto.id === id);
    } catch (error) {
      throw new Error('Error al obtener el producto por ID: ' + error.message);
    }
  }

  async actualizarProducto(id, camposActualizados) {
    try {
      const productos = await this.getProductos();
      const indice = productos.findIndex(producto => producto.id === id);

      if (indice !== -1) {
        productos[indice] = { ...productos[indice], ...camposActualizados };
        await this.guardarProductos(productos);
        return productos[indice];
      } else {
        throw new Error('Producto no encontrado');
      }
    } catch (error) {
      throw new Error('Error al actualizar el producto: ' + error.message);
    }
  }

  async eliminarProducto(id) {
    try {
      const productos = await this.getProductos();
      const productosActualizados = productos.filter(producto => producto.id !== id);
      await this.guardarProductos(productosActualizados);
    } catch (error) {
      throw new Error('Error al eliminar el producto: ' + error.message);
    }
  }

  async guardarProductos(productos) {
    try {
      await fs.writeFile(this.path, JSON.stringify(productos, null, 2));
    } catch (error) {
      throw new Error('Error al guardar los productos: ' + error.message);
    }
  }

  obtenerSiguienteId(productos) {
    const maxId = productos.reduce((max, producto) => (producto.id > max ? producto.id : max), 0);
    return maxId + 1;
  }
}
/*
// Ejemplo de uso
const productManager = new ProductManager('productos.json');

// Agregar un producto
productManager.addProduct({
  title: 'Producto 1',
  description: 'Descripción 1',
  price: 19.99,
  thumbnail: 'ruta/a/imagen1.jpg',
  code: 'P001',
  stock: 50,
});

// Obtener todos los productos
const todosLosProductos = productManager.getProductos();
console.log('Todos los productos:', todosLosProductos);

// Obtener un producto por ID
const productoPorId = productManager.getProductoPorId(1);
console.log('Producto por ID:', productoPorId);

// Actualizar un producto
productManager.actualizarProducto(1, { price: 29.99, stock: 40 });

// Eliminar un producto
productManager.eliminarProducto(1);
*/
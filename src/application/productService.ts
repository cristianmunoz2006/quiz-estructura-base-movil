import { NewProduct, Product } from '../domain/product';
import { productRepository } from '../infrastructure/repositories/productRepository';

export const productService = {
  register(data: NewProduct): void {
    const product = { ...data, name: data.name.trim() };

    if (!product.name) {
      throw new Error('El nombre es obligatorio');
    }
    if (isNaN(product.price) || product.price <= 0) {
      throw new Error('El precio debe ser mayor a 0');
    }
    if (!Number.isInteger(product.stock) || product.stock < 0) {
      throw new Error('El stock debe ser un número entero (0 o más)');
    }

    productRepository.create(product);
  },

  list(): Product[] {
    return productRepository.getAll();
  },
};

import { db } from '../database/database';
import { NewProduct, Product } from '../../domain/product';

export const productRepository = {
  create(product: NewProduct): void {
    db.runSync(
      'INSERT INTO products (name, price, stock) VALUES (?, ?, ?)',
      product.name,
      product.price,
      product.stock
    );
  },

  getAll(): Product[] {
    return db.getAllSync<Product>('SELECT id, name, price, stock FROM products ORDER BY id DESC');
  },
};

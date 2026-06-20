import type { IProduct } from "../../types/IProduct";


export function getProducts(): IProduct[] {
  const products = localStorage.getItem("products");
  return products? JSON.parse(products) : [];
}

// Crear o Modificar un producto
export function saveProduct(product: IProduct) {
  const products = getProducts();
  const index = products.findIndex(p => p.id === product.id);

  if (index !== -1) {
    // Modificar producto existente
    products[index] = product;
  } else {
    // Crear producto nuevo 
    product.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push(product);
  }
  localStorage.setItem("products", JSON.stringify(products));
}

// Eliminar un producto 
export function removeProduct(id: number){
  const products = getProducts();
  products.filter(c => c.id != id)  
  localStorage.setItem("products", JSON.stringify(products));
}
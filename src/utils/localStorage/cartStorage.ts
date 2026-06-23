import type { IProduct } from '../../types/IProduct';
import type { ICartItem } from '../../types/ICart'
import { removeElement, removeElementById, getElementsFromStorage } from "./storageBase"


//Funciones para traer, modificar, crear y eliminar datos del storage
//(para no modificar JSON original como se solicito en consigna TPI)
export const getCart = () => getElementsFromStorage<ICartItem>("users");
export const removeFromCart = (productId: number) => removeElementById(productId, "cart");
export const clearCart = () => removeElement("cart");

// Agregar al carito desde la tienda (o actualizar cantidad si ya existe) - TO DO: respetar el stock disponible 
export function addToCart(product: IProduct, cantidad: number = 1): void {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.producto.id === product.id);

  if (itemIndex !== -1) {                       // Si ya existe, sumamos la cantidad 
    cart[itemIndex].cantidad += cantidad;
    cart[itemIndex].subtotal = cart[itemIndex].cantidad * cart[itemIndex].producto.precio;
  } else {                                      // Si es nuevo, lo agregamos
    cart.push({
      producto: product,
      cantidad: cantidad,
      subtotal: product.precio * cantidad
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

//FUNCIONES AUXILIARES 

// Función auxiliar para saber cuánto va sumando el total
export function getCartTotal(): number {
  const cart = getCart();
  return cart.reduce((acc, item) => acc + item.subtotal, 0);
}

// Función auxiliar para saber cuánto va sumando el total
export function getCartQuantity(): number {
  const cart = getCart();
  return cart.reduce((acc, item) => acc + item.cantidad, 0);
}

// Modificar la cantidad exacta de un ítem (ej. desde un input en la vista del carrito)
export function updateCartItemQuantity(productId: number, nuevaCantidad: number): void {
  let cart = getCart();
  const itemIndex = cart.findIndex(item => item.producto.id === productId);

  if (itemIndex !== -1) {
    if (nuevaCantidad <= 0) {
      // Si la cantidad pasa a ser 0 o menos, lo eliminamos automáticamente
      cart = cart.filter(item => item.producto.id !== productId);
    } else {
      cart[itemIndex].cantidad = nuevaCantidad;
      cart[itemIndex].subtotal = nuevaCantidad * cart[itemIndex].producto.precio;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

import type { IOrder } from "../../types/IOrder";

export function getOrders(): IOrder[] {
  const orders = localStorage.getItem("orders");
 return orders? JSON.parse(orders) : [];

}

// Crear un nuevo pedido (Checkout)
export  function createOrder(orderData: Omit<IOrder, 'id' | 'fecha'>) {
  const orders =  getOrders();
  const newOrder: IOrder = {
    ...orderData,
    id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
    fecha: new Date().toISOString() // Asigna la fecha y hora actual automáticamente
  };

  orders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(orders));
  
  return newOrder;
}

// Modificar datos de un pedido (Ideal para que el Admin cambie el Estado, por ejemplo)
export  function updateOrder(updatedOrder: IOrder) {
  const orders =  getOrders();
  const index = orders.findIndex(o => o.id === updatedOrder.id);

  if (index !== -1) {
    orders[index] = updatedOrder;
    localStorage.setItem("orders", JSON.stringify(orders));
  } else {
    throw new Error(`No se encontró el pedido con ID ${updatedOrder.id}`);
  }
}
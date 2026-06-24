import type { IOrder } from "../../types/IOrder";
import { fetchOrders } from "../fetch"
import { getElementById, removeElementById, saveOrUpdate, getElementsFromStorage, importElementsArray } from "./storageBase"


//Funciones para traer, modificar, crear y eliminar datos del storage
//(para no modificar JSON original como se solicito en consigna TPI)
export const getOrder = (id: number) => getElementById<IOrder>(id,"orders");
export const getOrders = () => getElementsFromStorage<IOrder>("orders");
export const removeOrder = (id: number) => removeElementById(id, "orders")
export const saveOrUpdateOrder = (Order: IOrder)  => saveOrUpdate(Order ,"orders")
export const getOrdersByEmail = (email:string): IOrder[] =>{
  return JSON.parse(localStorage.getItem(`orders_${email}`) || "[]");
}
export const saveOrdersByEmail = (email:string, orders: IOrder[]) =>{
  return localStorage.setItem(`orders_${email}`, JSON.stringify(orders));
}

//importar datos del JSON
export const importOrders = async () => importElementsArray(fetchOrders,"orders")


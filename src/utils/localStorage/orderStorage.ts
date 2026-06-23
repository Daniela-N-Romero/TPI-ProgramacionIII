import type { IOrder } from "../../types/IOrder";
import { fetchOrders } from "../fetch"
import { getElementById, removeElementById, saveOrUpdate, getElementsFromStorage, importElementsArray } from "./storageBase"


//Funciones para traer, modificar, crear y eliminar datos del storage
//(para no modificar JSON original como se solicito en consigna TPI)
export const getOrder = (id: number) => getElementById<IOrder>(id,"orders");
export const getOrders = () => getElementsFromStorage<IOrder>("orders");
export const removeOrder = (id: number) => removeElementById(id, "orders")
export const saveOrUpdateOrder = (Order: IOrder)  => saveOrUpdate(Order ,"orders")

//importar datos del JSON
export const importOrders = async () => importElementsArray(fetchOrders,"orders")


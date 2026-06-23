import type { IProduct } from "../../types/IProduct";
import { fetchProducts } from "../fetch"
import { getElementById, removeElementById, saveOrUpdate, getElementsFromStorage, importElementsArray } from "./storageBase"


//Funciones para traer, modificar, crear y eliminar datos del storage
//(para no modificar JSON original como se solicito en consigna TPI)
export const getProduct = (id: number) => getElementById<IProduct>(id,"products");
export const getProducts = () => getElementsFromStorage<IProduct>("products");
export const removeProduct = (id: number) => removeElementById(id, "products")
export const saveOrUpdateProduct = (product: IProduct)  => saveOrUpdate(product ,"products")

//importar datos del JSON
export const importProducts = async () => importElementsArray(fetchProducts,"products")


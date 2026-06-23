import type { ICategory } from "../../types/ICategory";
import { fetchCategories } from "../fetch"
import { getElementsFromStorage, importElementsArray, removeElementById, saveOrUpdate } from "./storageBase"

//Funciones para traer, modificar, crear y eliminar datos del storage
//(para no modificar JSON original como se solicito en consigna TPI)
export const getCategories = () => getElementsFromStorage<ICategory>("categories");
export const removeCategory = (id: number) => removeElementById(id, "categories")
export const saveOrUpdateCategory = (category: ICategory) => saveOrUpdate(category, "categories")

//importar datos del JSON
export const importCategories = async () => importElementsArray(fetchCategories,"categories")


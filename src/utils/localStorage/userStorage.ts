import type { IUserDTO, IUserStorage} from "../../types/IUser";
import { fetchUsers } from "../fetch"
import { getElement, removeElement, saveOrUpdate, getElementsFromStorage, importElementsArray } from "./storageBase"


//Funciones para traer, modificar, crear y eliminar datos del storage
//(para no modificar JSON original como se solicito en consigna TPI)

export const getUsers = () => getElementsFromStorage<IUserStorage>("users");
export const removeActiveUser = () => removeElement("userData");
export const saveOrUpdateUser = (user: IUserStorage)  => saveOrUpdate(user ,"users")

//funciones para acceder y modificar la sesion activa de usuario: trateremos a la autenticacion así por motivos pedagogicos 
export const getActiveUser = () => getElement("userData");
export const loginUser = (user: IUserDTO) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};

//importar datos del JSON
export const importUsers = async () => importElementsArray(fetchUsers,"users")

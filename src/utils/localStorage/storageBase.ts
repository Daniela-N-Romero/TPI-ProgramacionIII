//FUNCIONES QUE TRAEN SOLO DATOS DE STORAGE

//Traer elemento del Local Storage
export const getElement = (storageItem: string) => {
  const element = localStorage.getItem(storageItem);
  return element ? JSON.parse(element) : null;
};

//Eliminar elemento del Local Storage
export const removeElement = (storageItem: string) => {
  localStorage.removeItem(storageItem);
};

//Trear array de elementos del Local Storage
export const getElementsFromStorage = <T>(storageItem: string): T[] => {
    const array = localStorage.getItem(storageItem)
    return array? JSON.parse(array) : [] 
};


//Trear  un elemento filtrando un array de elementos del Local Storage con un id
export const getElementById =  <T extends { id: number }>(id: number, storageItem: string): T | null => {
  const array = getElementsFromStorage<T>(storageItem);
  const element = array.find(item => item.id === id);
  return element || null;
};

//Eliminar un elemento filtrando un array de elementos del Local Storage con un id
export const removeElementById = <T extends { id: number }>(id: number, storageItem: string) => {
  const array = getElementsFromStorage<T>(storageItem);
  array.filter(item => item.id != id)  
  localStorage.setItem(storageItem, JSON.stringify(array));
};


//Guardar cambios o crear un nuevo elemento en el array de elementos

export const saveOrUpdate =  <T extends { id: number }>(
  element: T, 
  storageItem: string) => {

  const array = getElementsFromStorage<T>(storageItem)
  const index = array.findIndex(item => item.id === element.id);
  
  if (index !== -1) {          // Modificar el elemento existente
    array[index] = element;
  } else {                     // Crear nuevo 
    element.id = array.length > 0 ? Math.max(...array.map(c => c.id)) + 1 : 1;
    array.push(element);
  }
  localStorage.setItem(storageItem, JSON.stringify(array));
}


//FUNCION QUE INVOLUCRAN FETCH Y, POR LO TANTO, ASINCRONIA

//Importar datos del JSON mediante fetch y guardarlos en localStorage para hacer modificaciones, eliminaciones, nuevos ingresos, etc.
export const importElementsArray = async <T>(fetchFunction: () => Promise<T[]>, storageItem: string): Promise<void> => {
    const array = await fetchFunction()
    localStorage.setItem(storageItem, JSON.stringify(array));
};




// export const saveElement = async <T>(element: T, fetchFunction: () => Promise<T[]>, storageItem: string): Promise<void> => {
//   const array = await fetchFunction();
//   array.push(element)
//   localStorage.setItem(storageItem, JSON.stringify(array));
// };

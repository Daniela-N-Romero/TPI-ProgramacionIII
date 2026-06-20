import type { ICategory } from "../../types/ICategory";


//funciones de localStorage que se mantienen para guardar categorias nuevas, 
//ya que el TPI especifica que no deben guardarse en el json.


export const getCategories = (): ICategory[] => {
    const categories = localStorage.getItem("categories")
    return categories? JSON.parse(categories) : [] 
}

export const removeCategory = (id: number) => {
  const categories = getCategories();
  categories.filter(c => c.id != id)  
  localStorage.setItem("categories", JSON.stringify(categories));
};


export function saveCategory(newCategory: ICategory){

  const categories = getCategories();
  const index = categories.findIndex(c => c.id === newCategory.id);
  
  if (index !== -1) { 
    // Modificar categoria existente
    categories[index] = newCategory;
  } else {
    // Crear categoria nuevo 
    newCategory.id = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    categories.push(newCategory);
  }

  localStorage.setItem("categories", JSON.stringify(categories));
}
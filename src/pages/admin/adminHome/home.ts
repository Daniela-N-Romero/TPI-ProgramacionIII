import { navigate } from "../../../utils/guards/guards";
import { ModalService } from "../../../utils/modals/modal";
import { getCategories } from "../../../utils/storage/categoryStorage";
import { getProducts } from "../../../utils/storage/productStorage";
import { getActiveUser } from "../../../utils/storage/userStorage";

document.addEventListener("DOMContentLoaded", () => {
  ModalService.init();
  const user = getActiveUser();
  const main = document.querySelector(".main-content");
  if (user?.rol === "ADMIN") {
    main?.classList.add("main-content-block")
    renderCounters();
    renderResumen();
  }else{
    navigate("./tienda")
  }
});

const renderCounters = async ()=>{
    const counterProductos = document.querySelector(".counter-productos")
    const counterCategorias = document.querySelector(".counter-categorias")
    const counterDisponibles = document.querySelector(".counter-productos-disponibles")
    const counterPedidos = document.querySelector(".counter-pedidos")

    const productos = await getProducts();
    if (counterProductos) {
        counterProductos.innerHTML = productos.length.toString();
    } 

    const categories = await getCategories();
    if (counterCategorias) {
        counterCategorias.innerHTML = categories.length.toString();
    } 

    const pedidos = await getCategories();
    if (counterPedidos) {
        counterPedidos.innerHTML = pedidos.length.toString();
    } 

    const disponibles = productos.filter(p => p.disponible === true);
    if (counterDisponibles) {
        counterDisponibles.innerHTML = disponibles.length.toString();
    } 

}
    

const renderResumen = () =>{

}


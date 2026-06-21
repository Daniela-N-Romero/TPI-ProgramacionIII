import { getUser, getUsers } from "./utils/localStorage/userStorage.ts"
import { rolRedirect  } from "./utils/auth/auth.ts";
import {navigate} from "./utils/guards/guards.ts"
import { getProducts } from "./utils/localStorage/productStorage.ts";
import { getOrders } from "./utils/localStorage/orderStorage.ts";
import { importCategories } from "./utils/localStorage/categoryStorage.ts";

document.addEventListener('DOMContentLoaded', () => {

    const user = getUser();
    if (user)  {
        rolRedirect(user.rol, "/adminPanel", "/tienda");
    }
       
    const loginBtn = document.getElementById('btn-landing-login') as HTMLElement;
    loginBtn.addEventListener('click', ()=> navigate("/login"))
    const guestBtn = document.getElementById('btn-landing-guest') as HTMLElement;
    guestBtn.addEventListener('click', ()=> navigate("/tienda"))

    const dbLoad= ()=>{
        getUsers()
        getProducts()
        getOrders()
        importCategories()
    }

    dbLoad();

});








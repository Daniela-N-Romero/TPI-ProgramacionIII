import { getActiveUser, importUsers } from "./utils/localStorage/userStorage.ts"
import { rolRedirect  } from "./utils/auth/auth.ts";
import {navigate} from "./utils/guards/guards.ts"
import { importProducts } from "./utils/localStorage/productStorage.ts";
import { importOrders } from "./utils/localStorage/orderStorage.ts";
import { importCategories } from "./utils/localStorage/categoryStorage.ts";

document.addEventListener('DOMContentLoaded', () => {
    
    const dbLoad= ()=>{
        importUsers()
        importProducts()
        importOrders()
        importCategories()
    }

    dbLoad();
    
    const user = getActiveUser();
    if (user)  {
        rolRedirect(user.rol, "/adminPanel", "/tienda");
    }
       
    const loginBtn = document.getElementById('btn-landing-login') as HTMLElement;
    loginBtn.addEventListener('click', ()=> navigate("/login"))
    const guestBtn = document.getElementById('btn-landing-guest') as HTMLElement;
    guestBtn.addEventListener('click', ()=> navigate("/tienda"))


});








import { getUser } from "./localStorage/userStorage";
import { getCategories } from "./localStorage/categoryStorage";
import { getProducts } from "./localStorage/productStorage";
import { getCart, addToCart } from "./localStorage/cartStorage";
import { logout } from "./auth/auth";

const user = getUser();

const renderNavbar = () => {
    const navContainer = document.getElementById('nav-links') as HTMLElement;
    const links = {
        index: "/index.html",
        login: "/login",
        registro: "/registro",
        adminHome: "/adminPanel",
        categories: "/manageCategories",
        products: "/manageProducts",
        orders: "/manageOrders",
        storeHome: "/tienda",
        cart: "/carrito",
        productDetail: "/producto",
        clientOrders: "/pedidos"
    }
    
    
    if (user?.rol === "ADMIN") {
        navContainer.innerHTML = `
                <li><a href="${links.storeHome}" id="nav-store">Tienda</a></li>
                <li><a href="${links.adminHome}" id="nav-admin" class="active">Panel Admin</a></li>
                <li class="user-name">${user.name}</li>
                <li><button class="btn btn-secondary" id="btn-logout">Cerrar Sesión</button></li>
            `;

    } else if (user?.rol === "USUARIO") {
        navContainer.innerHTML = `
                <li><a href="${links.storeHome}" class="active">Inicio</a></li>
                <li><a href="${links.clientOrders}">Mis Pedidos</a></li>
                <li><a href="${links.cart}" class="cart-icon">🛒 Carrito <span class="badge">1</span></a></li>
                <li class="user-name">${user.name}</li>
                <li><button class="btn btn-secondary" id="btn-logout">Cerrar Sesión</button></li>
                ;`
    } else {
        // Si no hay usuario o el rol no es reconocido, se asume invitado
        navContainer.innerHTML = `
                <li><a href="${links.login}" class="btn btn-secondary" id="btn-login">Iniciar Sesión</a></li>
                <li><a href="${links.registro}" class="btn btn-primary" id="btn-register">Registrarse</a></li>
            `;
    }

    const btnLogout = document.getElementById("btn-logout");
    btnLogout?.addEventListener("click", ()=> logout())
}

const renderSidebar = () => {
    const appSidebar = document.getElementById('app-sidebar') as HTMLElement;
    
    if (user?.rol === "ADMIN") {
        appSidebar.innerHTML = `
            <h3 class="sidebar-title">Administracíon</h3>
            <h4 class="sidebar-subtitle">Panel de control</h4>
            <ul class="sidebar-menu">
                <li class="active"><a href="/adminPanel">Dashboard</a></li>
                <li><a href="/manageCategories">Categorias</a></li>
                <li><a href="/manageProducts">Productos</a></li>
                <li><a href="/manageOrders">Pedidos</a></li>
                <hr class="sidebar-divider">
                <li><a href="/tienda">Ver Tienda</a></li>
            </ul>
            `;

    } else {

        const categorias =  getCategories();

        const categoriasHtml = categorias
            .map(cat => `<li><a href="#" data-categoria-id="${cat.id}">${cat.nombre}</a></li>`)
            .join("");

        appSidebar.innerHTML = `
            <h3 class="sidebar-title">Categorías</h3>
            <h4 class="sidebar-subtitle">Filtra por categoría</h4>
            <ul class="sidebar-menu">
                <li class="active"><a href="#" data-categoria-id="todas">📦 Todos los productos</a></li>
                ${categoriasHtml}            
            </ul>
            `;
            
        filtrarPorDeCategoria();
    }


}

const filtrarPorDeCategoria = () => {

    const linksCategoria = document.querySelectorAll('#app-sidebar .sidebar-menu a[data-categoria-id]');

    linksCategoria.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault(); // Evitamos que la página se recargue o scrollee al inicio

            const target = e.currentTarget as HTMLAnchorElement;
            const categoriaIdRaw = target.dataset.categoriaId;

            if (!categoriaIdRaw) return;

            // Manejo visual
            linksCategoria.forEach(l => l.parentElement?.classList.remove('active'));
            target.parentElement?.classList.add('active');

            // 
            const categoriaId = categoriaIdRaw === 'todas' ? 'todas' : Number(categoriaIdRaw);
            
            renderProductosTienda(categoriaId);
        });
    });
};


 const renderProductosTienda = (categoriaId: number | 'todas' = 'todas') => {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;
    const todosLosProductos =  getProducts();

    const productosFiltrados = todosLosProductos.filter(producto => {
        const perteneceACategoria = categoriaId === 'todas' || producto.categoria.id === categoriaId;
        return perteneceACategoria && producto.disponible;
    });

    productsContainer.innerHTML = '';
    if (productosFiltrados.length === 0) {
        productsContainer.innerHTML = `<p class="no-products">No hay productos disponibles en esta categoría por el momento.</p>`;
        return;
    }

    productosFiltrados.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-img">
            <div class="product-info">
                <h4>${producto.nombre}</h4>
                <p>${producto.descripcion}</p>
                <span class="product-price">$${producto.precio}</span>
                <span class="product-stock">Stock: ${producto.stock}</span>
                <button class="btn btn-primary btn-add-cart" data-id="${producto.id}">Agregar 🛒</button>
            </div>
        `;
        productsContainer.appendChild(card);
    });

};

export const configurarBotonesCarrito = () => {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;

    // Removemos cualquier listener previo para evitar que se dupliquen los eventos
    productsContainer.replaceWith(productsContainer.cloneNode(true));
    
    // Volvemos a capturar el contenedor limpio
    const cleanContainer = document.getElementById('products-container')!;

    // Escuchamos los clics en todo el contenedor de productos
    cleanContainer.addEventListener('click', async (e) => {
        const target = e.target as HTMLElement;

        if (target && target.classList.contains('btn-add-cart')) {
            const productoId = Number(target.dataset.id);
            if (!productoId) return;


            try {
                const productos =  getProducts();
                const productoSeleccionado = productos.find(p => p.id === productoId);

                if (!productoSeleccionado) {
                    alert("No se pudo encontrar el producto.");
                    return;
                }

                addToCart(productoSeleccionado, 1);
                actualizarBadgeNavbar();

            } catch (error) {
                console.error("Error al añadir al carrito:", error);
            }
        }
    });
};

const actualizarBadgeNavbar = () => {
    const badge = document.querySelector('#nav-links .badge') as HTMLElement;
    if (!badge) return;

    const cart = getCart();
    const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);
    badge.innerText = totalItems.toString();
};

const renderLayout = () => {
    renderNavbar();
    renderSidebar();
}

renderLayout();
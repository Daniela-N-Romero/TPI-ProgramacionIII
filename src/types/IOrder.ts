import type { IProduct } from "./IProduct";
import type { IBaseUser } from "./IUser";

export interface IOrder {
    id: number;
    fecha: string;
    estado: Estado;
    total: number;
    formaPago: FormaPago;
    detalles: {
        cantidad: number;
        subtotal: number;
        producto: IProduct;
    }[];
    usuarioDto: IBaseUser;
}

type Estado = "EN_PREPARACION" | "CONFIRMADO" | "PENDIENTE" | "ENTREGADO";
type FormaPago = "TRANSFERENCIA" | "EFECTIVO" | "TARJETA" ;

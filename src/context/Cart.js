import { createContext , useContext } from "react";

export const CartModalContext = createContext({
    addItem : () => {},
    toggleCart : () => {},
    cartData : null,
    changeQnt : () => {},
    clearCart: () => {},
    getItemData : () => {}
});

export const CartModalProvider = CartModalContext.Provider;

export default function useCart(){
    return useContext(CartModalContext);
}

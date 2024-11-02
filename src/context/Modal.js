import { createContext, useContext } from "react";

export const ModalContext = createContext({
    toggleModal : () => {},
    modalData : null
})

export const ModalProvider = ModalContext.Provider;

export default function useModal(){
    return useContext(ModalContext);
}
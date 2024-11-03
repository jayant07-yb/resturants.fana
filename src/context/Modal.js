import { createContext , useContext } from "react";

export const ModalContext = createContext({
    modalDetails : null ,
    toggleModal : () => {}
});

export const ModalProvider = ModalContext.Provider;

export default function useModal(){
    return useContext(ModalContext);
}
import { createContext , useContext } from "react";

export const UserContext = createContext({
    isOpen : null ,
    toggleAuthModal : () => {},
    userData : null,
    updateUserData : () => {},
    deleteUserData : () => {}

});

export const UserProvider = UserContext.Provider;

export default function useUserContext(){
    return useContext(UserContext);
}
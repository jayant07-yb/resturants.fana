import { createContext , useContext } from "react";

export const SpeechModalContext = createContext({
    toggleSearchModal : () => {},
    speechData : null,
    setSpeechData : () => {}
});

export const SpeechModalProvider = SpeechModalContext.Provider;

export default function useSpeechModal(){
    return useContext(SpeechModalContext);
}
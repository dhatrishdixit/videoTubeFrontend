import React,{createContext,useContext} from "react";


// this boolean tells whether our sidebar open or closed
type OffCanvasSideBarContextProviderType = {
    isOpen:boolean,
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>,
    children:React.ReactNode
}

type OffCanvasSideBarContextType ={
    isOpen:boolean,
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>,
}



export const OffCanvasSideBarContext = createContext<OffCanvasSideBarContextType|null>(null);

export const OffCanvasSideBarContextProvider = (props:OffCanvasSideBarContextProviderType) =>(
    <OffCanvasSideBarContext.Provider value={{
        isOpen:props.isOpen,
        setIsOpen:props.setIsOpen
    }} >
        {props.children}
    </OffCanvasSideBarContext.Provider>
) 

export const useSidebar = () => {
    const context = useContext(OffCanvasSideBarContext);
    if(!context) throw new Error("useContext is used outside of OffCanvasSideBarContext.Provider") ;
    return context ;
}
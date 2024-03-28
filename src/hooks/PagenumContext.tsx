import React,{ useContext,createContext } from "react";

type PageNumContextProviderProps = {
    children:React.ReactNode;
    pageNum:number;
}

type PageNumContextValue = number

export const PageNumContext = createContext<PageNumContextValue|null>(null);


export const PageNumContextProvider = ({children,pageNum}:PageNumContextProviderProps) =>{
    return (
         <PageNumContext.Provider 
          value = {pageNum}
         >{children}
         </PageNumContext.Provider>
    )
}

export const usePageNumContext = () => {
    const context = useContext(PageNumContext);
    if (!context) throw new Error("useContext is used outside of PageNumContext.Provider")

    return context ;
}
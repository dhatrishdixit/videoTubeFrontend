import React,{ useContext,createContext } from "react";

type PageNumContextProviderProps = {
    children:React.ReactNode;
    pageNum:number;
    setRefresh:React.Dispatch<React.SetStateAction<number>>;
    refresh:number
}

type PageNumContextValue = {
    pageNum:number,
    setRefresh:React.Dispatch<React.SetStateAction<number>>,
    refresh:number
}

export const PageNumContext = createContext<PageNumContextValue|null>(null);


export const PageNumAndRefreshContextProvider = ({children,pageNum,setRefresh,refresh}:PageNumContextProviderProps) =>{
    return (
         <PageNumContext.Provider 
          value = {{
            pageNum:pageNum,
            setRefresh:setRefresh,
            refresh:refresh
          }}
         >{children}
         </PageNumContext.Provider>
    )
}

export const usePageNumAndRefreshContext = () => {
    const context = useContext(PageNumContext);
    if (!context) throw new Error("useContext is used outside of PageNumContext.Provider")

    return context ;
}
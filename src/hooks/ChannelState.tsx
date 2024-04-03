import { ChannelCountSchema as ChannelStateSchema } from "@/pages/ChannelPage/ChannelPage";
import React,{ useContext,createContext } from "react";



export const ChannelStateContext = createContext<(ChannelStateSchema)|null>(null);

type ChannelStateContextProviderType ={
    children:React.ReactNode;
    videoCount:number;
    tweetCount:number;
    playlistCount:number;

}

export const ChannelStateContextProvider = ({children,videoCount,tweetCount,playlistCount}:ChannelStateContextProviderType) => {
      return (
        <ChannelStateContext.Provider value={{
            videoCount,
            tweetCount,
            playlistCount,
       
        }}>
            {children}
        </ChannelStateContext.Provider>
      )
}

export const useChannelStateContext = () => {
    const context = useContext(ChannelStateContext);
    if(!context) throw new Error("channelStateContext cannot be accessed outside of the context provider ");

    return context;

}
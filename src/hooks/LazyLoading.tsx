import axios from "axios";
import { useState,useEffect } from "react";


const api = async (pageNum:number = 0,limit:number = 9,options:{}={}) =>{
     const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/videos?limit=${limit}&page=${pageNum}`,options);
     return result.data.data ;
}  

export const useLoading = (pageNum = 0) =>{
    const [results, setResults] = useState<[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<{}>({})
    const [hasNextPage, setHasNextPage] = useState<boolean>(false)


    useEffect(()=>{
       setIsLoading(true);
       setIsError(false);
       setError({});

       const controller = new AbortController();
       const signal = controller.signal;
       api(pageNum,9,{signal})
       .then((res)=>{
         setResults(prev => [...prev,...res] as [])
         setIsLoading(false);
         setHasNextPage(res.length > 0);
       })
       .catch((err)=>{
          setIsLoading(false);
          if(signal.aborted) return ;
          setIsError(true);
          setError({
            message:err.message,
          });
       })
       
       return () => controller.abort();
    },[pageNum])

    return {results,isLoading,hasNextPage,isError,error};
}
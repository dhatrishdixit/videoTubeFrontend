import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useToast } from "../../components/ui/use-toast";
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";

export interface StyleBtnProps{
        children:string,
        loading:boolean,
        clickHandler:(e:React.MouseEvent<HTMLAnchorElement>)=>void
}

export function StyleBtn({children,loading,clickHandler}:StyleBtnProps){
    if(loading) return (<div className=' flex justify-center items-end'>
        <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#272727"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        /> 
        </div>)
    return (
        <a href="#_" className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-red-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-inherit group"
        onClick={clickHandler}
        >
        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-red-600 group-hover:h-full"></span>
        <span className ="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </span>
        <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
        </span>
        <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">{children}</span>
        </a>
    )
}

export function VerificationEmailPage(){
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading,setLoading] = useState<boolean>(false);
    const location = useLocation() ;
    function clickHandler(e:React.MouseEvent<HTMLAnchorElement>){
        e.preventDefault();
        setLoading(true);
        console.log(location.pathname.split("/")[2]);
        axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/verify-email`,{
            token:location.pathname.split("/")[2]
        },{
            withCredentials:true
        })
        .then(res=>{
            toast({
                variant:"success",
                type:"foreground",
                description: "Email Verified Successfully",
            });
            setTimeout(()=>{
                navigate("/login");
            },500);
        })
        .catch(error => {
            if(error instanceof AxiosError){
                toast({
                  variant:"destructive",
                  type:"foreground",
                  description:error?.response?.data?.message
                })
              }
        });
    }
    return (
    <div className="h-screen w-screen flex justify-center items-center">
       <StyleBtn clickHandler={clickHandler} loading={loading}>Click to Verify Email</StyleBtn> 
    </div>
    )
}
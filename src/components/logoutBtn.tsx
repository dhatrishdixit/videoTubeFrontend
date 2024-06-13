import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { VscSignOut } from "react-icons/vsc";
import axios from 'axios';
import { Button } from './ui/button';
import {AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";
import { logOut } from '@/features/authentication/auth.slice';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { useToast } from "./ui/use-toast";


export function LogoutBtn(props:{
    className?:string;
}) {
    const dispatch =  useDispatch<AppDispatch>();
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [loadingLogoutBtn,setLoadingLogoutBtn] = useState<boolean>(false);
    const navigate = useNavigate();
    const {toast} = useToast();
  
    const logoutHandler:()=>void = ():void => {
      setLoadingLogoutBtn(true);
      setIsOpen(true);
      axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/logout`,null,{
        withCredentials:true
      })
      .then(()=>{
        toast({
            variant:"success",
            type:"foreground",
            description: "logged out successfully",
        })
        dispatch(logOut());
        setLoadingLogoutBtn(false);
        navigate("/login");
      })
      .catch(err=>console.log(err));

  }

  return (

    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
    <AlertDialogTrigger asChild>
    <Button variant="outline"
  onClick={()=>{
  
  }}
  className="grid grid-cols-10">  
  <VscSignOut className='scale-150 col-span-2'/>
  <span className="text-center col-span-5 ">logout</span>
  </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This action will log you out of VideoTube and you will have to login again.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button onClick={logoutHandler} disabled={loadingLogoutBtn}>
        {
            loadingLogoutBtn ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait</>) : "Logout"
          }
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

  )
}


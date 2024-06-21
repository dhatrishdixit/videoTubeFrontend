import React,{useEffect,useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MdFormatListBulletedAdd } from 'react-icons/md';
import axios from "axios";
import { UseSelector } from 'react-redux';


export const PlaylistBtn = () => {

     
    useEffect(()=>{
       // {{localServer}}/playlist/user/:userId
        // axios.get("http://localhost:8000/api/v1/playlists").then((res)=>{
        //     console.log(res.data);
        // }).catch((err)=>{
        //     console.log(err);
        // })
    },[]);

    return (
        <div>
            <Dialog>
                <DialogTrigger>  
                     <Button className="ml-4" variant="link">
                <MdFormatListBulletedAdd className="scale-150 text-white" />
                </Button>                
                </DialogTrigger>
                <DialogContent>
                    hi
                </DialogContent>
        </Dialog>
        </div>
    )
}

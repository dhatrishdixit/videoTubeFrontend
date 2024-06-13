import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubmitHandler,useForm } from "react-hook-form";
import axios, { AxiosError } from 'axios';
import { useToast } from "../../components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";


export function ForgotPasswordPage(){
    
    
    const { toast } = useToast();
    const navigate = useNavigate();
    const schema = z.object(
        {
          email:z.string().email(),
        }
      )
    
    type formFields = z.infer<typeof schema>;
    const {
        register,
        handleSubmit,
        setError,
        formState,
      } = useForm<formFields>({
        resolver: zodResolver(schema),
      });
    
    const  { errors, isSubmitting } = formState;
    const onSubmit:SubmitHandler<formFields> = async (data) => {
        try {
            //{{localServer}}/users/send-email-for-password-otp
            console.log(data.email);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/send-email-for-password-otp`,{
                email:data.email,
            },{
                withCredentials:true
            });
            toast({
                variant:"success",
                type:"foreground",
                description:" verification mail has been sent to your email"
            });

        } catch (error) {
            if(error instanceof AxiosError){
                toast({
                    variant:"destructive",
                    type:"foreground",
                    description:error?.response?.data?.message
                })
                setError(
                    "root",{
                      message:error?.response?.data?.message
                    }
                  )
            }
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <Card className='w-[350px]'>
                <CardHeader>
                    <CardTitle className='text-3xl '>Forgot Password ?</CardTitle>
                    <p className='text-gray-400'>Type in your email in the field below and we will send you a code to reset your password.</p>
                </CardHeader>
                <CardContent className='mt-5'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
               
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                autoComplete="new-password"
                placeholder="Email"
                type="email"
                {...register("email")}
              />
                {
            errors.email && <p className="text-red-600">{errors.email.message}</p>
            }
            </div>
            <div className="w-full flex align-middle justify-between items-center">
         <Button size="lg" className="mt-6 mb-4" disabled={isSubmitting}>
          {
            isSubmitting ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait</>) : "Send Code"
          }
        </Button>
        <Button size="lg" variant="link" className='mt-2 text-sm font-light text-blue-600  dark:text-blue-500 hover:cursor-pointer' onClick={()=>{
            navigate('/login')
        }}>Back to Login</Button>
        </div>
            </div>
            </form>
            </CardContent>   
            </Card>
        </div>
    )
}
import React from "react";
import { Button } from "@/components/ui/button"
import { Input, InputPassword } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import axios, { AxiosError } from 'axios';
import { AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { SubmitHandler,useForm } from "react-hook-form";
import { logOut } from '@/features/authentication/auth.slice';

export function PasswordResetSettings(){
  const dispatch =  useDispatch<AppDispatch>();
    const {toast} = useToast();
    const navigate = useNavigate();
    const schema = z.object(
        {
          currentPassword:z.string().min(8),
          newPassword:z.string().min(8),
          confirmPassword:z.string().min(8)
        }
      );
      type formFields = z.infer<typeof schema>;
      const {
          register,
          handleSubmit,
          setError,
          formState,
        } = useForm<formFields>({
          resolver: zodResolver(schema),
        });
        
      const  { errors, isSubmitting } = formState

      const passwordResetHandler:SubmitHandler<formFields> = async (data)=>{
         if(data.confirmPassword !== data.newPassword){
            setError("root",{type:"custom",message:"Passwords do not match"})
            toast({
                variant:"destructive",
                type:"foreground",
                description:"Passwords do not match"
            });
            return;
         }
         try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/password-change`,{
                oldPassword:data.currentPassword,
                newPassword:data.newPassword,
                confirmPassword:data.confirmPassword
            },{
                withCredentials:true
            })
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/logout`,null,{
                withCredentials:true
              })
            toast({
                variant:"success",
                type:"foreground",
                description: "Password changed successfully",
              })
              dispatch(logOut());
            navigate("/login");
        } catch (err) {
            if(err instanceof AxiosError){
                // console.log(error.response.data.message)
                  toast({
                    variant:"destructive",
                    type:"foreground",
                    description:err?.response?.data?.message
                  })
                  setError(
                    "root",{
                      message:err?.response?.data?.message
                    }
                  )
                }
        }
      }
    return (<>
        
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <form onSubmit={handleSubmit(passwordResetHandler)} id="passwordResetForm">
            <div className="space-y-1">
            <Label htmlFor="currentPassword">
                <div className="flex justify-between">
              Current Password
              <div className="text-sm font-light text-blue-600  dark:text-blue-500 hover:cursor-pointer" onClick={()=>{
                navigate("/forgotPassword");
              }}>forgot password ?</div>
                </div></Label>
                <InputPassword
                 autoComplete="off"
                 placeholder="Password"
                 id="currentPassword"
                 {...register("currentPassword")} 
                  />
                  {
                    errors.currentPassword && <p className="text-red-600">{errors.currentPassword.message}</p>
                  }
            </div>
            <div className="space-y-1">
            <Label htmlFor="newPassword">New Password</Label>
                <InputPassword
                 autoComplete="off"
                 placeholder="Password"
                 id="newPassword"
                 {...register("newPassword")} 
                  />
                  {
                    errors.newPassword && <p className="text-red-600">{errors.newPassword.message}</p>
                  }
            </div>
            <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
                <InputPassword
                 autoComplete="off"
                 placeholder="Password"
                 id="confirmPassword"
                 {...register("confirmPassword")} 
                  />
                  {
                    errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>
                  }
            </div>
          
            {
                    errors.root && <p className="text-red-600 text-center mt-4">
                      {JSON.stringify(errors.root.message)}
                    </p>
                  }
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
          <Button size="lg" className="mt-6 mb-4" disabled={isSubmitting} type="submit" form="passwordResetForm">
            {
              isSubmitting ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait</>) : "Change Password"
            }
          </Button>
          </CardFooter>
        </Card>
    </>)
}
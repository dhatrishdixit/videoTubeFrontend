import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
        Card,
        CardContent,
        CardHeader,
        CardTitle,
            } from "@/components/ui/card";
import { InputPassword } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import { SubmitHandler,useForm } from "react-hook-form";
import axios, { AxiosError } from 'axios';
import { useToast } from "../../components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";




export function ResetPasswordPage(){
    const {toast} = useToast();
    const navigate = useNavigate();
    const { state } = useLocation();
    const schema = z.object(
        {
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
    
    useEffect(()=>{
       if(!state?.resetPasswordAccess) navigate("/login");
    },[state])

    const onSubmit:SubmitHandler<formFields> = async (data) =>{
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
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/reset-password`,{
                resetPasswordAccess:state?.resetPasswordAccess,
                newPassword:data.newPassword,
                confirmNewPassword:data.confirmPassword
            },{
                withCredentials:true
            })
            toast({
                variant:"success",
                type:"foreground",
                description: "Password changed successfully",
              })
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

    return (
        <div className="flex w-screen h-screen justify-center items-center">
        <Card className="w-[350px] h-fit">
        <CardHeader>
          <CardTitle className="text-4xl text-center">New Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2">
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
  
              <div className="flex flex-col space-y-2">
                <Label htmlFor="password"><div className="flex justify-between">
                Confirm Password
                </div>
            </Label>
                <InputPassword
                 autoComplete="off"
                 placeholder="Confirm Password"
                 id="password"
                 {...register("confirmPassword")} 
                  />
                  {
                    errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>
                  }
              </div>
                  {
                    errors.root && <p className="text-red-600 text-center">
                      {JSON.stringify(errors.root.message)}
                    </p>
                  }
            </div>
           <div className="w-full flex align-middle justify-center">
           <Button size="lg" className="mt-6 mb-4" disabled={isSubmitting}>
            {
              isSubmitting ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait</>) : "Change Password"
            }
          </Button>
           </div>
       
        
            </form>
        </CardContent>
        </Card>
        </div>
    )
}
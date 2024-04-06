import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input, InputPassword } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {SubmitHandler,useForm} from "react-hook-form";
import axios,{AxiosError} from "axios";
import { useToast } from "./ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";



export const Register:React.FC = () => {

  // TODO: add refresh token functionality 
  const navigate = useNavigate();
  const {toast} = useToast();
  const schema = z.object({
    username:z.string(),
    fullName:z.string(),
    email:z.string().email(),
    password:z.string().min(8),
    confirmPassword:z.string().min(8),
    avatar:z.instanceof(FileList).refine(val => val.length == 1,"only one avatar file should be there "),
    coverImage:z.instanceof(FileList).refine(val => val.length <= 1,"coverImage should not be more than 1").optional()
  })
  
  type formFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    formState
  } = useForm<formFields>(
    {
      resolver:zodResolver(schema)
    }
  )

  const {errors,isSubmitting} = formState ;

   const onSubmit:SubmitHandler<formFields> = async (data)  =>{
      try {
        const passwordCorrect = data.password === data.confirmPassword;
        if(!passwordCorrect){
           throw new Error("confirm password should be same")
        }
        const formData = new FormData();
        formData.append("username",data.username.toLowerCase());
        formData.append("fullName",data.fullName);
        formData.append("email",data.email);
        formData.append("password",data.password);
        formData.append("avatar",data.avatar[0]);
        if(data?.coverImage?.length == 1){
           formData.append("coverImage",data?.coverImage[0])
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/register`,formData);
    
        toast({
          variant:"success",
          type:"foreground",
          description:"registration successfull"
        })
        setTimeout(()=>{
          navigate('/login')
        },2000)
        // for (const p of formData) {
        //   console.log(p)
        // }
      } catch (error) {

        if(error instanceof AxiosError){
        // console.log(error.response.data.message)
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
    <Card className="w-[700px] my-2 ">
      <CardHeader>
        <CardTitle className="text-3xl text-center">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="registerForm" onSubmit = {handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 w-full gap-4">
            <div className="flex flex-col justify-evenly">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  type="text"
                  autoComplete="off"
                  {...register("username")}
                />
                {errors.username &&
                <p className="text-red-600">{errors.username.message}</p>}
              </div>
              <div className="flex flex-col space-y-2 pt-1">
                <Label htmlFor="fullName">Name</Label>
                <Input
                  id="fullName"
                  placeholder="name"
                  type="text"
                  autoComplete="off"
                  {...register("fullName")}
                />
                  {errors.fullName &&
                    <p className="text-red-600">{errors.fullName.message}</p>}
              </div>
              <div className="flex flex-col space-y-2 pt-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  autoComplete="off"
                  {...register("email")}
                />
                  {errors.email &&
                    <p className="text-red-600">{errors.email.message}</p>}
              </div>

              <div className="flex flex-col space-y-2 pt-1">
                <Label htmlFor="password">Password</Label>
                <InputPassword 
                placeholder="Password"
                autoComplete="off" 
                id="password" 
                {...register("password")}
                />
                  {errors.password &&
                    <p className="text-red-600">{errors.password.message}</p>}
              </div>
              <div className="flex flex-col space-y-2 pt-1">
                <Label htmlFor="confirmPassword">confirm password</Label>
                <InputPassword 
                placeholder="confirm password"
                autoComplete="off" 
                id="confirmPassword"
                {...register("confirmPassword")}
                />
                  {errors.confirmPassword &&
                    <p className="text-red-600">{errors.confirmPassword.message}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-start">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="avatar">avatar</Label>
                <Input 
                id="avatar" 
                type="file" 
                {...register("avatar")}
                />
                  {errors.avatar &&
                    <p className="text-red-600">{errors.avatar.message}</p>}
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="coverImage">coverImage</Label>
                <Input 
                id="coverImage" 
                type="file" 
                {...register("coverImage")}
                />
                  {errors.coverImage &&
                    <p className="text-red-600">{errors.coverImage.message}</p>}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center flex-col">
        <Button size="lg" className="mb-4" form="registerForm" disabled={isSubmitting}>
        {
            isSubmitting ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait</>) : "Register"
          }
        </Button>
        {
          errors.root && <p className="text-red-600">
            {errors.root.message}
            </p>
        }
        <div>
          <p className="leading-5 [&:not(:first-child)]:mt-6 text-sm flex cursor-default">
            Already have an account ? &nbsp;
            <p
              className="group text-red-600 transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => {
                navigate("/login")
                console.log("link clicked");
              }}
            >
              <span className="bg-left-bottom bg-gradient-to-r from-red-600 to-red-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                click here to login
              </span>
            </p>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

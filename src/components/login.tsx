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
import {zodResolver} from "@hookform/resolvers/zod";
import { SubmitHandler,useForm } from "react-hook-form";
import axios from 'axios';
import { useToast } from "./ui/use-toast";

export const Login:React.FC = () => {
  // use loading to make it disabled
  // ref and use react hook form
  const {toast} = useToast();
  const schema = z.object(
    {
      email:z.string().email(),
      password:z.string().min(8)
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
  
  const  { errors, isSubmitting } = formState

  const onSubmit:SubmitHandler<formFields> = async (data) =>{
    console.log("clicked");
    console.log(data);
   
    try{
      // api call
      // await new Promise((resolve,_)=>{setTimeout(resolve,5000)});
      // throw new Error("hey there some error")
      console.log(import.meta.env.VITE_BASE_URL)
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/login`,{
        email:data.email,
        password:data.password
      },{
        headers:{
          "Content-Type":"application/json"
      },
        withCredentials:true
      })
       console.log(response);
       toast({
        variant:"success",
        type:"foreground",
        description: "logged in successfully",
      })

      // const userDetails = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/get-current-user`,
      // {
      //   withCredentials:true
      // })
      // console.log(userDetails)
    }
    catch(err){
      if(err instanceof Error){
        let error:string = err.message;
        setError("root",{
          message:error
        })
      }
     
    }
  }

  const navigate = useNavigate();
  
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-4xl text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Email</Label>
              <Input
                id="name"
                placeholder="Email"
                type="email"
                autoComplete="off"
                {...register("email")}
              />
            {
            errors.email && <p className="text-red-600">{errors.email.message}</p>
            }
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Password</Label>
              <InputPassword
               autoComplete="off"
               {...register("password")} 
                />
                {
                  errors.password && <p className="text-red-600">{errors.password.message}</p>
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
          Login
        </Button>
         </div>
     
      
          </form>
      </CardContent>
      <CardFooter className="flex justify-center flex-col">
       
       
        <div>
          <p className="leading-5 [&:not(:first-child)]:mt-6 text-sm flex cursor-default">
            Don't have an account ? &nbsp;{" "}
            <p
              className="group text-red-600 transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => {
                navigate("/register");
              }}
            >
              <span className="bg-left-bottom bg-gradient-to-r from-red-600 to-red-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                click here to register
              </span>
            </p>{" "}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

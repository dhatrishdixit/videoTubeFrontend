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
import axios, { AxiosError } from 'axios';
import { useToast } from "./ui/use-toast";
import {AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";
import { UserState } from "@/features/authentication/auth.slice";
import { logIn } from "@/features/authentication/auth.slice";
import { ReloadIcon } from "@radix-ui/react-icons";
export const Login:React.FC = () => {
  // use loading to make it disabled
  // ref and use react hook form
  const {toast} = useToast();
  const dispatch = useDispatch<AppDispatch>();
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
   
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/login`,{
        email:data.email,
        password:data.password
      },{
        headers:{
          "Content-Type":"application/json"
      },
        withCredentials:true
      })
     //  console.log(response.data.data);
       toast({
        variant:"success",
        type:"foreground",
        description: "logged in successfully",
      })

      const userData:UserState = response.data.data.user;
      dispatch(logIn(userData));
      navigate("/");
      
    }
    catch(err){
      if(err instanceof AxiosError){
        // console.log(error.response.data.message)
         
          setError(
            "root",{
              message:err?.response?.data?.message
            }
          )
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                autoComplete="off"
                placeholder="Email"
                type="email"
              
                {...register("email")}
              />
            {
            errors.email && <p className="text-red-600">{errors.email.message}</p>
            }
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="password"><div className="flex justify-between">
              Password
              <div className="text-sm font-light text-blue-600  dark:text-blue-500 hover:cursor-pointer" onClick={()=>{
                navigate("/forgotPassword");
              }}>forgot password ?</div>
                </div></Label>
              <InputPassword
               autoComplete="off"
               placeholder="Password"
               id="password"
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
          {
            isSubmitting ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait</>) : "Login"
          }
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

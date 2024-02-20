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


export const Login = () => {
  // use loading to make it disabled
  // ref and use react hook form
  
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
    defaultValues: {
   
    },
    resolver: zodResolver(schema),
  });
  
  const  { errors, isSubmitting } = formState

  const onSubmit:SubmitHandler<formFields> = async (data) =>{
    console.log("clicked");
    console.log(data);
    try{
      // api call
      await setTimeout(()=>{console.log('timeout is completed')},1000)
      throw new Error("hey there some error")
    }
    catch(err){
      setError("root",{
        message:err
      })
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
          </div>
          <button>click to submit</button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center flex-col">
        <Button size="lg" className="mb-4">
          Login
        </Button>
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

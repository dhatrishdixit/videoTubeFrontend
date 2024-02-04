import * as React from "react"
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,

  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input, InputPassword } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export const Login = () => {
  // use loading to make it disabled 
  // ref and use react hook form
  

    // const navigate = useNavigate(); this after setting up router
     return (
      <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-4xl">Login</CardTitle>
       
      </CardHeader>
      <CardContent>
        <form>

          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="name">Email</Label>
              <Input id="name" placeholder="Email" type="email" autoComplete="off"/>
            </div>
          
            <div className="flex flex-col space-y-2">
            <Label htmlFor="name">Password</Label>
              <InputPassword autoComplete="off"/>
            </div>
          
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center flex-col">
        <Button size="lg" className="mb-4">Login</Button>
        <div>
        <p className="leading-5 [&:not(:first-child)]:mt-6 text-sm flex cursor-default">
        Don't have an account ? &nbsp; <p className='group text-red-600 transition-all duration-300 ease-in-out cursor-pointer' 
        onClick={()=>{
          // navigate()
           console.log("link clicked")
        }}> 
    <span className='bg-left-bottom bg-gradient-to-r from-red-600 to-red-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out'> 
      click here to register
    </span> 
  </p>  </p></div>
  
      </CardFooter>
    </Card>
     )
}






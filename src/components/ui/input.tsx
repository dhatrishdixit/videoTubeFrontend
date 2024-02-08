import * as React from "react"
import { cn } from "@/lib/utils"
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons"


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}


  const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
      return (
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      )
    }
  )
  Input.displayName = "Input"


const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, type
    //,isFocus,isPasswordVisible,setIsFocus,setPasswordVisible
    , ...props},ref)=>{
    const [isPasswordVisible,setPasswordVisible] = React.useState<boolean|undefined>(false);
    const [isFocus,setIsFocus] = React.useState<boolean|undefined>(false);
    
    return (
      <div
      className = {
          cn("flex flex-row w-full rounded-md border border-input bg-transparent  text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium ",{
            "border-red-600":isFocus
          })
        }
      >
       <input className={cn(
        "flex h-9 w-full rounded-md  bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50  ",
        className
       )}
       id="name" 
       placeholder="Password"
       type={isPasswordVisible?"text":"password"}
       onFocus={()=>{setIsFocus && setIsFocus(true)}}
       onBlur={()=>{setIsFocus && setIsFocus(false)}} 
       ref={ref}
       {...props}
       />
    
        <button onClick={(e)=>{
            e.preventDefault();
            setPasswordVisible && setPasswordVisible((prev) => !prev);
        }}
        className={
          `
          px-3  rounded-r-md }
          `
        }
        >{isPasswordVisible ?<EyeOpenIcon/> :<EyeNoneIcon/>}</button>
        </div>
    )
  }
)
InputPassword.displayName = "Input Password"



export { Input,InputPassword }

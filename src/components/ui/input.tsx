import * as React from "react";
import { cn } from "@/lib/utils";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}

        {...props}
      />
    );
  },
);
Input.displayName = "Input";


const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      ...props
    },
    ref,
  ) => {
    const [isPasswordVisible, setPasswordVisible] = React.useState<
      boolean | undefined
    >(false);

    return (
      <div
        className={cn(
          "grid grid-cols-10",
       
        )}
      >
        <input
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50  col-span-9",
            className,
          )}
          
          
          type={isPasswordVisible ? "text" : "password"}
          ref={ref}
          {...props}
        />

        <button
      
          onClick={(e) => {
            e.preventDefault();
            setPasswordVisible && setPasswordVisible((prev) => !prev);
          }}
          className={`
          px-3  rounded-r-md col-span-1
          `}
        >
          {isPasswordVisible ? <EyeOpenIcon /> : <EyeNoneIcon />}
        </button>
      </div>
    );
  },
);

// this also has major error of onBlur
// const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
//   (
//     {
//       className,
//       type,
//       //,isFocus,isPasswordVisible,setIsFocus,setPasswordVisible
//       ...props
//     },
//     ref,
//   ) => {
//     const [isPasswordVisible, setPasswordVisible] = React.useState<
//       boolean | undefined
//     >(false);
//     const [isFocus, setIsFocus] = React.useState<boolean | undefined>(false);

//     return (
//       <div
//         className={cn(
//           "flex flex-row w-full rounded-md border border-input bg-transparent  text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium ",
//           {
//             "border-red-600": isFocus,
//           },
//         )}
//       >
//         <input
//           className={cn(
//             "flex h-9 w-full rounded-md  bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50  ",
//             className,
//           )}
//           id="name"
//           placeholder="Password"
//           type={isPasswordVisible ? "text" : "password"}
//           onFocus={() => {
//             console.log("is focus")
//             setIsFocus && setIsFocus(true);
//           }}
//           onBlur={() => {
//             console.log("is not focus")
//             setIsFocus && setIsFocus(false);
//           }}
//           ref={ref}
//           {...props}
//         />

//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             setPasswordVisible && setPasswordVisible((prev) => !prev);
//           }}
//           className={`
//           px-3  rounded-r-md }
//           `}
//         >
//           {isPasswordVisible ? <EyeOpenIcon /> : <EyeNoneIcon />}
//         </button>
//       </div>
//     );
//   },
// );

//not working correctly
// import  { useState, useEffect, useRef } from 'react';


// const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
//   (
//     {
//       className,
//       type,
//       ...props
//     },
//     ref,
//   ) => {
//     const [isPasswordVisible, setPasswordVisible] = useState(false);
//     const [isFocused, setIsFocused] = useState(false);
//     const inputRef = useRef<HTMLInputElement|null>(null);

//     useEffect(() => {
//       const handleClickOutside = (event: MouseEvent) => {
//         if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
//           setIsFocused(false);
//         }
//       };

//       document.addEventListener('mousedown', handleClickOutside);
//       return () => {
//         document.removeEventListener('mousedown', handleClickOutside);
//       };
//     }, []);

//     return (
//       <div
//         className={cn(
//           "flex flex-row w-full rounded-md border bg-transparent text-sm shadow-sm transition-colors",
//           {
//             "border-input": isFocused,
//             "border-red-600": isFocused && isPasswordVisible,
//           },
//           className
//         )}
//       >
//         <input
//           ref={(el) => {
//             inputRef.current = el;
//             if (typeof ref === 'function') {
//               ref(el);
//             } else if (ref) {
//               ref.current = el;
//             }
//           }}
//           className={cn(
//             "flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
//             className,
//           )}
//           id="name"
//           placeholder="Password"
//           type={isPasswordVisible ? "text" : "password"}
//           onFocus={() => setIsFocused(true)}
//           {...props}
//         />

//         <button
//           onClick={(e) => {
//             e.preventDefault();
//             setPasswordVisible((prev) => !prev);
//           }}
//           className="px-3 rounded-r-md"
//         >
//           {isPasswordVisible ? <EyeOpenIcon /> : <EyeNoneIcon />}
//         </button>
//       </div>
//     );
//   },
// );



InputPassword.displayName = "Input Password";


export { Input, InputPassword };

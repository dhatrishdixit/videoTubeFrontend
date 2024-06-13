import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import axios, { AxiosError } from "axios";
import { useLocation } from "react-router-dom"
import { useToast } from "../../components/ui/use-toast";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

//TODO: make this route such that only people who have filled forgotPasswordPage come here 
export function OtpForm() {
    const { state } = useLocation();
    const { toast }  = useToast();
    const [loadingResendEmail,setLoadingResendEmail] = useState<boolean>(false);
    const [otpValue,setOtpValue] = useState<string>("");
    const [error,setError] = useState<string>("");
    const [otpVerificationLoading,setOtpVerificationLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(()=>{
       if(!state?.email) navigate("/forgotPassword")
    },[state])
    const otpSubmitHandler = async ():Promise<void> => {
          if(otpValue.length != 6){
             setError("otp must have 6 characters");
             toast({
              variant:"destructive",
              type:"foreground",
              description:"otp must have 6 characters"
             })
             return ;
          }
          setError("");

        try {
            setOtpVerificationLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/verify-otp`,{
              otp:otpValue
            },{
              withCredentials:true
            });
            setOtpVerificationLoading(false);
            toast({
              variant:"success",
              type:"foreground",
              description:"otp verified successfully"
            })
            navigate("/resetPassword",{
              state:{
                resetPasswordAccess:response.data.data.resetPasswordAccess
              }
            })
  
        } catch (error) {
          setOtpVerificationLoading(false);
          if(error instanceof AxiosError){
            toast({
                variant:"destructive",
                type:"foreground",
                description:error?.response?.data?.message
            })
          }
        }
         

    }
    const resendHandler = () => {
      setLoadingResendEmail(true);
      axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/send-email-for-password-otp`,{
        email:state?.email,
      },{
        withCredentials:true
      })
      .then(res => {
        toast({
          variant:"success",
          type:"foreground",
          description:" verification mail has been sent to your email"
      });
      setLoadingResendEmail(false);
      })
      .catch(error => {
        if(error instanceof AxiosError){
          toast({
              variant:"destructive",
              type:"foreground",
              description:error?.response?.data?.message
          })
      }
      setLoadingResendEmail(false);
      })
    }
 
    return (
        <div className="flex h-screen w-screen items-center justify-center flex-col">
        <Card className="sm:w-[450px] w-[350px]">
          <CardHeader className="text-2xl">
            Verification Code
          </CardHeader>
          <CardContent className="text-gray-500">
          we have sent you otp on - {state?.email} <br/> Enter it here for verification
          </CardContent>
          <CardContent>
        <div className="flex flex-col justify-center items-center w-full">
        <InputOTP 
        maxLength={6} 
         value={otpValue} 
        onChange={(e)=>{
                setOtpValue(e);
        }}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
    {
                  error && <p className="text-red-600 text-center">{error}</p>
            }
            </div>
    <div className="flex justify-between">
    <Button 
    size="default"
    variant="outline" 
    className="mt-6 mb-4" 
    disabled={loadingResendEmail} 
    onClick={resendHandler}>
          {
            loadingResendEmail ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait</>) : "Resend Code"
          }
    </Button>
    <Button
    size="default"
    variant="default" 
    className="mt-6 mb-4" 
    disabled={otpVerificationLoading}
    onClick={otpSubmitHandler}
    >
         {
            otpVerificationLoading ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/>
            Please wait</>) : "Verify"
          }
    </Button>
    </div>
    </CardContent>
    </Card>
        </div>
    )
}


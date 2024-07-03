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
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useToast } from "./ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";


export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isResendBtnVisible, setIsResendBtnVisible] = React.useState<boolean>(false);
  const [emailForResend, setEmailForResend] = React.useState<string>("");
  const [loadingResendBtn, setLoadingResendBtn] = React.useState<boolean>(false);

  const schema = z.object({
    username: z.string().min(1, "Username is required"),
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters long"),
    avatar: z.instanceof(FileList)
      .refine(val => val?.length === 1, "Atleast one avatar file should be added"),
    coverImage: z.instanceof(FileList).refine(val => val?.length <= 1, "Cover image should not be more than 1").optional()
  });

  type formFields = z.infer<typeof schema>;

  const handleResendVerificationMail = async () => {
    try {
      setLoadingResendBtn(true);
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/send-email-for-verification`, {
        email: emailForResend
      }, {
        withCredentials: true
      });
      setLoadingResendBtn(false);
      toast({
        variant: "success",
        type: "foreground",
        description: "Verification mail has been sent to your email"
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: "destructive",
          type: "foreground",
          description: error?.response?.data?.message
        });
        setLoadingResendBtn(false);
      }
    }
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<formFields>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    try {
      if (data.password !== data.confirmPassword) {
        setError("confirmPassword", { message: "Passwords do not match" });
        throw new Error("Passwords do not match");
      }
      const formData = new FormData();
      formData.append("username", data.username.toLowerCase());
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("avatar", data.avatar[0]);
      if (data.coverImage && data.coverImage.length === 1) {
        formData.append("coverImage", data.coverImage[0]);
      }
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/register`, formData);
      setIsResendBtnVisible(true);
      setEmailForResend(data.email);
      toast({
        variant: "success",
        type: "foreground",
        description: "Verification mail has been sent to your email"
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: "destructive",
          type: "foreground",
          description: error?.response?.data?.message
        });
      }
    }
  }

  return (
    <Card className="w-[700px] my-2">
      <CardHeader>
        <CardTitle className="text-3xl text-center">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="registerForm" onSubmit={handleSubmit(onSubmit)}>
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
                {errors.username && <p className="text-red-600">{errors.username.message}</p>}
              </div>
              <div className="flex flex-col space-y-2 pt-1">
                <Label htmlFor="fullName">Name</Label>
                <Input
                  id="fullName"
                  placeholder="Name"
                  type="text"
                  autoComplete="off"
                  {...register("fullName")}
                />
                {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}
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
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
              </div>
              <div className="flex flex-col space-y-2 pt-1">
                <Label htmlFor="password">Password</Label>
                <InputPassword
                  placeholder="Password"
                  autoComplete="off"
                  id="password"
                  {...register("password")}
                />
                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
              </div>
              <div className="flex flex-col space-y-2 pt-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <InputPassword
                  placeholder="Confirm Password"
                  autoComplete="off"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-start">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="avatar">Avatar</Label>
                <Input
                  id="avatar"
                  type="file"
                  {...register("avatar")}
                />
                {errors.avatar && <p className="text-red-600">{errors.avatar.message}</p>}
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="coverImage">Cover Image</Label>
                <Input
                  id="coverImage"
                  type="file"
                  {...register("coverImage")}
                />
                {errors.coverImage && <p className="text-red-600">{errors.coverImage.message}</p>}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center flex-col">
        <div className="flex gap-3 justify-between">
          <Button size="lg" className="mb-4" form="registerForm" disabled={isSubmitting}>
            {isSubmitting ? (
              <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait </>
            ) : "Register"}
          </Button>
          {isResendBtnVisible && (
            <Button size="lg" className="mb-4 bg-green-700 hover:bg-green-800" onClick={handleResendVerificationMail}>
              {loadingResendBtn ? (
                <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait </>
              ) : "Resend Email"}
            </Button>
          )}
        </div>
        {errors.root && <p className="text-red-600">{errors.root.message}</p>}
        <div>
          <p className="leading-5 [&:not(:first-child)]:mt-6 text-sm flex cursor-default">
            Already have an account? &nbsp;
            <p
              className="group text-red-600 transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => navigate("/login")}
            >
              <span className="bg-left-bottom bg-gradient-to-r from-red-600 to-red-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                Click here to login
              </span>
            </p>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

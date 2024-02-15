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

export const Register = () => {
  // use loading to make it disabled
  // ref and use react hook form

  // const navigate = useNavigate(); this after setting up router
  return (
    <Card className="w-[700px]">
      <CardHeader>
        <CardTitle className="text-4xl">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid md:grid-cols-2 w-full  gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="username">UserName</Label>
                <Input
                  id="username"
                  placeholder="Username"
                  type="text"
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="fullName">FullName</Label>
                <Input
                  id="fullName"
                  placeholder="fullName"
                  type="text"
                  autoComplete="off"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  autoComplete="off"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Password</Label>
                <InputPassword autoComplete="off" />
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-start">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="avatar">avatar</Label>
                <Input id="avatar" type="file" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="coverImage">coverImage</Label>
                <Input id="coverImage" type="file" />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center flex-col">
        <Button size="lg" className="mb-4">
          Login
        </Button>
        <div>
          <p className="leading-5 [&:not(:first-child)]:mt-6 text-sm flex cursor-default">
            Already have an account ? &nbsp;{" "}
            <p
              className="group text-red-600 transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => {
                // navigate()
                console.log("link clicked");
              }}
            >
              <span className="bg-left-bottom bg-gradient-to-r from-red-600 to-red-600 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                click here to login
              </span>
            </p>{" "}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

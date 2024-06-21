import React from "react";
import { Button } from "@/components/ui/button"
import { Input, InputPassword } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useNavigate } from "react-router-dom";
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import axios, { AxiosError } from 'axios';
import { AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { PasswordResetSettings } from "./passwordResetSettings";
import { UserAccountFieldReset } from "./userAccountFieldReset";



export const SettingsPage = () => {

    
    return (
        <div className="w-full overflow-y-scroll h-[90vh] scrollbar-thin dark:scrollbar-track-[#19191d] scrollbar-thumb-red-600 scrollbar-track-white">
            <div className="w-full flex items-center justify-center">
             <Tabs defaultValue="account" className="sm:w-[500px] w-[350px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
      <UserAccountFieldReset />
      </TabsContent>
      <TabsContent value="password">
      <PasswordResetSettings />
      </TabsContent>
    </Tabs>
    </div>
        </div>
        
    )
}
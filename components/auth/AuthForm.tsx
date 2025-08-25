"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Schema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type AuthFormProps = {
  title: "Register" | "Login";
  onSubmit: (data: z.infer<typeof Schema>) => void;
};

const AuthForm = ({ title, onSubmit }: AuthFormProps) => {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="max-w-[500px] mx-auto">
      <h1 className="border-b py-4 my-4 text-center font-bold text-3xl">
        {title}
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@doe.com" {...field} />
                </FormControl>
                <FormDescription>Your email address</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="johneiei" {...field} />
                </FormControl>
                <FormDescription>Your secure password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {title}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;

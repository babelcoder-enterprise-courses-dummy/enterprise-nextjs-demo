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
import { User } from "@/models/users";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ChangeEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const Schema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8).optional(),
  role: z.enum(["user", "admin"]),
  avatar: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB",
    )
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file.type),
      "File type must be JPEG or PNG",
    )
    .optional(),
});

const AuthForm = () => {
  const profile: User = {
    id: 1,
    name: "John Doe",
    email: "john@doe.com",
    role: "user",
    avatar: "https://picsum.photos/seed/SXWEK/3890/2785",
  };

  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      role: profile.role,
    },
  });
  const [image, setImage] = useState(profile.avatar);

  const onSubmit = (data: z.infer<typeof Schema>) => {
    console.log(data);
  };

  const previewImage = (image: string) => {
    setImage(image);
  };

  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;
    const image = URL.createObjectURL(file);

    previewImage(image);
    form.setValue("avatar", file);
  };

  return (
    <div className="max-w-[500px] mx-auto">
      <h1 className="border-b py-4 my-4 text-center font-bold text-3xl">
        Edit Profile
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="mb-4 w-[150px] h-[150px] mx-auto relative">
            <Image
              priority
              className="mx-auto w-auto object-fill object-center"
              src={image ?? "/assets/images/avatar.png"}
              alt="Image Upload"
              fill
            />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="avatar">Avatar</Label>
            <Input id="avatar" type="file" onChange={handleImageUpload} />
            <FormMessage>{form.formState.errors.avatar?.message}</FormMessage>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="john@doe.com" {...field} />
                </FormControl>
                <FormDescription>Your email address</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue="user"
                    className="flex flex-col"
                  >
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="user" />
                      </FormControl>
                      <FormLabel className="font-normal">User</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center gap-3">
                      <FormControl>
                        <RadioGroupItem value="admin" />
                      </FormControl>
                      <FormLabel className="font-normal">Admin</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
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
                  <Input
                    type="password"
                    placeholder="awesomepassword"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Your secure password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;

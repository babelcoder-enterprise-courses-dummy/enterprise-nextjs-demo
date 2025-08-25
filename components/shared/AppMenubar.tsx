"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useGetProfile, useLogout } from "@/hooks/queries/auth";
import { cn } from "@/lib/utils";
import useCart from "@/stores/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const AppMenuBar = () => {
  const totalItems = useCart((state) => state.getTotalItems());
  const pathname = usePathname();
  const { data: profile, isLoading, isError } = useGetProfile();
  const { mutateAsync: logout } = useLogout();

  return (
    <div className="flex w-full">
      <NavigationMenu className="flex-1">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/" className={cn({ "font-bold": pathname === "/" })}>
                Babel Shop
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/products"
                className={cn({ "font-bold": pathname === "/products" })}
              >
                Products
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="ml-auto mr-4">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Button variant="secondary" size="icon" className="size-8" asChild>
              <Link href="/cart">
                <ShoppingCart />
                <Badge
                  className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-2 -right-2"
                  variant="destructive"
                >
                  {totalItems}
                </Badge>
              </Link>
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {isLoading && <Skeleton className="h-8 w-8 rounded-full my-auto" />}
      {isError && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="/assets/images/avatar.png" />
              <AvatarFallback>BC</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Auth</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/auth/login" className="text-center w-full">
                Login
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/auth/register" className="text-center w-full">
                Register
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {!isError && profile && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>
                {(profile.name ?? profile.email).slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/auth/profile" className="text-center w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full font-normal"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </DropdownMenuItem>
            {profile.role === "admin" && (
              <>
                <DropdownMenuLabel>Admin Panel</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/admin/dashboard" className="text-center w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default AppMenuBar;

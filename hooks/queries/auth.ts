import { Credentials, ProfileForm } from "@/models/auth";
import { User } from "@/models/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: Credentials) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(credentials),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Invalid Credentials");
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (credentials: Credentials) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
      return fetch(url, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });
};

export const useGetProfile = () => {
  return useQuery({
    retry: false,
    queryKey: ["profile"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`;
      const res = await fetch(url, { credentials: "include" });

      if (!res.ok) throw new Error("Unauthorized");

      const profile = (await res.json()) as User;
      return profile;
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`;
      return fetch(url, {
        method: "DELETE",
        credentials: "include",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profile: ProfileForm) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`;
      return fetch(url, {
        method: "PATCH",
        body: JSON.stringify(profile),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

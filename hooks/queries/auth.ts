import fetcher from "@/lib/fetcher";
import { Credentials, ProfileForm } from "@/models/auth";
import { User } from "@/models/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: Credentials) => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
      const res = await fetcher(url, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type": "application/json",
        },
      });

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
      return fetcher(url, {
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
      const res = await fetcher(url);

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
      return fetcher(url, {
        method: "DELETE",
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
      const formData = new FormData();
      if (profile.name) formData.append("name", profile.name);
      if (profile.email) formData.append("email", profile.email);
      if (profile.password) formData.append("password", profile.password);
      if (profile.avatar) formData.append("avatar", profile.avatar);

      return fetcher(url, {
        method: "PATCH",
        body: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

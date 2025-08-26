import { NotFoundError } from "./errors/not-found-error";
import { UnauthorizedError } from "./errors/unauthorized-error";

const fetcher = async (
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> => {
  const res = await fetch(input, {
    ...init,
    credentials: "include",
  });

  if (res.status === 404) throw new NotFoundError();
  if (res.status !== 401) return res;

  const refreshTokenRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
    {
      method: "PATCH",
      credentials: "include",
    },
  );
  if (!refreshTokenRes.ok) throw new UnauthorizedError("refresh token failed");

  return fetch(input, {
    ...init,
    credentials: "include",
  });
};

export default fetcher;

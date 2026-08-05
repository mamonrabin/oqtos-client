import { apiBaseUrl } from "@/config";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
interface LoginPayload {
  email: string;
  password: string;
}

export const register = async (payload: RegisterPayload) => {
  const res = await fetch(`${apiBaseUrl}/user/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};
export const login = async (payload: LoginPayload) => {
  // Login doesn't require a token
  const res = await fetch(`${apiBaseUrl}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const getRecentUser = async () => {
  const res = await fetch(`${apiBaseUrl}/user/me`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

// export const getSupperAdmin = async () => {
//   const { data } = await AxiosInstance.get("/user/me");
//   return data;
// };
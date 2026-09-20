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

export const googleLogin = () => {
  window.location.href = `${apiBaseUrl}/auth/google`;
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

export const logout = async () => {
  const res = await fetch(`${apiBaseUrl}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Logout failed");
  }

  return data;
}




export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const res = await fetch(`${apiBaseUrl}/auth/change-password`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oldPassword,
      newPassword,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to change password");
  }

  return data;
};

export const forgotPassword = async (email: string) => {
  const res = await fetch(`${apiBaseUrl}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to send password reset email");
  }

  return data;
};


export const resetPassword = async (
  id: string,
  token: string,
  newPassword: string
) => {
  const res = await fetch(`${apiBaseUrl}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
      newPassword,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || "Failed to reset password"
    );
  }

  return data;
};
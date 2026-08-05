/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { getRecentUser } from "@/services/auth.api";

export const useCurrentUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      const res = await getRecentUser();
      setUser(res.data);
      setError(null);
    } catch (err) {
      setUser(null);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    user,
    loading,
    error,
    refetch,
  };
};
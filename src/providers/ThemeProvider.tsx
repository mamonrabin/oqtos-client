"use client";

import { useEffect } from "react";
import { getTheme } from "@/services/theme.api";

const ThemeProvider = () => {
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const response = await getTheme("Active");

        const theme = response?.data;

        if (!theme) return;

        const root = document.documentElement;

        if (theme.primary) {
          root.style.setProperty("--primary", theme.primary);
        }

        if (theme.secondary) {
          root.style.setProperty("--secondary", theme.secondary);
        }

        if (theme.font) {
          root.style.setProperty("--font-sans", theme.font);
        }
      } catch (error) {
        console.error("Failed to load theme:", error);
      }
    };

    loadTheme();
  }, []);

  return null;
};

export default ThemeProvider;
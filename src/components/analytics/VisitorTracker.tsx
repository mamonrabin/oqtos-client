"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { apiBaseUrl } from "@/config";



const getOrCreateId = (
  key: string,
  storage: Storage,
) => {
  let id = storage.getItem(key);

  if (!id) {
    id = crypto.randomUUID();
    storage.setItem(key, id);
  }

  return id;
};

export default function VisitorTracker() {
  const pathname = usePathname();

  const lastTrackedPath = useRef("");

  useEffect(() => {
    if (!apiBaseUrl || !pathname) return;

    try {
      const visitorId = getOrCreateId(
        "oqtos_visitor_id",
        localStorage,
      );

      const sessionId = getOrCreateId(
        "oqtos_session_id",
        sessionStorage,
      );

      const sendRequest = (
        endpoint: string,
        data: Record<string, string>,
      ) => {
        fetch(`${apiBaseUrl}/visitor/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          keepalive: true,
        }).catch(() => {});
      };

      if (lastTrackedPath.current !== pathname) {
        lastTrackedPath.current = pathname;

        sendRequest("track", {
          visitorId,
          sessionId,
          path: pathname,
          referrer: document.referrer || "",
        });
      }

      // Update the live session every 30 seconds.
      sendRequest("heartbeat", {
        visitorId,
        sessionId,
        path: pathname,
      });

      const interval = window.setInterval(() => {
        sendRequest("heartbeat", {
          visitorId,
          sessionId,
          path: pathname,
        });
      }, 30_000);

      return () => {
        window.clearInterval(interval);
      };
    } catch (error) {
      console.error("Visitor tracking error:", error);
    }
  }, [pathname]);

  return null;
}
import { useState } from "react";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return undefined;
}

export function useCookie(
  cookieName: string,
  defaultValue: string,
  options?: {
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
    [key: string]: any;
  }
) {
  const [cookieValue, setCookieValue] = useState<string>(() => {
    const cookie = getCookie(cookieName);
    return cookie ? cookie : defaultValue;
  });

  const setCookie = (value: string, expiresInDays?: number) => {
    const date = new Date();
    if (expiresInDays) {
      date.setTime(date.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
    }
    const expires = expiresInDays ? `; expires=${date.toUTCString()}` : "";

    const cookieOptions = {
      path: options?.path || "/",
      secure: options?.secure || true,
      httpOnly: options?.httpOnly || false,
      sameSite: options?.sameSite || "Strict",
      ...options,
    };

    const cookieString = `${cookieName}=${value}${expires}; path=${
      cookieOptions.path
    }; samesite=${cookieOptions.sameSite}; ${
      cookieOptions.secure ? "secure" : ""
    }`;

    document.cookie = cookieString;
    setCookieValue(value);
  };

  const removeCookie = () => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    setCookieValue(defaultValue);
  };

  return [cookieValue, setCookie, removeCookie] as const;
}

import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface UseNavigationReturn {
  pathname: string;
  push: (options?: {
    scroll?: boolean;
    params?: Record<string, string>;
  }) => void;
  replace: (options?: {
    scroll?: boolean;
    params?: Record<string, string>;
  }) => void;
  goBack: () => void;
  removeQueryParam: (key: string) => void;
}

export function useNavigation(): UseNavigationReturn {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;

  const buildUrlWithParams = useCallback(
    (params?: Record<string, string>): string => {
      const searchParams = new URLSearchParams(location.search);

      if (params) {
        Object.keys(params).forEach((key) => {
          searchParams.set(key, params[key]);
        });
      }

      return pathname + "?" + searchParams.toString();
    },
    [location.search, pathname]
  );

  const push = useCallback(
    (options?: { scroll?: boolean; params?: Record<string, string> }) => {
      const urlWithParams = buildUrlWithParams(options?.params);
      navigate(urlWithParams);
      if (options?.scroll) {
        window.scrollTo(0, 0);
      }
    },
    [buildUrlWithParams, navigate]
  );

  const replace = useCallback(
    (options?: { scroll?: boolean; params?: Record<string, string> }) => {
      const urlWithParams = buildUrlWithParams(options?.params);
      navigate(urlWithParams, { replace: true });
      if (options?.scroll) {
        window.scrollTo(0, 0);
      }
    },
    [buildUrlWithParams, navigate]
  );

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const removeQueryParam = useCallback(
    (key: string) => {
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete(key);
      const newUrl = pathname + "?" + searchParams.toString();
      navigate(newUrl);
    },
    [location.search, pathname, navigate]
  );
  return {
    pathname,
    push,
    replace,
    goBack,
    removeQueryParam,
  };
}

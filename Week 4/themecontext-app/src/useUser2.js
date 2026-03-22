// useUser.js
import { useState, useEffect } from "react";

const STORAGE_KEY = "auth_user";

export default function useUser() {
  const [userState, setUserState] = useState({
    user: null,
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);

    // If user exists in localStorage, use it (avoid request)
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserState({
        user: parsed.user,
        isAdmin: parsed.isAdmin,
        loading: false,
      });
      return;
    }

    // Otherwise fetch from server
    let isMounted = true;

    fetch("/login", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          const newState = {
            user: data.user || null,
            isAdmin: data.isAdmin || false,
            loading: false,
          };

          setUserState(newState);

          // store in localStorage
          if (data.user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setUserState({
            user: null,
            isAdmin: false,
            loading: false,
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return [userState, setUserState];
}

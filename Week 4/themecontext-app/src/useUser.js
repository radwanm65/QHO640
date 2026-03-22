// useUser.js
import { useState, useEffect } from "react";

export default function useUser() {
  const [userState, setUserState] = useState({
    user: null,
    isAdmin: false,
    loading: true,
  });

  useEffect(() => {
    let isMounted = true;

    fetch("/login", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setUserState({
            user: data.user || null,
            isAdmin: data.isAdmin || false,
            loading: false,
          });
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

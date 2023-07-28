import { useState } from "react";
import { useAuthContext } from "./userAuthContext";

export const useLogin = () => {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext(); // Fixed the destructuring here

  const login = async (email: string, password: string  ) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("/users/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password  }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      setIsLoading(false);
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));
      // update the Auth with the LOGIN action and user data as the payload
      dispatch({type: 'LOGIN', payload: json})
    }
  };

  return { error, isLoading, login };
};

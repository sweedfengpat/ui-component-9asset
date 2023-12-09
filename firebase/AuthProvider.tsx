import { Component, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "firebase/auth";
import { auth } from "./index";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchUserInfo } from "../store/users/reducer";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface AuthProviderState {
  user: User | null;
}

export const AuthProvider  = (props: any) => { 
  const [state, setState] = useState<AuthProviderState>({ user: null });
  const dispatch = useDispatch<AppDispatch>();
  const [, setUser] = useLocalStorage(`9asset.userinfo`);

  useEffect(() => {
    const unsub = getUser();

    return () => { 
      unsub && unsub();
    }
  }, []);

  const getUser = () => {
    return auth.onAuthStateChanged(async (firebaseUser) => {
      
      setState({ user: firebaseUser });
      if (firebaseUser) {
        const user = await dispatch(fetchUserInfo(firebaseUser));
        setUser(user.payload);
      } else {
        if ((process.env.NODE_ENV || 'development') !== 'development') {
          setState({ user: null });
          setUser(null);
        }
      }
    })
  }

  return <AuthContext.Provider value={state.user}>{props.children}</AuthContext.Provider>;
}
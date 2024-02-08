"use client";

import { Figtree } from "next/font/google";
import {
  userReducer,
  initialUserState,
  AuthContext,
  AuthDispatchContext,
} from "@/app/(authenticated)/AuthContext";
import { auth } from "@/firebase.config";
import {
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { useReducer, useState, useEffect } from "react";
import Loading from "./Loading";
import Intro from "./Intro";
import MainContainer from "./MainContainer";

const figtree = Figtree({ subsets: ["latin"] });

const ContextWrapper = (props: { children: React.ReactNode }) => {
  const [currentUser, dispatch] = useReducer(userReducer, initialUserState);
  const [isLoading, setLoading] = useState(true);
  setPersistence(auth, browserLocalPersistence);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
        setLoading(false);
      } else {
        dispatch({ type: "LOGOUT", payload: null });
        setLoading(false);
      }
    });
  });

  return (
    <AuthContext.Provider value={currentUser}>
      <AuthDispatchContext.Provider value={dispatch}>
        <html lang="en">
          <body
            className={`flex flex-col items-center bg-black px-4 p-8 antialiased font-medium ${figtree.className}`}
          >
            {isLoading ? (
              <Loading />
            ) : (
              <MainContainer>
                <Intro />
                {props.children}
              </MainContainer>
            )}
          </body>
        </html>
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

export default ContextWrapper;

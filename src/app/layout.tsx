"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import {
  AuthContext,
  AuthDispatchContext,
  initialUserState,
  userReducer,
} from "./AuthContext";
import { useEffect, useReducer } from "react";
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
import { auth } from "@/firebase.config";

const manrope = Manrope({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, dispatch] = useReducer(userReducer, initialUserState);
  setPersistence(auth, browserLocalPersistence);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      } else {
        dispatch({ type: "LOGOUT", payload: null });
      }
    });
  });

  return (
    <AuthContext.Provider value={currentUser}>
      <AuthDispatchContext.Provider value={dispatch}>
        <html lang="en">
          <body
            className={`flex flex-col items-center bg-black px-4 p-8 antialiased font-medium ${manrope.className}`}
          >
            {children}
          </body>
        </html>
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

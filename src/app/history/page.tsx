"use client";

import Login from "@/components/Login";
import MainContainer from "@/components/MainContainer";
import Image from "next/image";
import { useContext } from "react";
import Intro from "@/components/Intro";
import Create from "@/components/Create";
import User from "@/components/User";
import Footer from "@/components/Footer";
import { AuthContext } from "../AuthContext";

export default function History() {
  const user = useContext(AuthContext);

  return (
    <>
      {user == null ? (
        <Login />
      ) : (
        <>
          <User />
          <Create />
          <Footer />
        </>
      )}
    </>
  );
}

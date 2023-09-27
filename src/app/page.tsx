'use client'

import Login from "@/components/Login";
import MainContainer from "@/components/MainContainer";
import Image from "next/image";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import Intro from "@/components/Intro";

export default function Home() {

  const user = useContext(AuthContext);

  return (
    <MainContainer>
      <Intro />
      {user == null || undefined ? <Login /> : <></>}
    </MainContainer>
  );
}

"use client";

import Login from "@/components/Login";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import Create from "@/components/Create";
import User from "@/components/User";
import Footer from "@/components/Footer";
import Signup from "@/components/Signup";
import { redirect, useRouter } from "next/navigation";
import ForgotPassword from "@/components/ForgotPassword";

export default function Home() {
  const router = useRouter();
  const user = useContext(AuthContext);

  return <>{user == null || undefined ? <ForgotPassword /> : router.replace("/")}</>;
}

"use client";

import Login from "@/components/Login";
import MainContainer from "@/components/MainContainer";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Intro from "@/components/Intro";
import Create from "@/components/Create";
import User from "@/components/User";
import Footer from "@/components/Footer";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import History from "@/components/History";
import Loading from "@/components/Loading";
import SecondaryLoading from "@/components/SecondaryLoading";

export default function HistoryRoute() {
  const user = useContext(AuthContext);
  const [historyData, setHistoryData] = useState(Array<Match>);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (user != null) {
        const uid = user.uid;
        await axios.post("/api/history", { uid }).then((res): void => {
          console.log(res.data);
          setHistoryData(res.data);
          setLoading(false);
        });
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <>
      {user == null ? (
        <Login />
      ) : loading ? (
        <SecondaryLoading>loading</SecondaryLoading>
      ) : (
        <>
          <User />
          <History data={historyData} />
          <Footer />
        </>
      )}
    </>
  );
}

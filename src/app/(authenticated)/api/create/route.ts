import { firestore } from "@/firebase.config";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { customAlphabet, nanoid } from "nanoid";
// import { NextRequest, NextResponse } from "next/server";
import Server from 'next/server';

export type Item = {
  version: number;
  uid: string;
  originalUrl: string;
  trimmedSlug: string;
  trimmedUrl: string;
  active: boolean;
  clickCount: number;
  createdOn: string;
};

type RequestBody = {
  url: string;
  uid: string;
};

export async function POST(req: Server.NextRequest) {
  const body: RequestBody = await req.json();
  const { url, uid } = body;
  const slugNanoId = customAlphabet(
    "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890",
    10
  );
  const docId = nanoid();
  const trimmedSlug = slugNanoId();
  console.log("SHORT URL", trimmedSlug);
  const currTime =  new Date().toJSON()
  const itemJson: Item = {
    version: 2,
    uid: uid,
    originalUrl: url,
    trimmedSlug: trimmedSlug,
    trimmedUrl: "https://v-k.pw/" + trimmedSlug,
    active: true,
    clickCount: 0,
    createdOn: currTime
  };

  try {
    const response = await setDoc(doc(firestore, "matches", docId), itemJson)
    return Server.NextResponse.json(itemJson, { status: 200 });
  } catch (error) {
    console.log(error);
    return Server.NextResponse.json(error, { status: 500 });
  }

  // await setDoc(doc(firestore, "matches", docId), itemJson)
  //   .then((response) => {
  //     return NextResponse.json(itemJson, { status: 200 });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     return NextResponse.json(error, { status: 500 });
  //   });
}

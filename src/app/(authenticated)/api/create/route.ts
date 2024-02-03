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
import { NextRequest, NextResponse } from "next/server";

export type Item = {
  version: number;
  uid: string;
  originalUrl: string;
  trimmedSlug: string;
  trimmedUrl: string;
  active: boolean;
};

type RequestBody = {
  url: string;
  uid: string;
};

export async function POST(req: NextRequest, res: NextResponse) {
  const body: RequestBody = await req.json();
  const { url, uid } = body;
  const nanoid = customAlphabet(
    "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890",
    10
  );
  const trimmedSlug = nanoid();
  console.log("SHORT URL", trimmedSlug);
  const itemJson: Item = {
    version: 1,
    uid: uid,
    originalUrl: url,
    trimmedSlug: trimmedSlug,
    trimmedUrl: "https://v-k.pw/" + trimmedSlug,
    active: true,
  };

  const matchJson = {
    uid: uid,
    originalUrl: url,
    trimmedSlug: trimmedSlug,
  };
  const matchesRef = doc(firestore, "matches", trimmedSlug);
  const matchesSnap = await getDoc(matchesRef);
  const q = query(
    collection(firestore, "matches"),
    where("originalUrl", "==", url)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty == false) {
    return NextResponse.json(querySnapshot.docs[0].data(), { status: 200 });
  } else {
    await setDoc(doc(firestore, "matches", trimmedSlug), itemJson)
      .then((response) => {
        return NextResponse.json(itemJson, { status: 200 });
      })
      .catch((error) => {
        console.log(error);
        return NextResponse.json(error, { status: 500 });
      });
    // await fetch(
    //   `https://porkbun.com/api/json/v3/domain/addUrlForward/v-k.pw/${trimmedSlug}`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       secretapikey: process.env.PORKBUN_API_SECRET,
    //       apikey: process.env.PORKBUN_API_KEY,
    //       location: url,
    //       type: "permanent",
    //       includePath: "no",
    //       wildcard: "no",
    //     }),
    //   }
    // )
    //   .then(async (response) => {
    //     console.log("PORKBUN RESPONSE", response.json());
    //     await setDoc(doc(firestore, "matches", trimmedSlug), itemJson).then(
    //       (response) => {
    //         return NextResponse.json(itemJson, { status: 200 });
    //       }
    //     );
    //   })
    //   .catch((error) => {
    //     console.log("PORKBUN ERROR", error);
    //     return NextResponse.json(error, { status: 500 });
    //   });
  }
}

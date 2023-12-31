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
    trimmedUrl: "https://trimr.vercel.app/" + trimmedSlug,
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
    await setDoc(doc(firestore, "matches", trimmedSlug), itemJson);
    return NextResponse.json(itemJson, { status: 200 });
  }
  // return NextResponse.json("INTERNAL SERVER ERROR", { status: 500 });
}
// }

// const userHistoryRef = doc(firestore, users, uid, "items");

//   const trimmedAllRef = doc(firestore, "data", "trimmed");
//   // const trimmedAllSnap = await getDoc(trimmedAllRef);
//   const trimmedAllUpdate = await updateDoc(trimmedAllRef, {
//     items: arrayUnion(itemJson),
//   })
//     .then(async (response) => {
//       console.log("trimmedAllUpdate", response);
//       const matches = doc(firestore, "data", "matches");
//       const recordToAdd = {
//         [url]: trimmedSlug,
//       }
//       const matchesUpdate = await updateDoc(matchesRef, recordToAdd)
//         .then((response) => {
//           return NextResponse.json(itemJson, { status: 200 });
//         })
//         .catch((error) => {
//           return NextResponse.json(error, { status: 500 });
//         });

//       // res = new NextResponse(JSON.stringify(itemJson), { status: 200 });
//       // return res;
//       // return new Response(JSON.stringify(itemJson), { status: 200 });
//     })
//     .catch((error) => {
//       console.log("INTERNAL SERVER ERROR", error);
//       return NextResponse.json(error, { status: 500 });
//       // return new Response(JSON.stringify(error), { status: 500 });
//     });

// else {
//   const docData = { items: [] };
//   const setNewDoc = await setDoc(trimmedAllRef, docData);
//   const trimmedAllUpdate = await setDoc(trimmedAllRef, {
//     items: arrayUnion(itemJson),
//   })
//     .then(async (response) => {
//       console.log("trimmedAllUpdate 2", response);
//       return NextResponse.json(itemJson, { status: 200 });
//       // res = new NextResponse(JSON.stringify(itemJson), { status: 200 });
//       // return res;
//     })
//     .catch((error) => {
//       console.log("INTERNAL SERVER ERROR", error);
//       return NextResponse.json(error, { status: 500 });
//       // return new Response(JSON.stringify(error), { status: 500 });
//     });
// }

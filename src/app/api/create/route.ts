import { firestore } from "@/firebase.config";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { customAlphabet, nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

type Item = {
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

export default async function POST(req: NextRequest, res: NextApiResponse) {
  // if (req.method !== "POST") {
  //   // return new Response("METHOD NOT ALLOWED", { status: 405 });
  //   return res.status(405).json({ error: "METHOD NOT ALLOWED" });
  // } else {
    // const { url, uid } = req.body.params;
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
    const userInfoRef = doc(firestore, "users", uid);
    const userInfoSnap = await getDoc(userInfoRef);
    const trimmedAllRef = doc(firestore, "trimmedall", "all");
    const trimmedAllSnap = await getDoc(trimmedAllRef);
    if (trimmedAllSnap.exists()) {
      const trimmedAllUpdate = await updateDoc(trimmedAllRef, {
        items: arrayUnion(itemJson),
      }).then(async (response) => {
        console.log("trimmedAllUpdate", response);
        // return new Response(itemJson, { status: 200 });
        res.status(200).json(itemJson);
      });
    } else {
      const docData = { items: [] };
      const trimmedAllUpdate = await setDoc(trimmedAllRef, {
        items: arrayUnion(itemJson),
      })
        .then(async (response) => {
          console.log("trimmedAllUpdate", response);
          res.status(200).json(itemJson);
        })
        .catch((error) => console.log("INTERNAL SERVER ERROR", error));
    }
  }
// }

// if (docSnap.exists()) {
//   const userHistoryUpdate = await updateDoc(userInfoRef, {
//     trimmedv1: arrayUnion(itemJson),
//   })
//     .then(async (response) => {
//       const trimmedAllSnap = await getDoc(trimmedAllRef);
//       if(trimmedAllSnap.exists()){
//         const trimmedAllUpdate = await updateDoc(trimmedAllRef, { items: arrayUnion(itemJson) })
//       }
//       res.status(200).json(itemJson);
//     })
//     //   .then((response) => {
//     //     setLoading(false);
//     //   })
//     .catch((error) => {
//       console.log(error);
//     });
// } else {
//   const docData = { historyv1: [] };
//   const setNewDoc = await setDoc(userInfoRef, docData)
//     .then(async (response) => {
//       const userHistoryUpdate = await updateDoc(userInfoRef, {
//         trimmedv1: arrayUnion(itemJson),
//       })
//         .then((response) => {
//           res.status(200).json(itemJson);
//         })
//         //   .then((response) => {
//         //     setLoading(false);
//         //   })
//         .catch((error) => console.log(error));
//     })
//     .catch((error) => console.log("INTERNAL SERVER ERROR", error));
// }

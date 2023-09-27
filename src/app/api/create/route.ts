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
  const matchesRef = doc(firestore, "data", "matches");
  const matchesSnap = await getDoc(matchesRef);

  const trimmedAllRef = doc(firestore, "data", "trimmed");
  // const trimmedAllSnap = await getDoc(trimmedAllRef);
  const trimmedAllUpdate = await updateDoc(trimmedAllRef, {
    items: arrayUnion(itemJson),
  })
    .then(async (response) => {
      console.log("trimmedAllUpdate", response);
      const matches = doc(firestore, "data", "matches");
      const recordToAdd = {
        [url]: trimmedSlug,
      }
      const matchesUpdate = await updateDoc(matchesRef, recordToAdd)
        .then((response) => {
          return NextResponse.json(itemJson, { status: 200 });
        })
        .catch((error) => {
          return NextResponse.json(error, { status: 500 });
        });

      // res = new NextResponse(JSON.stringify(itemJson), { status: 200 });
      // return res;
      // return new Response(JSON.stringify(itemJson), { status: 200 });
    })
    .catch((error) => {
      console.log("INTERNAL SERVER ERROR", error);
      return NextResponse.json(error, { status: 500 });
      // return new Response(JSON.stringify(error), { status: 500 });
    });

  // return NextResponse.json("INTERNAL SERVER ERROR", { status: 500 });
}
// }

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

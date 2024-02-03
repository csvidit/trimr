import { firestore } from "@/firebase.config";
import { collection, where, query, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { slug } = await request.json();
  // const { slug } = body;
  console.log("FETCH ROUTE HANDLER, SLUG", slug);
  const q = query(
    collection(firestore, "matches"),
    where("trimmedSlug", "==", slug)
  );

  await getDocs(q).then((querySnapshot) => {
    if (querySnapshot.empty) {
      return NextResponse.json({ error: "No match found" }, { status: 404 });
    } else {
      return NextResponse.json(
        { url: querySnapshot.docs[0].data() },
        { status: 200 }
      );
    }
  });
}

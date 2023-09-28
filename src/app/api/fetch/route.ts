import { firestore } from "@/firebase.config";
import { collection, where, query, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { slug } = body;
  const q = query(collection(firestore, "matches"), where("trimmedSlug", "==", slug));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return NextResponse.json({ error: "No match found" }, { status: 404 });
  } else {
    return NextResponse.json(querySnapshot.docs[0].data(), { status: 200 });
  }
}

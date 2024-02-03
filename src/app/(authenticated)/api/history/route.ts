import { firestore } from "@/firebase.config";
import { collection, where, query, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { uid } = body;
  const q = query(collection(firestore, "matches"), where("uid", "==", uid));

  const querySnapshot = await getDocs(q);
  return NextResponse.json(querySnapshot.docs, { status: 200 });
}

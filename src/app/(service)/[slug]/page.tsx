import { redirect } from "next/navigation";
import GridItem from "@/components/GridItem";
import { firestore } from "@/firebase.config";
import { query, collection, where, getDocs, setDoc, doc } from "firebase/firestore";

const getData = async (routeSlug: string) => {
  console.log("GETTING DATA");
  const q = query(
    collection(firestore, "matches"),
    where("trimmedSlug", "==", routeSlug)
  );

  try {
    const querySnapshot = await getDocs(q);

    console.log("QUERY SNAPSHOT", querySnapshot.empty);

    if (querySnapshot.empty) {
      return null;
    } else {
      console.log("QUERY SNAPSHOT", querySnapshot.docs[0].data().originalUrl);
      const updatedDoc = {
        clickCount: querySnapshot.docs[0].data().clickCount + 1,
      };
      await setDoc(doc(firestore, "matches", querySnapshot.docs[0].id), updatedDoc, { merge: true }).then(() => {
        console.log("Document successfully updated!");
      })
      return querySnapshot.docs[0].data().originalUrl;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be caught in the calling function
  }
};

const DynamicTrimmedLinkPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  console.log("DYNAMIC ROUTE", params.slug);
  let url = "/error";

  try {
    url = await getData(params.slug);
    console.log("URL IS", url);

    if (url == null) {
      url = "/error";
      console.log("INSIDE NULL BLOCK");
      return <GridItem>error 404 url not found</GridItem>;
    } else {
      console.log("INSIDE REDIRECT BLOCK", url);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return <GridItem>Error occurred</GridItem>;
  } finally {
    redirect(url);
  }
};

export default DynamicTrimmedLinkPage;

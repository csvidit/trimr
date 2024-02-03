import { redirect, useParams, useRouter } from "next/navigation";
import { Item } from "../../(authenticated)/api/create/route";
import axios, { AxiosError } from "axios";
import GridItem from "@/components/GridItem";
import { firestore } from "@/firebase.config";
import { query, collection, where, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

// const getData = async (routeSlug: string) => {
//   console.log("GETTING DATA");
//   await axios
//     .post("/api/fetch", {
//       slug: routeSlug,
//     })
//     .then(async (response) => {
//       console.log("RESPONSE", response);
//       const data = await response.data;
//       console.log(data);
//       return data.url;
//     })
//     .catch((err: AxiosError) => {
//       console.log("ERROR", err.cause, err.code, err.name, err.message);
//       // console.log(err);
//       return null;
//     });
// };

// const getData = async (routeSlug: string) => {
//   console.log("GETTING DATA");
//   const q = query(
//     collection(firestore, "matches"),
//     where("trimmedSlug", "==", routeSlug)
//   );

//   await getDocs(q).then((querySnapshot) => {
//     console.log("QUERY SNAPSHOT", querySnapshot.empty);
//     if (querySnapshot.empty) {
//       return null;
//     } else {
//       console.log("QUERY SNAPSHOT", querySnapshot.docs[0].data().originalUrl);
//       return querySnapshot.docs[0].data().originalUrl;
//     }
//   });
// };

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
  // const router = useRouter();
  // const { slug } = params;
  console.log("DYNAMIC ROUTE", params.slug);
  // await getData(params.slug).then((url) => {
  //   console.log("URL IS", url);
  //   if (url == null) {
  //     console.log("INSIDE NULL BLOCK");
  //     return <GridItem>error 404 url not found</GridItem>;
  //   } else {
  //     console.log("INSIDE REDIRECT BLOCK", url);
  //     redirect(url)
  //     // return <GridItem>url is {url}</GridItem>;
  //   }
  // });

  let url 

  try {
    url = await getData(params.slug);
    console.log("URL IS", url);

    if (url == null) {
      console.log("INSIDE NULL BLOCK");
      return <GridItem>error 404 url not found</GridItem>;
    } else {
      console.log("INSIDE REDIRECT BLOCK", url);
      // NextResponse.redirect(new URL('/home', url))
      // return <GridItem>url is {url}</GridItem>;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return <GridItem>Error occurred</GridItem>;
  } finally {
    redirect(url)
  }

  // let url = await getData(params.slug);
  // if (url == undefined) {
  //   console.log("URL IS NULL");
  //   return <GridItem>error 404 url not found</GridItem>;
  // } else {
  //   console.log("URL IS", url);
  //   redirect(url);
  //   // return <GridItem>url is {url}</GridItem>;
  // }

  // if (url == null) {
  //   return <GridItem>error 404 url not found</GridItem>;
  // }

  // if (url != null) {
  //   redirect(url);
  // } else {
  //   redirect("/");
  // }
};

export default DynamicTrimmedLinkPage;

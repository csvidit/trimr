import { redirect, useParams, useRouter } from "next/navigation";
import { Item } from "../../(authenticated)/api/create/route";
import axios, { AxiosError } from "axios";
import GridItem from "@/components/GridItem";

const getData = async (routeSlug: string) => {
  console.log("GETTING DATA");
  await axios
    .post("/api/fetch", {
      slug: routeSlug,
    })
    .then(async (response) => {
      console.log("RESPONSE", response);
      const data = await response.data;
      console.log(data);
      return data.url;
    })
    .catch((err: AxiosError) => {
      console.log("ERROR", err.cause, err.code, err.name, err.message);
      // console.log(err);
      return null;
    });
};

const DynamicTrimmedLinkPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  // const router = useRouter();
  // const { slug } = params;
  console.log("DYNAMIC ROUTE", params.slug);
  await getData(params.slug).then((url) => {
    if (url == null) {
      return <GridItem>error 404 url not found</GridItem>;
    } else {
      return <GridItem>url is {url}</GridItem>;
    }
  });

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

import { useParams, useRouter } from "next/navigation";
import { Item } from "../api/create/route";

const getData = async (slug) => {
  await fetch("/api/fetch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return 
    });
};

const DynamicTrimmedLinkPage = async () => {
  const router = useRouter();
  const { slug } = useParams();
  const data = await getData(slug);
  if (data != null) {
    router.replace(data.originalUrl);
  }
};

export default DynamicTrimmedLinkPage;

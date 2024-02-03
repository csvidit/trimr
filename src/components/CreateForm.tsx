import { AuthContext } from "@/app/(authenticated)/AuthContext";
import { Item } from "./Create";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useContext } from "react";
import Button from "./Button";

const CreateForm = (props: {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setComplete: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<Item>>;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
}) => {
  const user = useContext(AuthContext);

  const handleSubmit = async () => {
    const uid = user?.uid;
    const url = props.url;
    props.setLoading(true);
    props.setComplete(false);
    console.log("submit");
    await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url, uid }),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("INSIDE THEN OF HANDLE SUBMIT OF CREATE FORM", data);
        console.log(data);
        props.setData(data);
        props.setComplete(true);
        if (res.status === 200) {
          props.setSuccess(true);
        } else {
          props.setSuccess(false);
        }
        props.setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form className="flex flex-col space-y-4 text-base placeholder:text-zinc-400">
      <input
        onChange={(e) => {
          props.setUrl(e.target.value);
        }}
        value={props.url}
        className="rounded-lg px-4 py-2 bg-zinc-800 text-zinc-100 border-none focus:outline-none focus:ring-1 focus:ring-indigo-400"
        type="text"
        placeholder="enter the full url here"
      />
      <Button
        onClick={() => {
          handleSubmit();
        }}
      >
        go
      </Button>
    </form>
  );
};

export default CreateForm;

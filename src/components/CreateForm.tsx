import { AuthContext } from "@/app/AuthContext";
import { Item } from "./Create";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useContext } from "react";

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
        className="rounded-lg p-2 bg-zinc-800 text-zinc-100 border-none focus:outline-none focus:ring-1 focus:ring-indigo-400"
        type="text"
        placeholder="enter the full url here"
      />
      <motion.button
        layout
        type="button"
        onClick={() => {
          handleSubmit();
        }}
        className="w-fit rounded-lg px-8 py-2 hover:border-indigo-400 bg-indigo-400 hover:bg-zinc-800 text-zinc-900 hover:text-zinc-100 transition-all duration-200 ease-in-out"
      >
        go
      </motion.button>
    </form>
  );
};

export default CreateForm;

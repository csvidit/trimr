"use client";

import { motion } from "framer-motion";
import User from "./User";
import { useState } from "react";
import { types } from "util";
import { PiCopyDuotone, PiCopySimple } from "react-icons/pi";
import Success from "./Success";
import Error from "./Error";
import CreateForm from "./CreateForm";
import CreateLoading from "./CreateLoading";

export type Item = {
  version: number;
  uid: string;
  originalUrl: string;
  trimmedSlug: string;
  trimmedUrl: string;
  active: boolean;
};

const Create = () => {
  const [url, setUrl] = useState("");
  const [complete, setComplete] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Item>({} as Item);

  return (
    <>
      {loading && <CreateLoading />}
      {!loading && (
        <div className="p-8 h-fit rounded-2xl col-span-4 flex flex-col space-y-4 bg-zinc-900 lg:text-xl text-zinc-100">
          <span className="font-bold">
            <span className="">create</span>
            <span className="ml-2 text-zinc-400 font-normal">
              a new trimmed url
            </span>
          </span>

          <CreateForm
            setLoading={setLoading}
            setComplete={setComplete}
            setData={setData}
            setSuccess={setSuccess}
            url={url}
            setUrl={setUrl}
          />
        </div>
      )}
      {complete ? (
        success ? (
          <Success url={data.trimmedUrl} />
        ) : (
          <Error />
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default Create;

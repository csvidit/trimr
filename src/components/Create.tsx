import { AuthDispatchContext } from "@/app/AuthContext";
import { auth } from "@/firebase.config";
import { signOut } from "firebase/auth";
import { useContext } from "react";

const Create = () => {
  const dispatch = useContext(AuthDispatchContext);

  const handleSignout = async () => {
    await signOut(auth)
      .then(() => {
        auth.updateCurrentUser(null);
        dispatch!({ type: "LOGOUT", payload: null });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-8 h-fit rounded-2xl col-span-4 flex flex-col space-y-4 bg-zinc-900 text-2xl text-zinc-100">
      <span className="font-bold">
        <span className="ml-2">create</span>
        <span className="ml-2 text-zinc-400 font-normal">a new trimd url</span>
        <button
          onClick={() => {
            handleSignout();
          }}
        >
          sign out
        </button>
      </span>
    </div>
  );
};

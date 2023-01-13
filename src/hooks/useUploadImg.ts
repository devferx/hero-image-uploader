import { useState, useEffect, useCallback, use } from "react";
import { useSession } from "next-auth/react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import confetti from "canvas-confetti";

import { storage } from "../firebase";
import { addImage } from "../firebase/db/addImage";

type State = "idle" | "loading" | "success" | "error";

export const useUploadImg = () => {
  const [img, setImg] = useState<File>();
  const [progessStatus, setProgessStatus] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [currentState, setCurrentState] = useState<State>("idle");
  const [isBrowser, setIsBrowser] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const submitFile = useCallback(() => {
    if (!img) return;

    const fileExt = img.name.split(".").pop();
    const fileName = `${uuid()}.${fileExt}`;

    const storageRef = ref(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, img);
    setCurrentState("loading");

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgessStatus(percent);
      },
      (err) => {
        setCurrentState("error");
        console.error(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgUrl(url);
          setCurrentState("success");

          if (session) {
            const email = session.user!.email!;

            if (email) {
              addImage({ email, imageUrl: url }).then(() => {
                console.log("Image added to user");
              });
            }
          }

          if (isBrowser) {
            confetti({
              particleCount: 140,
              spread: 70,
              origin: { y: 0.6 },
            });
          }
        });
      }
    );
  }, [img, isBrowser, session]);

  useEffect(() => {
    submitFile();
  }, [submitFile, img]);

  return { currentState, progessStatus, imgUrl, setImg };
};

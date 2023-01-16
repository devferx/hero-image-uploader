import { useState, useEffect, useCallback, use } from "react";
import { useSession } from "next-auth/react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import confetti from "canvas-confetti";

import { storage } from "../firebase";
import { addImage } from "../firebase/db/image";

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

    // if size is greater than 8MB then return
    if (img.size > 8000000) {
      alert("File size is greater than 8MB, please upload a smaller file");
      return;
    }

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
          if (!isBrowser) return;
          confetti({
            particleCount: 140,
            spread: 70,
            origin: { y: 0.6 },
          });

          if (!session) return;
          const email = session.user!.email;
          addImage({ email, imageUrl: url }).then(() => {
            console.log("Image added to db");
          });
        });
      }
    );
  }, [img, isBrowser, session]);

  useEffect(() => {
    submitFile();
  }, [submitFile, img]);

  return { currentState, progessStatus, imgUrl, setImg };
};

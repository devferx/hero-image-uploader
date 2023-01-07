import { useState, useEffect, useCallback } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { storage } from "../firebase/firebase";

type State = "idle" | "loading" | "success" | "error";

export const useUploadImg = () => {
  const [img, setImg] = useState<File>();
  const [progessStatus, setProgessStatus] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [currentState, setCurrentState] = useState<State>("idle");

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
        });
      }
    );
  }, [img]);

  useEffect(() => {
    submitFile();
  }, [submitFile, img]);

  return { currentState, progessStatus, imgUrl, setImg };
};

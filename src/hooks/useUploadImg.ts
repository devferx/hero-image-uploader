import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

import { UploadResponse } from "../interfaces/uploadImg";

type State = "idle" | "loading" | "success" | "error";

export const useUploadImg = () => {
  const [img, setImg] = useState<File>();
  const [imgUrl, setImgUrl] = useState("");
  const [isBrowser, setIsBrowser] = useState(false);
  const [currentState, setCurrentState] = useState<State>("idle");

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const submitFile = useCallback(async () => {
    if (!img) return;

    setCurrentState("loading");

    const formData = new FormData();
    formData.append("image", img);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data: UploadResponse = await res.json();
      setImgUrl(data.data.url);
      setCurrentState("success");
      if (isBrowser) {
        confetti({
          particleCount: 140,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (error) {
      setCurrentState("error");
      console.error(error);
    }
  }, [img, isBrowser]);

  useEffect(() => {
    submitFile();
  }, [submitFile, img]);

  return { currentState, imgUrl, setImg };
};

import { useState, useEffect, useCallback } from "react";

import { UploadResponse } from "../interfaces/uploadImg";

type State = "idle" | "loading" | "success" | "error";

export const useUploadImg = () => {
  const [img, setImg] = useState<File>();
  const [imgUrl, setImgUrl] = useState("");
  const [currentState, setCurrentState] = useState<State>("idle");

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
    } catch (error) {
      setCurrentState("error");
      console.error(error);
    }
  }, [img]);

  useEffect(() => {
    submitFile();
  }, [submitFile, img]);

  return { currentState, imgUrl, setImg };
};

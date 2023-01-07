import { useState, useEffect, useCallback } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useDropzone } from "react-dropzone";
import { v4 as uuid } from "uuid";
import type { ChangeEvent } from "react";

import { storage } from "../firebase/firebase";
import { ImageSVG } from "../svg/image";

type State = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [img, setImg] = useState<File>();
  const [progessStatus, setProgessStatus] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [currentState, setCurrentState] = useState<State>("idle");

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target!.files === null) return;

    const file = ev.target.files[0];
    setImg(file);
  };

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

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setImg(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  if (currentState === "loading") {
    return (
      <div className="card">
        <h2 className="card__title">Uploading...</h2>
        <p className="card__label">{progessStatus}%</p>
      </div>
    );
  }

  if (currentState === "success") {
    return (
      <div className="card">
        <h2 className="card__title">Uploaded successfully</h2>
        <img className="card__img" src={imgUrl} alt="uploaded image" />
        <input type="text" readOnly value={imgUrl} />
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card__title">Upload your image</h2>
      <p className="card__label">File should be Jpeg, Png,...</p>

      <div className="card__dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        <ImageSVG />
        <p className="card__label">Drag & Drop your image here</p>
      </div>

      <p className="card__label">Or</p>
      <label className="card__btn" htmlFor="input-file">
        Choose a file
      </label>
      <input
        id="input-file"
        className="input-file"
        type="file"
        accept="image/*"
        tabIndex={-1}
        onChange={onChange}
      />
    </div>
  );
}

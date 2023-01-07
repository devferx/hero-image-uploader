import { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import type { ChangeEvent } from "react";

import { storage } from "../firebase/firebase";

export default function Home() {
  const [img, setImg] = useState<File>();
  const [progessStatus, setProgessStatus] = useState(0);

  useEffect(() => {
    submitFile();
  }, [img]);

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target!.files === null) return;

    const file = ev.target.files[0];
    setImg(file);
  };

  const submitFile = () => {
    if (!img) return;

    const storageRef = ref(storage, `images/${img.name}`);
    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgessStatus(percent);
      },
      (err) => {
        console.error(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  };

  return (
    <div className="card">
      <h2 className="card__title">Upload your image</h2>
      <p className="card__label">File should be Jpeg, Png,...</p>

      <div className="card__drag"></div>
      <p className="card__label">Or</p>
      <label className="card__btn" htmlFor="input-file">
        Choose a file
      </label>
      <input
        id="input-file"
        className="input-file"
        type="file"
        accept="image/*"
        onChange={onChange}
      />
    </div>
  );
}

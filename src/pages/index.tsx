import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import type { ChangeEvent } from "react";

import { storage } from "../firebase/firebase";

export default function Home() {
  const [img, setImg] = useState<File>();
  const [progessStatus, setProgessStatus] = useState(0);

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target!.files === null) return;

    const file = ev.target.files[0];
    setImg(file);
  };

  const onSubmitFile = () => {
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
    <div>
      <input type="file" accept="image/*" onChange={onChange} />
      <button onClick={onSubmitFile}>Upload</button>

      <progress value={progessStatus} max="100"></progress>
    </div>
  );
}

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import type { ChangeEvent } from "react";

import { ImageSVG } from "../svg/image";
import { useUploadImg } from "../hooks/useUploadImg";

export default function Home() {
  const { currentState, progessStatus, imgUrl, setImg } = useUploadImg();
  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target!.files === null) return;

    const file = ev.target.files[0];
    setImg(file);
  };

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];
      setImg(file);
    },
    [setImg]
  );

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
        <div className="card__progress">
          <div
            className="card__progress-bar"
            style={{ width: `${progessStatus}%` }}
          />
        </div>
        <p className="card__label">{progessStatus}%</p>
      </div>
    );
  }

  if (currentState === "success") {
    return (
      <div className="card">
        <h2 className="card__title">🎉 Uploaded successfully</h2>
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

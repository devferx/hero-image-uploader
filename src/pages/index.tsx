import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import type { ChangeEvent } from "react";

import { useUploadImg } from "../hooks/useUploadImg";

import { LoadingCard } from "../components/LoadingCard";
import { SuccessCard } from "../components/SuccessCard";
import { ImageSVG } from "../svg/image";

export default function Home() {
  const { currentState, imgUrl, setImg } = useUploadImg();
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

  if (currentState === "loading") return <LoadingCard />;
  if (currentState === "success") return <SuccessCard imgUrl={imgUrl} />;

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

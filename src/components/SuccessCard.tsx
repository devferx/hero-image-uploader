import { useState } from "react";

interface SuccessCardProps {
  imgUrl: string;
}

export const SuccessCard = ({ imgUrl }: SuccessCardProps) => {
  const [message, setMessage] = useState<string>();

  const onClick = () => {
    navigator.clipboard.writeText(imgUrl).then(() => {
      setMessage("Link copied to clipboard");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    });
  };
  return (
    <div className="card">
      <h2 className="card__title">🎉 Uploaded successfully</h2>
      <img className="card__img" src={imgUrl} alt="uploaded image" />
      <div className="card__link">
        <input
          className="card__link__input"
          type="text"
          readOnly
          value={imgUrl}
        />
        <button className="card__btn" onClick={onClick}>
          Copy Link
        </button>
      </div>
      {message && <p className="card__label">{message}</p>}
    </div>
  );
};

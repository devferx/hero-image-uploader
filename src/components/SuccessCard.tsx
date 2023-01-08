interface SuccessCardProps {
  imgUrl: string;
}

export const SuccessCard = ({ imgUrl }: SuccessCardProps) => {
  return (
    <div className="card">
      <h2 className="card__title">🎉 Uploaded successfully</h2>
      <img className="card__img" src={imgUrl} alt="uploaded image" />
      <input type="text" readOnly value={imgUrl} />
    </div>
  );
};

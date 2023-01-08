interface LoadingCardProps {
  progessStatus: number;
}

export const LoadingCard = ({ progessStatus }: LoadingCardProps) => {
  return (
    <div className="card">
      <h2 className="card__title">Uploading...</h2>
      <div className="card__progress">
        <div
          className="card__progress-bar"
          style={{ width: `${progessStatus}%` }}
        />
      </div>
    </div>
  );
};

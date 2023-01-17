interface LoadingCardProps {
  progessStatus: number;
}

export const LoadingCard = ({ progessStatus }: LoadingCardProps) => {
  return (
    <div className="card">
      <h2 className="card__title">Uploading...</h2>
      <div className="w-full h-2 bg-[#e0e0e0] rounded-lg">
        <div
          className="h-full bg-[#2f80ed] rounded-lg ease-in-out duration-500"
          style={{ width: `${progessStatus}%` }}
        />
      </div>
    </div>
  );
};

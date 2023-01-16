interface LoaderProps {
  size?: number;
  color?: string;
  density?: number;
}

export const Loader = ({
  size = 32,
  color = "#fff",
  density = 4,
}: LoaderProps) => {
  return (
    <>
      <span className="loader"></span>

      <style jsx>
        {`
          .loader {
            width: ${size}px;
            height: ${size}px;
            border: ${density}px solid ${color};
            border-bottom-color: transparent;
            border-radius: 50%;
            display: inline-block;
            box-sizing: border-box;
            animation: rotation 1s linear infinite;
          }

          @keyframes rotation {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
};

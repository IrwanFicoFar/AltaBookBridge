import { FC, CSSProperties } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const override: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "middle",
  margin: "0 auto",
  backgroundColor: "2A9D8F",
  width: "100%",
};

export const Loading: FC = () => {
  let color = "#2A9D8F";

  return (
    <div className="flex justify-center items-center justify-items-center h-96 w-100">
      <PropagateLoader
        color={color}
        cssOverride={override}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

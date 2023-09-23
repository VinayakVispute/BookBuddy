import React from "react";

const spinnerStyle = {
  width: "52px",
  height: "52px",
  border: "10px solid #FFF",
  borderBottomColor: "#1105f5",
  borderRadius: "50%",
  display: "inline-block",
  boxSizing: "border-box",
  animation: "rotation 1s linear infinite",
};

const keyframesStyle = `
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Spinner = () => {
  return (
    <>
      <style>{keyframesStyle}</style>
      <span style={spinnerStyle} />
    </>
  );
};

export default Spinner;

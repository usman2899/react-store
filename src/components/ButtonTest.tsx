import { useState } from "react";

function ButtonTest() {
  const [flag, setFlag] = useState(false);

  return (
    <button
      className={flag === false ? "btn btn-primary" : "btn btn-secondary"}
      onClick={() => {
        setFlag(!flag);
      }}
    >
      Button
    </button>
  );
}

export default ButtonTest;

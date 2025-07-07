import React, { useRef, useState } from "react";

export default function UseRefHook() {
  const countRef = useRef(0);
  const [number, setNember] = useState(0);

  const handleCount = () => {
    setNember((number) => number + 1);
    countRef.current += 1;
  };
  return (
    <div>
      <p>state:{number}</p>
      <p>ref:{countRef.current}</p>
      <button onClick={() => handleCount()}>count</button>
    </div>
  );
}

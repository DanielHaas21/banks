import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0n);
  const [inputValue, setInputValue] = useState<string>("");
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const getCurrentScore = async () => {
    const response = await fetch(
      "https://materialy.jakub.dev/score-counter-api/"
    );
    const data = await response.text();

    setCount(BigInt(data));
  };

  const handleClick = async () => {
    if (inputValue.trim() !== "") {
      if (!Number.isSafeInteger(parseInt(inputValue))) return;

      await fetch("https://materialy.jakub.dev/score-counter-api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: parseInt(inputValue) }),
      });

      setCount(count + BigInt(parseInt(inputValue)));

    } else {

      setCount(count + 1n);
      const response = await fetch(
        "https://materialy.jakub.dev/score-counter-api/",
        { method: "POST" }
      );
      const data = await response.text();

      setCount(BigInt(data));
    }
  };

  useEffect(() => {
    getCurrentScore();

    intervalRef.current = setInterval(getCurrentScore, 1_000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <>
      <h1>Community counter</h1>
      <h2>{count}</h2>
      <div className="card">
        <input
          style={{
            padding: 9,
            borderRadius: 9,
            marginRight: 16,
          }}
          type="number"
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <button onClick={handleClick}>Klikni!</button>
      </div>
    </>
  );
}

export default App;

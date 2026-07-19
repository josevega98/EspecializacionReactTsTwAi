import { useEffect, useState } from "react";

export default function CountComponent() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log("Escuela Global");
    document.title = `Contador: ${count}`;
  }, [count]);

  return (
    <section
      style={{
        fontFamily: "sans-serif",
        textAlign: "center",
        marginTop: "3rem",
      }}
    >
      <h2>Contador simple</h2>
      <p style={{ fontSize: "2rem", margin: "1rem 0" }}>{count}</p>
      <button onClick={() => setCount(count + 1)} style={{ marginRight: 8 }}>
        +1
      </button>
      <button onClick={() => setCount(count - 1)} style={{ marginRight: 8 }}>
        -1
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
    </section>
  );
}

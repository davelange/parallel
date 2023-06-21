import Canvas from "@/components/Canvas";
import { useEffect, useState } from "react";
import Editor from "./components/Editor";

export default function App() {
  async function test() {
    let r = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    let j = await r.json()
    console.log(j);
  }

  useEffect(() => {
    test();
  }, []);

  const [_, rerender] = useState(0);
  return (
    <>
      <Canvas />
      <Editor rerender={rerender} />
    </>
  );
}

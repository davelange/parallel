import Canvas from "@/components/Canvas";
import { useState } from "react";
import Editor from "./components/Editor";

export default function App() {
  const [_, rerender] = useState(0);
  return (
    <>
      <Canvas />
      <Editor rerender={rerender} />
    </>
  );
}
